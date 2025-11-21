import express from "express";
import { db } from "../firebase.js";

const router = express.Router();

// Obtener todos los torneos
router.get("/", async (req, res) => {
  try {
    const snapshot = await db.collection("tournaments").get();
    const tournaments = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(tournaments);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo torneos", details: error });
  }
});

// Crear un torneo (opcional, para admin)
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const ref = await db.collection("tournaments").add(data);
    res.json({ id: ref.id, ...data });
  } catch (error) {
    res.status(500).json({ error: "Error al crear torneo", details: error });
  }
});

router.get("/:id/matches", async (req, res) => {
  try {
    const { id } = req.params;
    const snapshot = await db
      .collection("tournaments")
      .doc(id)
      .collection("matches")
      .get();

    const matches = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(matches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los matches" });
  }
});

router.get("/:id/participants", async (req, res) => {
  try {
    const { id } = req.params;
    const snapshot = await db
      .collection("tournaments")
      .doc(id)
      .collection("participants")
      .get();

    const participants = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.json(participants);
  } catch (err) {
    console.error("Error obteniendo participantes:", err);
    res.status(500).json({ error: "Error al obtener participantes" });
  }
});

export { router as tournamentsRouter };
