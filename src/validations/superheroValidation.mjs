import { body } from 'express-validator';

const superheroValidations = [
  body('nombreSuperHeroe')
    .trim().not().isEmpty().withMessage('El nombre del superhéroe es requerido')
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres')
    .isLength({ max: 60 }).withMessage('El nombre debe tener un máximo de 60 caracteres'),
  body('nombreReal')
    .trim().not().isEmpty().withMessage('El nombre real es requerido')
    .isLength({ min: 3 }).withMessage('El nombre real debe tener al menos 3 caracteres')
    .isLength({ max: 60 }).withMessage('El nombre real debe tener un máximo de 60 caracteres'),
  body('edad')
    .trim().not().isEmpty().withMessage('La edad es requerida')
    .isNumeric().withMessage('La edad debe ser numérica')
    .isInt({ min: 0 }).withMessage('La edad debe ser un número entero no negativo'),
  body('poderes')
    .customSanitizer((value) => {
      if (typeof value === 'string') {
        return value.split(',').map((item) => item.trim()); // Convertir el string a array
      }
      return value;
    })
    .isArray().withMessage('El campo poderes debe ser un array')
    .not().isEmpty().withMessage('El campo poderes no puede estar vacío')
    .custom((value) => {
      // Validar que cada elemento del array sea un string sin espacios en blanco
      if (!Array.isArray(value)) return false;
      for (const poder of value) {
        if (typeof poder !== 'string' || !poder.trim() || poder.length < 3 || poder.length > 60) {
          return false;
        }
      }
      return true;
    }).withMessage('Cada poder debe ser una cadena de texto entre 3 y 60 caracteres sin espacios en blanco'),
]

export default superheroValidations;