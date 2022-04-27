require('dotenv').config();
const { Router } = require('express');
const router = Router();
const { API_KEY } = process.env;
const axios = require('axios');

//GET /videogames  &&  /videogames?name="..."
router.get('/', async (req, res, next) => {
    const { name } = req.query
    try {
        // const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
        // const data = [];
        // response.data.results.forEach(elem => {
        //     let genres = elem.genres.map(e => e.name)
        //     data.push({name: elem.name, image: elem.background_image, genres: genres})
        // })
        // res.json(data)
        // res.json(response.data.results)
        // res.json(response.data.results[0].name) --> "Grand Theft Auto V"
        // res.json(response.data.results[0].background_image) //--> "(...).jgp"
        // res.json(response.data.results[0].genres) //--> [{name: action}, {name: adventure}]

        if(!name) {
            const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
            const data = [];
            response.data.results.forEach(elem => {
                let genres = elem.genres.map(e => e.name)
                data.push({name: elem.name, image: elem.background_image, genres: genres})
            })
            res.json(data)
        } else {
            const response = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);
            const data = [];
            response.data.results.forEach(elem => {
                let genres = elem.genres.map(e => e.name)
                data.push({name: elem.name, image: elem.background_image, genres: genres})
            })
            res.json(data)
        }
    } catch (error) {
        next(error)
    }
});

module.exports = router


// GET /videogames:
// Obtener un listado de los videojuegos
// Debe devolver solo los datos necesarios para la ruta principal

// GET /videogames?name="...":
// Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
// Si no existe ningún videojuego mostrar un mensaje adecuado


// Ruta principal: debe contener

// [ ] Input de búsqueda para encontrar videojuegos por nombre
// [ ] Área donde se verá el listado de videojuegos. Deberá mostrar su:
// Imagen
// Nombre
// Géneros
// [ ] Botones/Opciones para filtrar por género y por videojuego existente o agregado por nosotros
// [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los videojuegos por orden alfabético y por rating
// [ ] Paginado para ir buscando y mostrando los siguientes videojuegos, 15 juegos por pagina, mostrando los primeros 15 en la primer pagina.