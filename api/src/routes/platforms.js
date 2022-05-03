//PLATFORMS.JS
const { Router } = require('express');
const router = Router();
const { API_KEY } = process.env;
const axios = require('axios');
const { Platform } = require('../db')  

router.get('/', async (req, res, next) => {
    try {
        const response = await Platform.findAll();
        if(response.length) return res.json(response);
        else {
            const allPlatfomrs = ['Atari',  'GameBoy', 'Mobile', 'Nintendo', 'Other', 'PC', 'PlayStation', 'Wii', 'Xbox']
            const promises = allPlatfomrs.map(elem => Platform.create({ name: elem }));
            // const dataApi = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`)
            // const dataApi2 = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}&page=2`)
            // dataApi2.data.results.forEach(elem => dataApi.data.results.push(elem))
            // const promises = dataApi.data.results.map(elem => Platform.findOrCreate({
            //     where: {id: elem.id, name: elem.name}
            // }));
            await Promise.all(promises)
            .then(data => {
                return res.json(data)
            })
        }
    } catch (error) {
        next(error)
    }
});

module.exports = router