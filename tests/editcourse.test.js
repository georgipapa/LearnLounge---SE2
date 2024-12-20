const http = require('http');
const test = require('ava');
const got = require('got');
const app = require('../index.js');

test.before(async (t) => {
	t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    const { port } = server.address();
	t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:${port}` });
});

test.after.always((t) => {
	t.context.server.close();
});

test.serial('PUT /courses/teaching/:courseId/edit - Successfully edit your course', async (t) => {
    const { body, statusCode } = await t.context.got.put('courses/teaching/13/edit', {
        json: {
            name: 'Software Engineering I',
            summary: 'This course introduces techniques for designing and developing small to medium software programs, covering the software lifecycle, user requirements, specification, design and implementation.',
            schedule: '2000-01-23T04:56:07.000Z',
            endDate: '2024-05-31T00:00:00.000Z',
            price: 10,
            customInfo: 'customInfo',
            successRate: 95,
        },
    });

    t.is(statusCode, 200);
    t.like(body, {
        name: 'Software Engineering I',
        summary: 'This course introduces techniques for designing and developing small to medium software programs, covering the software lifecycle, user requirements, specification, design and implementation.',
        schedule: '2000-01-23T04:56:07.000Z',
        endDate: '2024-05-31T00:00:00.000Z',
        price: 10,
        customInfo: 'customInfo',
        successRate: 95,
    });
});

test.serial('PUT /courses/teaching/:courseId/edit - Invalid data should return 400', async (t) => {
    const payload = {
        name: 'Software Engineering I',
        summary: 'This course introduces techniques for designing and developing small to medium software programs, covering the software lifecycle, user requirements, specification, design and implementation.',
        schedule: '2000-01-23T04:56:07.000Z',
        endDate: '2024-05-31T00:00:00.000Z',
        price: null, // Invalid type (should be an integer)
        customInfo: 'customInfo',
        successRate: 95,
    };

    const error = await t.throwsAsync(
        t.context.got.put('courses/teaching/13/edit', {
            json: payload,
            headers: { api_key: 'api_key' },
        })
    );

    t.is(error.response.statusCode, 400);
    t.is(error.response.body.message, 'request.body.price should be integer');
});


test.serial('GET /courses/:courseId - Invalid courseId should return 404', async (t) => {
    const invalidCourseId = "   "; // Whitespace-only input

    const response = await t.context.got(`courses/${invalidCourseId}`, { throwHttpErrors: false });
    t.is(response.statusCode, 404, `Expected 404 for invalid courseId: "${invalidCourseId}"`);
});