const request = require('supertest');
const { app } = require('../../server');

const STATUS = require('../category').STATUS;

const PATH_PREFIX = "/category/"
const NON_PATH = "doesNotExist";

const _TESTS = {
    BASE_NAMES: ["Test-Topic1", "Test-Topic2", "Test-Topic3"],
    INSERT_ONE: "Test-Inserted-Topic1",
    NO_OBJECT: {},
};


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
        expect(res.statusCode).toEqual(404);
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

        console.log("res4.body:::", res4.body);

        // tests situation in which res0 deletes existing resource 
        // or the resource already does not exist
        expect([204, 404]).toEqual(expect.arrayContaining([res0.statusCode]));

        expect(res1.statusCode).toBe(STATUS.CREATED); // resource created
        expect(res2.statusCode).toBe(STATUS.OK); // resource exists
        expect(res3.statusCode).toBe(STATUS.OK); // resource deleted
        expect(res4.statusCode).toBe(STATUS.NOT_FOUND); // resource already deleted
        expect(res1.body.name).toEqual(`${_TESTS.INSERT_ONE}`)
        expect(res2.body.name).toEqual(`${_TESTS.INSERT_ONE}`)
        expect(res3.body.name).toEqual(`${_TESTS.INSERT_ONE}`)
        expect(res4.body).toEqual(_TESTS.NO_OBJECT)
    });

});