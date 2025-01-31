import { crearPais, obtenerTodosLosPaises } from "../services/paisesService.mjs";

const COUNTRIES_API = process.env.COUNTRIES_API;
const NAVBAR_LINKS = [
    { text: 'Inicio', href: '/api/pais/ver-todos', icon: '/icons/home.svg'},
    { text: 'Agregar Pais', href: '/api/pais/crear', icon: '/icons/home.svg'},
  ]

export async function obtenerYGuardarPaises(req, res) {
    const paises = [];
    try {
        const response = await fetch(COUNTRIES_API);
        const data = await response.json();

        // Filtramos los paises que hablan español
        const paisesConEspanol = data.filter(pais => pais?.languages?.spa);

        // Creamos un array de promesas para insertar los paises
        const promesas = paisesConEspanol.map(async pais => {
            pais.creador = 'Adrián Marello'; // Agregamos el creador
            await crearPais(pais); // Guardamos el pais en la base de datos
            paises.push(pais); // Añadimos el pais al array para la respuesta
        });

        // Esperamos a que todas las inserciones se completen
        await Promise.all(promesas);

        // Respondemos después de haber guardado todos los paises
        res.status(200).json({ data: paises, mensaje: 'Paises guardados exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener los paises' });
    }
}

export async function obtenerTodosLosPaisesController(req, res) {
  try {
    // Obtener todos los paises de la base de datos
    const paises = await obtenerTodosLosPaises();
    // Filtrar paises por creador y que contengan un nombre
    const paisesFiltrados = paises.filter(pais => pais.creador === 'Adrián Marello' && pais.name.official);
    // Población total
    const poblacionTotal = paisesFiltrados.reduce((acc, pais) => acc + pais.population, 0);
    // Área total
    const areaTotal = paisesFiltrados.reduce((acc, pais) => acc + pais.area, 0);
    // Gini promedio
    const giniPromedio = paisesFiltrados.reduce(
        (acc, pais) => acc + (pais?.gini[2019] ? pais?.gini[2019] : 0), 0
    ) / paisesFiltrados.length;
    
    // Renderizar la vista 'dashboard' y pasarle los datos de los paises
    res.render('dashboardPaises', { 
      title: 'Dashboard de Paises',
      navbarLinks: NAVBAR_LINKS,
      paises: paisesFiltrados,
      poblacion_total: poblacionTotal,
      area_total: areaTotal,
      gini_promedio: giniPromedio,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los paises');
  }
}