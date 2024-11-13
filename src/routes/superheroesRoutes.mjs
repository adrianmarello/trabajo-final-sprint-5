import express from 'express';
import { 
  buscarSuperheroePorAtributoController, 
  obtenerSuperheroesMayoresDe30Controller, 
  obtenerSuperheroesPorIdController, 
  obtenerTodosLosSuperheroesController 
} from '../controllers/superheroesController.mjs';

const router = express.Router();

router.get('/heroes', obtenerTodosLosSuperheroesController);
router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);
router.get('/heroes/:id', obtenerSuperheroesPorIdController);
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroePorAtributoController);

export default router;