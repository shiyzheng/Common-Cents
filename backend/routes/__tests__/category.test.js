const express = require('express');
const request = require('supertest');
const { app } = require('../../server');

const TEST_BASE_NAMES = ["Test-Topic1", "Test-Topic2", "Test-Topic3"]

describe('Routes Test', function () {
    test('Tests if received array contains all elements of expected array',
        async () => {
            const res = await request(app).get('/category/');
            expect(res.statusCode).toEqual(200);
            names = []
            res.body.forEach((element) => {
                names.push(element.name);
            });
            expect(names).toEqual(expect.arrayContaining(TEST_BASE_NAMES));
        });
});