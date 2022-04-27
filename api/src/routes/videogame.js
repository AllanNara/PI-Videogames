require('dotenv').config()
const { Router } = require('express');
const router = Router();
const { API_KEY } = process.env;
  

// Obtener el detalle de un videojuego en particular
// Debe traer solo los datos pedidos en la ruta de detalle de videojuego
// Incluir los géneros asociados
router.get('/:idVideogame', (req, res, next) => {
    try {
        res.send('OK')
    } catch (error) {
        next()
    }
});

// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
// Crea un videojuego en la base de datos
router.post('/', (req, res, next) => {
    try {
        res.send('OK')
    } catch (error) {
        next()
    }
});

module.exports = router

// Ruta de detalle de videojuego: debe contener
// [ ] Los campos mostrados en la ruta principal para cada videojuegos (imagen, nombre, y géneros)
// [ ] Descripción
// [ ] Fecha de lanzamiento
// [ ] Rating
// [ ] Plataformas
// [ ] GENEROS
