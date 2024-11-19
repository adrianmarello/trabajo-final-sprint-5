import express from 'express';
import { 
  actualizarSuperheroeController,
  buscarSuperheroePorAtributoController, 
  crearSuperHeroeController, 
  eliminarSuperheroePorIdController, 
  eliminarSuperheroePorNombreController, 
  obtenerSuperheroesMayoresDe30Controller, 
  obtenerSuperheroesPorIdController, 
  obtenerTodosLosSuperheroesController 
} from '../controllers/superheroesController.mjs';

const router = express.Router();

router.get('/heroes', obtenerTodosLosSuperheroesController);
router.post('/heroes', crearSuperHeroeController);
router.get('/heroes/:id', obtenerSuperheroesPorIdController);
router.patch('/heroes/:id', actualizarSuperheroeController);
router.delete('/heroes/:id', eliminarSuperheroePorIdController);
router.delete('/heroes/nombre/:nombre', eliminarSuperheroePorNombreController);
router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroePorAtributoController);

export default router;