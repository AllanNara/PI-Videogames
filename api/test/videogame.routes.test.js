// const request = require('supertest');
const session = require('supertest-session');
const app = require('../src/app');
// const { conn } = require('../src/db');

const agent = session(app);

describe('GET /videogames', () => {
    // beforeAll(async () => {
    // await conn.sync();
    // });
    
      it('should return status 200',
       async () => {
        const res = await request(app).get('/videogames');
        expect(res.statusCode).toBe(200);
      });
      it('should return status 200 if query params name exists',
       async () => {
        const res = await request(app).get('/videogames?name=gta');
        expect(res.statusCode).toBe(200);
      });
      it('should return status 404 if query params not exist',
       async () => {
        const res = await request(app).get('/videogames?name=2d3');
        expect(res.statusCode).toBe(404);
        expect(res.body.ERROR).toEqual("Game not found")
      });
    // afterAll(() => {
    // conn.close();
    // })
})



