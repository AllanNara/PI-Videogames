const { Router } = require('express');
const router = Router();
const { API_KEY } = process.env;
const axios = require('axios');
const { Platform } = require('../db')  

//Obtener todos los tipos de géneros de videojuegos posibles
// En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí.

router.get('/', async (req, res, next) => {
    try {
        const response = await Platform.findAll();
        if(response.length) return res.json(response);
        else {
            const dataApi = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`)
            const dataApi2 = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}&page=2`)
            dataApi2.data.results.forEach(elem => dataApi.data.results.push(elem))
            const promises = dataApi.data.results.map(elem => Platform.findOrCreate({
                where: {id: elem.id, name: elem.name}
            }));
            await Promise.all(promises)
            .then(data => {
                const result = data.map(elem => elem[0]);
                return res.json(result)
            })
        }
    } catch (error) {
        next(error)
    }
});

module.exports = router
