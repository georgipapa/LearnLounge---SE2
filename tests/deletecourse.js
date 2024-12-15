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
