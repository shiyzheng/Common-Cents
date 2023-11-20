import { app } from '../server.js'
import request from 'supertest'

// request(app)
//     .get('/admin/console/topics')
//     .expect('Content-Type', /json/)
//     .expect(200)
//     .end(function (err) {
//         if (err) throw err;
//     });

describe("GET /admin/console/topics", () => {
    test("should respond with 200", async () => {
        const response = await request(app).get('/admin/console/topics');
        expect(response.statusCode).toBe(200);
    });
});
        