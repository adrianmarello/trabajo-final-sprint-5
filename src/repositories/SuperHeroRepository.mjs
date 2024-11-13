import SuperHero from "../models/SuperHero.mjs";
import IRepository from "./IRepository.mjs";

class SuperHeroRepository extends IRepository {
  async obtenerPorId(id) {
    return await SuperHero.findById(id);
  }

  async obtenerTodos() {
    return await SuperHero.find({});
  }

  async buscarPorAtributo(atributo, valor) {
    let query = {};
    if (typeof valor === 'string' && atributo === 'edad') {
      // Si es un string y el atributo es numérico, no usamos RegExp
      if (isNaN(Number(valor))) {
        console.error("El valor no es un número válido");
        // O asignar un valor predeterminado:
        valor = 0;  // O cualquier valor por defecto adecuado para tu aplicación
      }
      query[atributo] = Number(valor);  // Convierte el valor a número
    } else if (typeof valor === 'string' && atributo !== 'edad') {
      // Si es un string pero no es un número, usamos RegExp
      query[atributo] = new RegExp(valor, 'i');
    } else if (typeof valor === 'number') {
      // Si es un número, no usamos RegExp
      query[atributo] = valor;
    }
    return await SuperHero.find(query);
  }

  async obtenerMayoresDe30() {
    return await SuperHero.find({ edad: { $gt: 30 }, planetaOrigen: 'Tierra', poderes: { $gte: 2 } });
  }
}

export default SuperHeroRepository;