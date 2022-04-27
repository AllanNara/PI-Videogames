const { Router } = require('express');
const router = Router();

router.get('/', (req, res, next) => {
    try {
        res.send('OK')
    } catch (error) {
        next()
    }
});

module.exports = router

//Obtener todos los tipos de géneros de videojuegos posibles
// En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí