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
        let findById;
        if(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(idVideogame)){
            const inDataBase = await Videogame.findByPk(idVideogame, { include: [Genre, Platform] });
            findById = inDataBase ? inDataBase.toJSON() : null;
        } else {
            const findInApi = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`);
            findById = findInApi.data;
        }
        if(!findById) return res.status(404).json({ErrorDataBase: 'Game not found'})
        if(!findById.length) return res.status(404).json({ErrorApi: 'Game not found'})
        const data = {};
        let genresArray = findById.genres.map(genere => genere.name);
        let platformsArray = findById.platforms.map(platform => platform.name);
        data.name = findById.name;
        data.image = findById.image;
        data.genres = genresArray;
        data.description = findById.description;
        data.released = findById.released;
        data.rating = findById.rating;
        data.platforms = platformsArray;
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

