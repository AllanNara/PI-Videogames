require('dotenv').config()
const axios = require('axios');
const { Router } = require('express');
const router = Router();
const { API_KEY } = process.env;
const { Videogame, Genre, Platform } = require('../db')  

// Obtener el detalle de un videojuego en particular
// Debe traer solo los datos pedidos en la ruta de detalle de videojuego
// Incluir los géneros asociados
router.get('/:idVideogame', async (req, res, next) => {
    const { idVideogame } = req.params;

    try {
        
        if(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(idVideogame)){
            const findInDB = await Videogame.findByPk(idVideogame);
            return findInDB ? res.json(findInDB.toJSON()) : res.status(404).json({Error: 'Data not found'})
        }
        
        const response = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`);
        const data = {};
        let genresArry = response.data.genres.map(genere => genere.name)
        data.name = response.data.name;
        data.image = response.data.background_image;
        data.genres = genresArry;
        data.description = response.data.description_raw;
        data.released = response.data.released;
        data.rating = response.data.rating;
        data.platforms = response.data.platforms;
        res.json(data)
    } catch (error) {
        next(error)
    }
});

// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
// Crea un videojuego en la base de datos
router.post('/', async (req, res, next) => {
    const { name, description, platforms } = req.body;
    if(!name || !description || !platforms) return res.status(404).send('Falta enviar datos obligatorios');

    try {

        const newVideogame = await Videogame.create(req.body);
        let genresGame = req.body.genres.map(elem => Genre.findOne({
            where: { name: elem }
        }));
        let platformsGame = req.body.platforms.map(elem => Platform.findOne({
            where: { name: elem }
        }));

        await Promise.all(genresGame).then(e => {
            let data = e.map(dts => dts.toJSON());
            data.forEach(async e => await newVideogame.addGenre(e.id));
        })
        await Promise.all(platformsGame).then(e => {
            let data = e.map(dts => dts.toJSON());
            data.forEach(async e => await newVideogame.addPlatform(e.id));
            res.json(newVideogame);
        })

    } catch (error) {
        next(error)
    }
});
//OBLIGATORIOS: name, description, platforms & ID (default)

module.exports = router


// Ruta de detalle de videojuego: debe contener
// [ ] Los campos mostrados en la ruta principal para cada videojuegos (imagen, nombre, y géneros)
// [ ] Descripción
// [ ] Fecha de lanzamiento
// [ ] Rating
// [ ] Plataformas
// [ ] GENEROS ASOCIADOS

