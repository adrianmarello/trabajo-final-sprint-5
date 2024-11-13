import { 
  buscarSuperheroePorAtributo, 
  obtenerSuperheroePorId, 
  obtenerSuperheroesMayoresDe30, 
  obtenerTodosLosSuperheroes 
} from "../services/superheroesService.mjs";
import { renderizarListaSuperheroes, renderizarSuperheroe } from "../views/responseView.mjs";

export async function obtenerSuperheroesPorIdController(req, res) {
  const { id } = req.params;
  const superheroe = await obtenerSuperheroePorId(id);
  if(superheroe) {
    res.send(renderizarSuperheroe(superheroe));
  } else {
    res.status(404).json({ mensaje: 'Superheroe no encontrado' });
  }
}

export async function obtenerTodosLosSuperheroesController(req, res) {
  const superheroes = await obtenerTodosLosSuperheroes();
  res.send(renderizarListaSuperheroes(superheroes));
}

export async function buscarSuperheroePorAtributoController(req, res) {
  const { atributo, valor } = req.params;
  const superheroes = await buscarSuperheroePorAtributo(atributo, valor);
  if(superheroes.length > 0) {
    res.send(superheroes);
  } else {
    res.status(404).json({ mensaje: 'No se encontraron superheroes con ese atributo' });
  }1
}

export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
  const superheroes = await obtenerSuperheroesMayoresDe30();
  res.send(superheroes);
}