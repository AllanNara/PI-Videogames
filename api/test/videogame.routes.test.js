const request = require('supertest');
const app = require('../src/app');
const { conn } = require('../src/db');

describe('Videogame Routes', () => {
    beforeAll(async () => {
    await conn.sync({ force: true });
    })
      it('should return status 404 and corresponding text if any of the mandatory parameters is not send',
       async () => {
        const res = await request(app).post('/videogame');
        expect(res.statusCode).toBe(404);
        expect(res.text).toBe('Falta enviar datos obligatorios');
      });
  
    afterAll(() => {
    conn.close();
    })
})



