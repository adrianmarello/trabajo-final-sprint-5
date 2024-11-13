import express from 'express';
import { connectDB } from "./config/dbConfig.mjs";
import superheroesRoutes from "./routes/superheroesRoutes.mjs";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectDB();

app.use('/api', superheroesRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
})

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
})