import express from 'express';
import { body } from 'express-validator';

import { 
  actualizarSuperheroeController,
  actualizarSuperheroeFromFormController,
  buscarSuperheroePorAtributoController, 
  crearSuperHeroeController, 
  eliminarHeroe, 
  eliminarSuperheroePorIdController, 
  eliminarSuperheroePorNombreController, 
  mostrarFormularioActualizarSuperheroeController, 
  mostrarFormularioSuperheroeController, 
  obtenerSuperheroesMayoresDe30Controller, 
  obtenerSuperheroesPorIdController, 
  obtenerTodosLosSuperheroesController 
} from '../controllers/superheroesController.mjs';
import superheroValidations from '../validations/superheroValidation.mjs';

const router = express.Router();

router.get('/heroes', obtenerTodosLosSuperheroesController);
router.get('/heroes/crear', mostrarFormularioSuperheroeController);
router.post('/heroes', superheroValidations, crearSuperHeroeController);
router.get('/heroes/:id', obtenerSuperheroesPorIdController);
router.get('/heroes/editar/:id', mostrarFormularioActualizarSuperheroeController);
router.post('/heroes/editar/:id', superheroValidations, actualizarSuperheroeFromFormController);
router.patch('/heroes/:id', actualizarSuperheroeController);
router.delete('/heroes/:id', eliminarSuperheroePorIdController);
router.delete('/heroes/nombre/:nombre', eliminarSuperheroePorNombreController);
router.get('/heroes/eliminar/:id', eliminarHeroe);
router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroePorAtributoController);

export default router;