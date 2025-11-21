import express from "express";
import { db } from "../firebase.js";

const router = express.Router();

/**
 * 📩 Registrar jugador en un torneo
 * Estructura en Firestore:
 * tournaments/{tournamentId}/participants/{autoId}
 */
router.post("/", async (req, res) => {
  try {
    const { tournamentId, name, email } = req.body;

    if (!tournamentId || !name || !email) {
      return res.status(400).json({ error: "Faltan campos requeridos." });
    }

    // 🔹 Referencia a la subcolección de participantes
    const participantsRef = db
      .collection("tournaments")
      .doc(tournamentId)
      .collection("participants");

    // 🔹 Verificar si ya existe el correo registrado en ese torneo
    const existing = await participantsRef.where("email", "==", email).get();

    if (!existing.empty) {
      return res.status(400).json({
        error: "Ya estás registrado en este torneo con este correo.",
      });
    }

    // 🔹 Registrar nuevo participante
    const newParticipant = {
      name,
      email,
      score: 0,
      registeredAt: new Date(),
    };

    await participantsRef.add(newParticipant);

    // 🔹 Actualizar contador registeredCount del torneo
    const tournamentRef = db.collection("tournaments").doc(tournamentId);
    await db.runTransaction(async (transaction) => {
      const doc = await transaction.get(tournamentRef);
      if (!doc.exists) return;

      const currentCount = doc.data().registeredCount || 0;
      transaction.update(tournamentRef, {
        registeredCount: currentCount + 1,
        updatedAt: new Date(),
      });
    });

    return res.json({ message: "Registro exitoso", participant: newParticipant });
  } catch (error) {
    console.error("🔥 Error registrando jugador:", error);
    res
      .status(500)
      .json({ error: "Error al registrar jugador", details: error.message });
  }
});

/**
 * 🧾 Obtener participantes de un torneo
 */
router.get("/:tournamentId", async (req, res) => {
  try {
    const { tournamentId } = req.params;

    const snapshot = await db
      .collection("tournaments")
      .doc(tournamentId)
      .collection("participants")
      .get();

    const players = snapshot.docs.map((doc) => doc.data());
    res.json(players);
  } catch (error) {
    console.error("🔥 Error obteniendo participantes:", error);
    res.status(500).json({
      error: "Error al obtener registros",
      details: error.message,
    });
  }
});

export { router as registrationsRouter };
