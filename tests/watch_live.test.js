const test = require('ava');
const http = require('http');
const got = require('got');
const app = require('../index');

test.before(async (t) => {
    t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    const { port } = server.address();
    t.context.got = got.extend({ responseType: 'json', prefixUrl: `http://localhost:${port}` });
});

test.after.always((t) => {
    t.context.server.close();
});

test.serial('GET /courses/:courseId/live should return live lecture details', async (t) => {
    const { statusCode, body } = await t.context.got.get('courses/13/live');

    t.is(statusCode, 200);
    t.deepEqual(body, {});
});

test('GET /user/:userId should return 404 for whitespace-only userId', async (t) => {
    const userId = "   "; // Whitespace only

    const response = await t.context.got(`user/${userId}`, { throwHttpErrors: false });
    t.is(response.statusCode, 404, `Expected 404 for userId: "${userId}"`);
});