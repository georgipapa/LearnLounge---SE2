const test = require('ava');
const http = require('http');
const got = require('got');
const app = require('../index');

test.before(async (t) => {
    // Start the server before running tests
    t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    const { port } = server.address();
    t.context.got = got.extend({ responseType: 'json', prefixUrl: `http://localhost:${port}` });
});

test.after.always((t) => {
    // Stop the server after tests
    t.context.server.close();
});

test.serial('GET /courses/:courseId should return course details', async (t) => {
    const { body, statusCode } = await t.context.got('courses/17');
    t.is(statusCode, 200);
    t.like(body, {
        name: 'Software Engineering I',
        id: 17,
        price: 10,
    });
});

test.serial('GET /courses/:courseId should return 404 for invalid courseId', async (t) => {
    const invalidCourseId = "   "; // Whitespace-only input

    const response = await t.context.got(`courses/${invalidCourseId}`, { throwHttpErrors: false });
    t.is(response.statusCode, 404, `Expected 404 for invalid courseId: "${invalidCourseId}"`);
});
