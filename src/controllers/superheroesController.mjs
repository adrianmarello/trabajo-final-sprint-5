import { 
  actualizarSuperheroe,
  buscarSuperheroePorAtributo, 
  crearSuperheroe, 
  eliminarSuperheroePorId, 
  eliminarSuperheroePorNombre,
  obtenerSuperheroePorId, 
  obtenerSuperheroesMayoresDe30, 
  obtenerTodosLosSuperheroes 
} from "../services/superheroesService.mjs";
import { renderizarListaSuperheroes, renderizarSuperheroe } from "../views/responseView.mjs";

export async function crearSuperHeroeController(req, res) {
  const superheroe = req.body;
  const result = await crearSuperheroe(superheroe);
  if(result?.error) {
    res.status(400).json({ mensaje: 'No se pudo crear el superheroe', error: result.error });
    return;
  }
  res.status(201).json({ 
    data: renderizarSuperheroe(result),
    mensaje: 'Superheroe creado exitosamente' 
  });
}

export async function actualizarSuperheroeController(req, res) {
  const { id } = req.params;
  const superheroe = req.body;
  const result = await actualizarSuperheroe(id, superheroe);
  if(result?.error) {
    res.status(400).json({ mensaje: 'No se pudo actualizar el superheroe', error: result.error });
    return;
  }
  res.status(200).json({ 
    data: renderizarSuperheroe(result),
    mensaje: 'Superheroe actualizado exitosamente' 
  });
}

export async function eliminarSuperheroePorIdController(req, res) {
  const { id } = req.params;
  const result = await eliminarSuperheroePorId(id);
  if(result?.error) {
    res.status(400).json({ mensaje: 'No se pudo eliminar el superheroe', error: result.error });
    return;
  }
  res.status(200).json({ 
    data: renderizarSuperheroe(result),
    mensaje: 'Superheroe eliminado exitosamente' 
  });
}

export async function eliminarSuperheroePorNombreController(req, res) {
  const { nombre } = req.params;
  const result = await eliminarSuperheroePorNombre(nombre);
  if(result?.error) {
    res.status(400).json({ mensaje: 'No se pudo eliminar el superheroe', error: result.error });
    return;
  }
  if(result === null) {
    res.status(404).json({ mensaje: 'Superheroe no encontrado' });
    return;
  }
  res.status(200).json({ 
    data: renderizarSuperheroe(result),
    mensaje: 'Superheroe eliminado exitosamente' 
  });
}

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