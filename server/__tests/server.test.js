import { putAdminConsoleTopic } from '../routes.js';
import { app } from '../server.js'
import request from 'supertest'

const TEST_ALL_TOPICS1 = ["topic1", "topic2"];

// const TEST_STORED_TOPIC1 = "stored-topic1";

const TEST_TOPIC1 = "topic1";
// const TEST_ALL_QUESTIONS_FROM_TOPIC1 = ["question1.json", "question2.json"]

// const TEST_QUESTION1_TOPIC1 = "question1.json";
// const TEST_JSON_QUESTION1_TOPIC1 = {
//     "question1": "Question1-Text",
//     "answer": ["a11", "a12", "a13", "a14"]
// };

// const TEST_STORED_QUESTION1_TOPIC1 = "stored-question1.json";
// const TEST_STORED_JSON_QUESTION1_TOPIC1 = {
//     "stored-question1": "Stored-Question1-Text",
//     "answer": ["a11", "a12", "a13", "a14"]
// };


describe("GET /admin/console/topics", () => {
    test("response contains expected test topics", async () => {
        const response = await request(app).get('/admin/console/topics');
        expect(response.statusCode).toBe(200);
        TEST_ALL_TOPICS1.forEach((element) => {
            expect(response.body).toContain(element);
        });
        console.log("response data:::", response.body);
        console.log("response type:::", typeof(response.body));
    });
});

describe("PUT admin/console/topics", () => {
    test("response contains expected test topics", async () => {
        // const response = await request(app).put('/admin/console/topics/topic1');
        // expect(response.statusCode).toBe(200);
        expect(1).toBe(2);
    });
});
