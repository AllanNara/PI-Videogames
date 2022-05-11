const { Router } = require('express');
const videogames = require('./videogames');
const videogame = require('./videogame');
const genres = require('./genres');
const platforms = require('./platforms')


const router = Router();

router.use('/videogames', videogames)
router.use('/videogame', videogame)
router.use('/genres', genres)
router.use('/platforms', platforms)


module.exports = router;
