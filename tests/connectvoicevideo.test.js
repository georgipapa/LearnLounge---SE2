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

test.serial('POST /courses/:courseId/connect - Successfully connect to a course\'s voice and video channels', async (t) => {
    const { statusCode } = await t.context.got.post('courses/13/connect');

    t.is(statusCode, 200);
});

test.serial('POST /courses/:courseId/connect should return 400 for invalid request body', async (t) => {
    const error = await t.throwsAsync(() =>
        t.context.got.post('courses/13/text', {
            json: null, // Explicit invalid payload
        })
    );

    t.is(error.response.statusCode, 400);
    t.is(error.response.body.message, 'Unexpected token n in JSON at position 0');
});