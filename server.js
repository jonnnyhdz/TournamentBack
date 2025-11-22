import express from "express";
import cors from "cors";
import { tournamentsRouter } from "./routes/tournaments.js";
import { registrationsRouter } from "./routes/registrations.js";

const app = express();

// ✅ Configuración CORS explícita
app.use(
  cors({
    origin: "*", // Puedes cambiarlo luego por el dominio real del frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// ✅ Endpoints principales
app.use("/api/tournaments", tournamentsRouter);
app.use("/api/registrations", registrationsRouter);

// ✅ Endpoint raíz (útil para comprobar que Render responde)
app.get("/", (req, res) => {
  res.send("Tournament API corriendo correctamente 🚀");
});

// ✅ Arranque
const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`)
);
