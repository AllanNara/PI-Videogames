const { Router } = require('express');
const router = Router();
// const { API_KEY } = process.env;
// const axios = require('axios');
const { Genre } = require('../db')  

//Obtener todos los tipos de géneros de videojuegos posibles
// En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí.

router.get('/', async (req, res, next) => {
    try {
        const response = await Genre.findAll();
        return response.length? res.json(response) : res.status(404).json({Error: 'Fatal Error'})
    } catch (error) {
        next(error)
    }
});

module.exports = router

