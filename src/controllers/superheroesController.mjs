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
import { renderizarSuperheroe } from "../views/responseView.mjs";
import { validationResult } from 'express-validator';

const NAVBAR_LINKS = [
  { text: 'Inicio', href: '/api/heroes', icon: '/icons/home.svg'},
  { text: 'Agregar Superheroe', href: '/api/heroes/crear', icon: '/icons/home.svg'},
]

export function mostrarFormularioSuperheroeController(req, res) {
  res.render('addSuperhero', {
    title: 'Crear Superhéroe',
    navbarLinks: NAVBAR_LINKS,
  });
}

export async function mostrarFormularioActualizarSuperheroeController(req, res) {
  try {
    const hero = await obtenerSuperheroePorId(req.params.id);
    if (!hero) return res.status(404).send('Superhéroe no encontrado');
    res.render('editSuperhero', { 
      title: 'Editar Superhéroe', 
      navbarLinks: NAVBAR_LINKS, 
      hero 
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener el superhéroe');
  }
}

export async function crearSuperHeroeController(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const superheroe = req.body;
  const result = await crearSuperheroe(superheroe);
  if(result?.error) {
    res.status(400).json({ mensaje: 'No se pudo crear el superheroe', error: result.error });
    return;
  }
  res.redirect('/api/heroes');
  /*res.status(201).json({ 
    data: renderizarSuperheroe(result),
    mensaje: 'Superheroe creado exitosamente' 
  });*/
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

export async function actualizarSuperheroeFromFormController(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { id } = req.params;
  const superheroe = req.body;
  const result = await actualizarSuperheroe(id, superheroe);
  if(result?.error) {
    res.status(400).json({ mensaje: 'No se pudo actualizar el superheroe', error: result.error });
    return;
  }
  res.redirect('/api/heroes');
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
  try {
    const superheroes = await obtenerTodosLosSuperheroes();
    
    // Renderizar la vista 'dashboard' y pasarle los datos de los superhéroes
    res.render('dashboard', { 
      title: 'Dashboard de Superhéroes',
      navbarLinks: NAVBAR_LINKS,
      heroes: superheroes 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los superhéroes');
  }
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

export async function eliminarHeroe (req, res) {
  try {
    const result = await eliminarSuperheroePorId(req.params.id);
    if(result?.error) {
      res.status(400).json({ mensaje: 'No se pudo eliminar el superheroe', error: result.error });
      return;
    }
    res.redirect('/api/heroes');
  } catch (err) {
    res.status(500).send('Error al eliminar el superhéroe');
  }
}