import admin from "firebase-admin";
import fs from "fs";

const keyPath = process.env.FIREBASE_CREDENTIALS || "./serviceAccountKey.json";

if (!fs.existsSync(keyPath)) {
  console.error(`❌ No se encontró el archivo de credenciales Firebase en: ${keyPath}`);
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(keyPath, "utf8"));
serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
console.log("✅ Firebase conectado correctamente");


const db = admin.firestore();
export { db };
