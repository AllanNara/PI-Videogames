require('dotenv').config();
const { Router } = require('express');
const router = Router();
const { API_KEY } = process.env;
const { Videogame, Genre, Op } = require('../db')  
const axios = require('axios');

router.get('/', async (req, res, next) => {
    const { name } = req.query;
    
    try {
        const options = name ? 
        { include: Genre, where: {name: {[Op.substring]: name }} }
        : { include: Genre };

        const callDataBase = await Videogame.findAll(options);
        const resultDataBase = callDataBase.map(elem => elem.toJSON());

        let resultApi = [];
        if(!name) {
            const callApi = `https://api.rawg.io/api/games?page_size=40&key=${API_KEY}`;
            const nexts = axios.get(`${callApi}&page=1`);
            const nexts1 = axios.get(`${callApi}&page=2`);
            const nexts2 = axios.get(`${callApi}&page=3`);
            await Promise.all([nexts, nexts1, nexts2])
                .then(response => {
                resultApi = [
                    ...response[0].data.results, 
                    ...response[1].data.results, 
                    ...response[2].data.results
                ];
                })
                .catch(error => {
                return res.status(400).json({error: 'Fatal error!', message: error})
                });
        } else {
            const callApi = `https://api.rawg.io/api/games?search=${name}&page_size=40&key=${API_KEY}`;
            for(let i = 1; i <= 2; i++) {
                const nexts = await axios.get(`${callApi}&page=${i}`);
                resultApi = [...resultApi, ...nexts.data.results];
                if(!nexts.data.next) break;
            };      
        };

        const final = [...resultApi, ...resultDataBase];
        const dataFinal = [];
        final.forEach(elem => {
            let allGenres = elem.genres.map(e => e.name);
            dataFinal.push({
                id: elem.id,
                name: elem.name,
                isDataBase: !!elem.isDataBase,
                image: elem.image ? elem.image : elem.background_image,
                genres: allGenres
            })
        });

        return !name ? 
        res.json(dataFinal) 
        : dataFinal.length ? 
        res.json(dataFinal) : 
        res.status(404).json({ERROR: "Game not found"});

    } catch (error) {
        next(error)
    }
});

module.exports = router
