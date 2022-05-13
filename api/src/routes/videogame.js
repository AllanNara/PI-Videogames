require('dotenv').config()
const axios = require('axios');
const { Router } = require('express');
const router = Router();
const { API_KEY } = process.env;
const { Videogame, Genre } = require('../db')  

router.get('/:idVideogame', async (req, res, next) => {
    const { idVideogame } = req.params;
    
    try {
        let findById;
        let isFromDB;
        if(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(idVideogame)){
            const inDataBase = await Videogame.findByPk(idVideogame, { include: [Genre] });
            findById = inDataBase ? inDataBase.toJSON() : null;
            isFromDB = true;
        } else if(!/^[a-zA-Z\s]*$/.test(idVideogame)){
            const findInApi = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`);
            findById = findInApi.data;
            isFromDB = false;
        };
        
        if(!findById) return res.status(404).json({ERROR: 'Game not found'});
        const data = {};
        let platformsArray = findById.platforms.map(pl => pl.platform);
        data.name = findById.name;
        data.image = isFromDB ? findById.image : findById.background_image;
        data.genres = findById.genres;
        data.description = isFromDB ? findById.description : findById.description_raw;
        data.released = findById.released;
        data.rating = findById.rating;
        data.platforms = isFromDB ? findById.platforms : platformsArray
        res.json(data)
    } catch (error) {
        next(error)
    }
});

router.post('/', async (req, res, next) => {
    const { name, description, platforms } = req.body;
    if(!name || !description || !platforms) return res.status(404).send('Falta enviar datos obligatorios');

    try {
        const newVideogame = await Videogame.create(req.body);
        let genresGame = req.body.genres.map(elem => Genre.findOne({
            where: { name: elem }
        }));
        
        await Promise.all(genresGame).then(e => {
            let data = e.map(dts => dts.toJSON());
            data.forEach(async e => await newVideogame.addGenre(e.id));
            res.send(newVideogame.toJSON().id);
        });
        
    } catch (error) {
        next(error);
    };
});

module.exports = router
