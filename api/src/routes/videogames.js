require('dotenv').config();
const { Router } = require('express');
const router = Router();
const { API_KEY } = process.env;
const axios = require('axios');

//GET /videogames  &&  /videogames?name="..."
router.get('/', async (req, res, next) => {
    const { name } = req.query
    try {
        if(!name) {
            const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
            const data = [];
            // console.log(response.data.results)
            response.data.results.forEach(elem => {
                let Allgenres = elem.genres.map(e => e.name)
                data.push({name: elem.name, image: elem.background_image, genres: Allgenres, id: elem.id})
            })
            return res.json(data)
        } else {
            const response = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);
            const data = [];
            response.data.results.forEach(elem => {
                let Allgenres = elem.genres.map(e => e.name)
                data.push({name: elem.name, image: elem.background_image, genres: Allgenres})
            })
            return data.length ? res.json(data) : res.status(404).json({ERROR: "Game not found"})
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