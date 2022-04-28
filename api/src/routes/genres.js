const { Router } = require('express');
const router = Router();
const { API_KEY } = process.env;
const axios = require('axios');
const { Genre } = require('../db')  

//Obtener todos los tipos de géneros de videojuegos posibles
// En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí.

router.get('/', async (req, res, next) => {
    try {
        const response = await Genre.findAll();
        // console.log(response)
        if(response.length) return res.json(response);
        else {
            const dataApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
            const promises = dataApi.data.results.map(elem => Genre.findOrCreate({
                where: {id: elem.id, name: elem.name.toLowerCase()}
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
