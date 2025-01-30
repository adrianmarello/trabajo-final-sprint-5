import mongoose from "mongoose";
import PaisesRepository from "../repositories/PaisesRepository.mjs";

const paisesRepository = new PaisesRepository();

export async function crearPais(pais) {
  try {
    const newPais = await paisesRepository.crear(pais);
    return newPais
  } catch (error) {
    return {
      error: JSON.stringify(error)
    }
  }
}

export async function eliminarPaisPorId(id) {
  try {
    return await paisesRepository.deleteById(id);
  } catch (error) {
    return {
      error: JSON.stringify(error)
    }
  }
}

export async function eliminarPaisPorNombre(nombre) {
  try {
    return await paisesRepository.deleteByName(nombre);
  } catch (error) {
    return {
      error: JSON.stringify(error)
    }
  }
}

export async function actualizarPais(id, pais) {
  try {
    let updatedPais = await paisesRepository.actualizar(id, pais);
    const result = { ...updatedPais.toJSON(), ...pais}
    return result
  } catch (error) {
    return {
      error: JSON.stringify(error)
    }
  }
}

export async function obtenerPaisPorId(id) {
  if(id.length === 24) {
    return await paisesRepository.obtenerPorId(id);
  } else {
    return null;
  }
}

export async function obtenerTodosLosPaises() {
  return await paisesRepository.obtenerTodos();
}