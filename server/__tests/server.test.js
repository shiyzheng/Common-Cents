import { putAdminConsoleTopic } from '../routes.js';
import { app } from '../server.js'
import request from 'supertest'

const TEST_ALL_TOPICS1 = ["topic1", "topic2"];
const TEST_TOPIC1 = "topic1";

const TEST_STORED_TOPIC1 = "stored-topic1";
const TEST_ALL_TOPICS_AFTER_PUT1 = ["topic1", "topic2", TEST_STORED_TOPIC1]

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

describe("GET /admin/console/topics/:topic", () => {
    test("response contains", async () => {
        const response = await request(app).get('/admin/console/topics');
        expect(response.statusCode).toBe(200);
        TEST_ALL_TOPICS1.forEach((element) => {
            expect(response.body).toContain(element);
        });
        console.log("response data:::", response.body);
        console.log("response type:::", typeof(response.body));
    });
});

describe("PUT,DELETE admin/console/topics/:topic", () => {
    test("test sequential PUT, DELETE", async () => {

        // puts a topic into the admin console
        const res1 = await request(app).put('/admin/console/topics/'
            + TEST_STORED_TOPIC1);
        expect(res1.statusCode).toBe(200);

        // gets all topics, tests that topic is put correctly
        const res2 = await request(app).get('/admin/console/topics');
        expect(res2.statusCode).toBe(200);
        TEST_ALL_TOPICS_AFTER_PUT1.forEach((element) => {
            expect(res2.body).toContain(element);
        });

        // deletes the topic from admin console
        const res3 = await request(app).delete('/admin/console/topics/' +
            TEST_STORED_TOPIC1);
        expect(res3.statusCode).toBe(200);

        // gets all topics, tests that put topic no longer exists
        const res4 = await request(app).get('/admin/console/topics');
        (res4.body).forEach((element => {
            expect(element).not.toEqual(TEST_STORED_TOPIC1);
        }))

    });
});
