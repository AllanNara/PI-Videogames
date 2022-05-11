const { Router } = require('express');
const router = Router();
const { Genre } = require('../db')  

router.get('/', async (req, res, next) => {
    try {
        const response = await Genre.findAll();
        return response.length? res.json(response) : res.status(404).json({Error: 'Fatal Error'})
    } catch (error) {
        next(error)
    }
});

module.exports = router

