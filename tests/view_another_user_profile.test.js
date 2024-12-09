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

test.serial('GET /user/:userId should return user details', async (t) => {
    const { body, statusCode } = await t.context.got.get('user/0');

    t.is(statusCode, 200);
    t.like(body, {
        userId: 0,
        username: 'username',
        firstName: 'firstName',
        lastName: 'lastName',
        country: 'country',
        gender: 'gender',
        rating: 6.027456183070403,
        description: 'description',
        specialization: 'specialization',
    });
});

test.serial('GET /user/:userId should return 404 for invalid userId', async (t) => {
    const invalidUserId = "   "; // Whitespace-only input

    const response = await t.context.got(`user/${invalidUserId}`, { throwHttpErrors: false });
    t.is(response.statusCode, 404, `Expected 404 for invalid userId: "${invalidUserId}"`);
});