import mongoose from "mongoose";
import SuperHeroRepository from "../repositories/superHeroRepository.mjs";

const superHeroRepository = new SuperHeroRepository();

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