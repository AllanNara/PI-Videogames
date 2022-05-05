require('dotenv').config();
const { Router } = require('express');
const router = Router();
const { API_KEY } = process.env;
const { Videogame, Genre, Op } = require('../db')  
const axios = require('axios');

router.get('/', async (req, res, next) => {
    const { name } = req.query
    
    try {
        const options = !name ?
        { include: Genre, attributes: {exclude: ['rating', 'released', 'description']} } :
        { include: Genre, attributes: {exclude: ['rating', 'released', 'description']}, where: {name: {[Op.substring]: name }} }

        const allDataBase = await Videogame.findAll(options)

        const dataBase = [];
        allDataBase.forEach(elem => {
            let { id, name, isDataBase, image, genres } = elem.toJSON();
            let allGenres = genres.map(e => e.name);
            dataBase.push({
                id,
                name,
                isDataBase,
                image,
                genres: allGenres
            });
        });

        const main = !name ?
         await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`) 
         : await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);
         
        for(let i = 0; i < 4; i++) {
            const nexts = await axios.get(main.data.next)
            main.data.results = [...main.data.results, ...nexts.data.results]
        };
        
        const data = [];
        main.data.results.forEach(elem => {
            let allGenres = elem.genres.map(e => e.name)
            data.push({
                id: elem.id,
                name: elem.name,
                isDataBase: false,
                image: elem.background_image, 
                genres: allGenres, 
            });
        });

        const result = [...data, ...dataBase];

         return !name ?
          res.json(result) 
          : result.length ?
           res.json(result) : res.status(404).json({ERROR: "Game not found"});
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