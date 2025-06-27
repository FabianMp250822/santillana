import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// --- URGENTE: REEMPLAZA ESTOS VALORES PARA CORREGIR EL ERROR ---
// El error 'auth/configuration-not-found' ocurre porque los siguientes valores
// son incorrectos o están vacíos. Debes reemplazarlos con las credenciales 
// reales de tu proyecto de Firebase.
//
// Puedes encontrar estas claves en la Consola de Firebase:
// 1. Ve a "Configuración del proyecto" (Project settings).
// 2. En la pestaña "General", desplázate hacia abajo hasta "Tus apps" (Your apps).
// 3. Selecciona tu aplicación web y verás el objeto de configuración 'firebaseConfig'.
// 4. Copia los valores de allí y pégalos aquí.
const firebaseConfig = {
  apiKey: "PLACEHOLDER_REPLACE_WITH_YOUR_API_KEY",
  authDomain: "PLACEHOLDER_REPLACE_WITH_YOUR_AUTH_DOMAIN",
  projectId: "PLACEHOLDER_REPLACE_WITH_YOUR_PROJECT_ID",
  storageBucket: "PLACEHOLDER_REPLACE_WITH_YOUR_STORAGE_BUCKET",
  messagingSenderId: "PLACEHOLDER_REPLACE_WITH_YOUR_MESSAGING_SENDER_ID",
  appId: "PLACEHOLDER_REPLACE_WITH_YOUR_APP_ID",
  measurementId: "PLACEHOLDER_REPLACE_WITH_YOUR_MEASUREMENT_ID"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
