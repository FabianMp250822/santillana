import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// --- URGENTE: COMPLETA TU CONFIGURACIÓN DE FIREBASE AQUÍ ---
// Para que la aplicación funcione, debes reemplazar los siguientes valores
// de marcador de posición con las credenciales reales de tu proyecto de Firebase.
//
// Puedes encontrar estas claves en la Consola de Firebase:
// 1. Ve a "Configuración del proyecto" (Project settings).
// 2. En la pestaña "General", desplázate hacia abajo hasta "Tus apps" (Your apps).
// 3. Selecciona tu aplicación web y verás el objeto de configuración 'firebaseConfig'.
// 4. Copia los valores de allí y pégalos aquí.
const firebaseConfig = {
  apiKey: "AIzaSyBXvZBPAt2V6Op65fdmht9gTPSisN55-gE",
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
