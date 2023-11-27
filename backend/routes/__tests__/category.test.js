const request = require('supertest');
const { app } = require('../../server');

const qs = require('qs')

const STATUS = require('../category').STATUS;

const { questionInCategory,
        updateCategory,
        getQuestion,
} = require('../category');

const PATH_PREFIX = "/category/"
const NON_PATH = "doesNotExist";

const _TESTS = {
    BASE_NAMES: ["Test-Topic1", "Test-Topic2", "Test-Topic3"],
    INSERT_ONE: "Test-Inserted-Topic1",
    NO_OBJECT: {},

    QUESTION_TOPIC: "Topic With Questions",
    QUESTION: {
        question: "Test Question Text?",
        possibleAnswers: ["a1", "a2", "a3", "a4"],
        correctAnswer: "a3",
    }
};

// builds query params string given object of key value pairs
// which can be appended after any valid url that contains ?
function buildQueryParamsString(jsonObject) {
    let res = "";
    let first = true;
    Object.keys(jsonObject).forEach(function (key) {
        if (first) {
            res += key + "=" + jsonObject[key];
            first = false;
        } else {
            res += "&" + key + "=" + jsonObject[key];
        }
    });
    return res;
}


describe('Routes Tests', function () {

    test('Tests if all base topics are in the categories collection',
        async () => {
            const res = await request(app).get(`${PATH_PREFIX}`);
            expect(res.statusCode).toEqual(200);
            const names = []
            res.body.forEach((element) => {
                names.push(element.name);
            });
            // Tests if received array contains all elements of expected array
            expect(names).toEqual(expect.arrayContaining(_TESTS.BASE_NAMES));
        });

    test('Tests getting topic by name', async () => {
            const index = 0;
        const res =
            await request(app).get(`${PATH_PREFIX}${_TESTS.BASE_NAMES[index]}`);
            expect(res.statusCode).toEqual(200);
            // test that correct topic is gotten 
            expect(res.body.name).toEqual(_TESTS.BASE_NAMES[index]);
    });

    test('Tests getting non-existent topic', async () => {
        const res = await request(app).get(`${PATH_PREFIX}${NON_PATH}`);
        expect(res.statusCode).toEqual(STATUS.NOT_FOUND);
        expect(res.body).toEqual(_TESTS.NO_OBJECT);
    });

    test('Test inserting object that already exists', async () => {
        const index = 0;
        const res = await request(app).put(`${PATH_PREFIX}${_TESTS.BASE_NAMES[index]}`);
        expect(res.statusCode).toEqual(STATUS.EXISTS);
        expect(res.body).toEqual(_TESTS.NO_OBJECT);
    });

    test('Test deleting object that does not exist', async () => {
        const res = await request(app).delete(`${PATH_PREFIX}${NON_PATH}`);
        expect(res.statusCode).toEqual(STATUS.NOT_FOUND);
        expect(res.body).toEqual(_TESTS.NO_OBJECT);
    });


    test('Tests inserting then deleting a topic', async () => {

        // deletes inserted topic if exist for some reason
        const res0 = await request(app).delete(`${PATH_PREFIX}${_TESTS.INSERT_ONE}`);

        const res1 = await request(app).put(`${PATH_PREFIX}${_TESTS.INSERT_ONE}`);
        const res2 = await request(app).get(`${PATH_PREFIX}${_TESTS.INSERT_ONE}`);
        const res3 = await request(app).delete(`${PATH_PREFIX}${_TESTS.INSERT_ONE}`);
        const res4 = await request(app).get(`${PATH_PREFIX}${_TESTS.INSERT_ONE}`);

        // tests situation in which res0 deletes existing resource 
        // or the resource already does not exist
        expect([STATUS.OK, STATUS.NOT_FOUND]).toEqual(expect.arrayContaining([res0.statusCode]));

        expect(res1.statusCode).toBe(STATUS.CREATED); // resource created
        expect(res2.statusCode).toBe(STATUS.OK); // resource exists
        expect(res3.statusCode).toBe(STATUS.OK); // resource deleted
        expect(res4.statusCode).toBe(STATUS.NOT_FOUND); // resource already deleted

        expect(res1.body.name).toEqual(`${_TESTS.INSERT_ONE}`)
        expect(res2.body.name).toEqual(`${_TESTS.INSERT_ONE}`)
        expect(res3.body.name).toEqual(`${_TESTS.INSERT_ONE}`)
        expect(res4.body).toEqual(_TESTS.NO_OBJECT)
    });

    test('Tests question not in category and then in category', async () => {
        let category = {
            name: "category-name",
            questions: []
        }
        const question = _TESTS.QUESTION;
        expect(questionInCategory(category, question)).toBeFalsy();

        category = updateCategory(category, question);
        expect(questionInCategory(category, question)).toBeTruthy();
    })

    test('Tests getting a question from a url string', async () => {
        const path_for_question = `${PATH_PREFIX}${_TESTS.QUESTION}`;
        const queryParamsString = qs.stringify(_TESTS.QUESTION);
        const queryParamsPath = `${path_for_question}?${queryParamsString}`;
        const parsedQuestion = getQuestion(queryParamsPath);
        expect(parsedQuestion).toEqual(_TESTS.QUESTION);
    });

    test('Tests creating a category with query parameters', async () => {

        const path_for_question = `${PATH_PREFIX}${_TESTS.QUESTION_TOPIC}`;

        // deletes topic if exist for some reason
        const res0 = await request(app).delete(path_for_question);

        const queryParamsString = qs.stringify(_TESTS.QUESTION);
        const queryParamsPath = `${path_for_question}?${queryParamsString}`;


        const res1 = await request(app).put(queryParamsPath);
        const res2 = await request(app).get(path_for_question);
        const res3 = await request(app).delete(path_for_question);
        const res4 = await request(app).get(path_for_question);

        expect([STATUS.OK, STATUS.NOT_FOUND]).toEqual(expect.arrayContaining([res0.statusCode]));

        expect(res1.statusCode).toBe(STATUS.CREATED); // resource created
        expect(res2.statusCode).toBe(STATUS.OK); // resource exists
        expect(res3.statusCode).toBe(STATUS.OK); // resource deleted
        expect(res4.statusCode).toBe(STATUS.NOT_FOUND); // resource not found 

        // questions array was given one question, therefore should be size 1
        expect(res1.body.questions.length).toBe(1);

        // tests that correct question-topic object is returned from
        // put, get, and delete operations by testing the question within the
        // topic and that the question topic was successfully deleted.
        expect(res1.body.questions[0].question).toEqual(_TESTS.QUESTION.question)
        expect(res2.body.questions[0].question).toEqual(_TESTS.QUESTION.question)
        expect(res3.body.questions[0].question).toEqual(_TESTS.QUESTION.question)
        expect(res4.body).toEqual(_TESTS.NO_OBJECT)

    });

});