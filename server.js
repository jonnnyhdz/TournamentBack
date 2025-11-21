import express from "express";
import cors from "cors";
import { tournamentsRouter } from "./routes/tournaments.js";
import { registrationsRouter } from "./routes/registrations.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tournaments", tournamentsRouter);
app.use("/api/registrations", registrationsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`)
);
