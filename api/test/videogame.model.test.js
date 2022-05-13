// const { db, Role } = require('../db');
const request = require('supertest');
const server = require('../src/app')
const { conn, Videogame } = require('../src/db');

describe('POST /videogame', () => {
    beforeAll(async () => {
        await conn.sync({ force: true });
    });

    it('should not create the Videogame if data not send', async () => {
        const res = await request(server).post('/videogame');
        expect(res.statusCode).toBe(404);
    });
    
    it('should create the Videogame if all required properties are ok', async () => {
        const game = await Videogame.create({
            name: 'Age of Empires VII',
            description: 'This is a game this is a game this is a game fabulouse this is a game great',
            platforms: ['Atari', 'PC']
        });
        expect(game).toHaveProperty('name', 'Age of Empires VII');
        expect(game).toHaveProperty('description', 'This is a game this is a game this is a game fabulouse this is a game great');
    });
    
    afterAll(async () => {
        await conn.sync({ force: true });
        conn.close();
    })
})