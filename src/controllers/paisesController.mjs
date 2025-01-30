import { crearPais } from "../services/paisesService.mjs";


const COUNTRIES_API = process.env.COUNTRIES_API;

export function obtenerYGuardarPaises(req, res) {
    const paises = [];
    // obtener los paises y guardarlos en la base de datos
    fetch(COUNTRIES_API)
        .then(response => response.json())
        .then(async (data) => {

            let testPais = data[0];
            testPais.creador = 'Adrián Marello';
            const newPais = await crearPais(testPais);
            console.log(newPais);

            //data.forEach(async pais => {
                //const newPais = await crearPais(pais);
                //console.log(pais.capital);
                //paises.push(newPais);
            //});
            console.log(paises)
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ mensaje: 'Error al obtener los paises' });
        });

    res.status(200).json({ mensaje: 'Paises guardados exitosamente' });
}