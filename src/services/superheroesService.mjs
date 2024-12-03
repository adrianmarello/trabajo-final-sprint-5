import mongoose from "mongoose";
import SuperHeroRepository from '../repositories/SuperHeroRepository.mjs';

const superHeroRepository = new SuperHeroRepository();

export async function crearSuperheroe(superheroe) {
  try {
    const superhero = await superHeroRepository.crear(superheroe);
    return superhero
  } catch (error) {
    return {
      error: JSON.stringify(error)
    }
  }
}

export async function eliminarSuperheroePorId(id) {
  try {
    return await superHeroRepository.deleteById(id);
  } catch (error) {
    return {
      error: JSON.stringify(error)
    }
  }
}

export async function eliminarSuperheroePorNombre(nombre) {
  try {
    return await superHeroRepository.deleteByName(nombre);
  } catch (error) {
    return {
      error: JSON.stringify(error)
    }
  }
}

export async function actualizarSuperheroe(id, superheroe) {
  try {
    let hero = await superHeroRepository.actualizar(id, superheroe);
    const result = { ...hero.toJSON(), ...superheroe}
    return result
  } catch (error) {
    return {
      error: JSON.stringify(error)
    }
  }
}

export async function obtenerSuperheroePorId(id) {
  if(id.length === 24) {
    return await superHeroRepository.obtenerPorId(id);
  } else {
    return null;
  }
}

export async function obtenerTodosLosSuperheroes() {
  return await superHeroRepository.obtenerTodos();
}

export async function buscarSuperheroePorAtributo(atributo, valor) {
  return await superHeroRepository.buscarPorAtributo(atributo, valor);
}

export async function obtenerSuperheroesMayoresDe30() {
  return await superHeroRepository.obtenerMayoresDe30();
}