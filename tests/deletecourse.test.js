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

test.serial('DELETE /courses/teaching/:courseId/edit - Successfully delete your course', async (t) => {
    const { statusCode } = await t.context.got.delete('courses/teaching/13/edit', {
        headers: {
            api_key: 'api_key', // Replace with your valid API key
        },
    });

  t.is(statusCode, 200);
});

test.serial('DELETE /courses/teaching/:courseId/edit - Should return 404 for unauthorised access', async (t) => {
    const error  = await t.throwsAsync(() =>
        t.context.got.delete('DELETE /courses/teaching/13/edit')
    )

    t.is(error.response.statusCode, 404);
});

test.serial('GET /courses/:courseId - Invalid courseId should return 404', async (t) => {
    const invalidCourseId = "   "; // Whitespace-only input

    const response = await t.context.got(`courses/${invalidCourseId}`, { throwHttpErrors: false });
    t.is(response.statusCode, 404, `Expected 404 for invalid courseId: "${invalidCourseId}"`);
});