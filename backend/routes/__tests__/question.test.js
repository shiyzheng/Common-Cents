const request = require('supertest');
const { app } = require('../../server');

// const {
//     getAllQuestions,
//     getQuestionById,
// } = require('../question');

const CONSTANTS = require('../constants');
const PATH_PREFIX = "/question/"

const _TESTS = {
    BASE_QUESTION_NAMES: ["base question 1",
        "base question 2",
    ],
    BASE_QUESTION_ANSWERS: ["a1", "a2", "a3", "a4"],
    BASE_QUESTION_1_ID: "65ada7c0b98990835fc2cfae"
}

describe('Question Routes Tests', function () {
    test('Tests if test questions are in the base collection',
        async () => {

            const res = await request(app).get(`${PATH_PREFIX}`);
            expect(res.statusCode).toEqual(CONSTANTS.STATUS.OK);
            const names = []
            const answers = [];

            res.body.forEach((element) => {
                names.push(element.question);
                answers.push(element.possibleAnswers);
            });

            // Tests if received array contains all elements of expected array
            expect(names).toEqual(expect.arrayContaining(_TESTS.BASE_QUESTION_NAMES));

            answers.forEach((element) => {
                expect(element).toEqual(expect.arrayContaining(_TESTS.BASE_QUESTION_ANSWERS))
            })

            console.log(res.body);
        });
});