const { API_KEY } = process.env;
const { Genre, Platform } = require('../db')
const axios = require('axios');

async function preLoad() {
    const allPlatfomrs = ['Atari',  'GameBoy', 'Mobile', 'Nintendo', 'Other', 'PC', 'PlayStation', 'Wii', 'Xbox']
    const promisesPlatf = allPlatfomrs.map(elem => Platform.create({ name: elem }));
    await Promise.all(promisesPlatf)

    const dataApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    const promisesGenr = dataApi.data.results.map(elem => Genre.findOrCreate({
        where: {id: elem.id, name: elem.name}
    }));
    await Promise.all(promisesGenr)
};

module.exports = {
    preLoad
  };