import express from 'express';
import { connectDB } from "./config/dbConfig.mjs";
import superheroesRoutes from "./routes/superheroesRoutes.mjs";
import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, './src/views'));

app.use(expressLayouts);

app.set('layout', 'layout');

app.use(express.static(path.join(__dirname, './public')));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/api', superheroesRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
})

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
})