import admin from "firebase-admin";

// Render o cualquier servicio de deploy pasa el JSON directo en la variable de entorno
const credentials = process.env.FIREBASE_CREDENTIALS;

if (!credentials) {
  console.error("❌ No se encontró la variable de entorno FIREBASE_CREDENTIALS");
  process.exit(1);
}

let serviceAccount;
try {
  serviceAccount = JSON.parse(credentials);
  serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");
} catch (error) {
  console.error("❌ Error al parsear FIREBASE_CREDENTIALS:", error);
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

console.log("✅ Firebase conectado correctamente");

const db = admin.firestore();
export { db };
