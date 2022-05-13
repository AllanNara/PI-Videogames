const request = require('supertest');
const app = require('../src/app');

describe('GET /videogames', () => {

  it('should return status 200',
    () => {
    return request(app).get('/videogames').then(res => {
      expect(res.statusCode).toBe(200)
    })
  });

  it('should return status 200 if query params name exists',
    () => {
    return request(app).get('/videogames?name=gta').then(res => {
      expect(res.statusCode).toBe(200);
    })
  });

  it('should return status 404 if query params not exist',
    async () => {
    const res = await request(app).get('/videogames?name=2d3');
    expect(res.statusCode).toBe(404);
    expect(res.body.ERROR).toEqual("Game not found")
  });
})



