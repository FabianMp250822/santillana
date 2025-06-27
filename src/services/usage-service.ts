'use server';

import { db, isFirebaseConfigured } from '@/lib/firebase';
import { doc, getDoc, serverTimestamp, Timestamp, runTransaction } from 'firebase/firestore';

const DAILY_DESIGN_LIMIT = 2;

interface UsageData {
    designCount: number;
    lastDesignTimestamp: Timestamp;
}

/**
 * Checks if a user is allowed to generate a new design based on their usage.
 * @param userId The unique ID of the user.
 * @returns A boolean indicating if generation is allowed.
 */
export async function canGenerateDesign(userId: string): Promise<boolean> {
    // If the database isn't configured, deny the request.
    if (!isFirebaseConfigured) {
        console.warn("Usage check failed: Firebase (db) is not configured.");
        return false;
    }

    const usageDocRef = doc(db, 'usage', userId);
    const docSnap = await getDoc(usageDocRef);

    if (!docSnap.exists()) {
        return true; // No record, so they can generate.
    }

    const usageData = docSnap.data() as UsageData;
    const now = Timestamp.now();
    // Use toDate() only on a valid Timestamp object.
    const lastDesignDate = usageData.lastDesignTimestamp.toDate();
    const isMoreThan24Hours = (now.toMillis() - lastDesignDate.getTime()) > 24 * 60 * 60 * 1000;

    // If it's been more than 24 hours, their limit is reset.
    if (isMoreThan24Hours) {
        return true;
    }

    // If within 24 hours, check the count.
    return usageData.designCount < DAILY_DESIGN_LIMIT;
}

/**
 * Records a design generation event for a user in Firestore.
 * Resets the count if it's a new day.
 * @param userId The unique ID of the user.
 */
export async function recordDesignGeneration(userId: string): Promise<void> {
    // If the database isn't configured, do nothing.
    if (!isFirebaseConfigured) {
        console.warn("Usage recording failed: Firebase (db) is not configured.");
        return;
    }
    const usageDocRef = doc(db, 'usage', userId);

    try {
        await runTransaction(db, async (transaction) => {
            const usageDoc = await transaction.get(usageDocRef);
            
            if (!usageDoc.exists()) {
                // First time generating
                transaction.set(usageDocRef, {
                    designCount: 1,
                    lastDesignTimestamp: serverTimestamp(),
                });
                return;
            }

            const oldData = usageDoc.data() as UsageData;
            // The timestamp from the server might not be a Timestamp object yet in a transaction read
            // so we get the current time on the server for comparison.
            const now = Timestamp.now();
            const lastDesignDate = oldData.lastDesignTimestamp.toDate();
            const isMoreThan24Hours = (now.toMillis() - lastDesignDate.getTime()) > 24 * 60 * 60 * 1000;

            if (isMoreThan24Hours) {
                // Reset count because it's a new day
                transaction.update(usageDocRef, {
                    designCount: 1,
                    lastDesignTimestamp: serverTimestamp(),
                });
            } else {
                // Increment count
                transaction.update(usageDocRef, {
                    designCount: (oldData.designCount || 0) + 1,
                    lastDesignTimestamp: serverTimestamp(),
                });
            }
        });
    } catch (e) {
        console.error("Transaction failed to record usage: ", e);
        // Don't throw an error to the user, just log it.
        // Failing to record usage shouldn't block a successful generation.
    }
}
