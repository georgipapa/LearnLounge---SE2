const test = require('ava');
const http = require('http');
const got = require('got');
const app = require('../index'); // Adjust the path as necessary

test.before(async (t) => {
    t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    const { port } = server.address();
    t.context.got = got.extend({ responseType: 'json', prefixUrl: `http://localhost:${port}` });
});

test.after.always((t) => {
    t.context.server.close();
});

test.serial('POST /courses/:courseId/pay should handle payment successfully', async (t) => {
    const { statusCode } = await t.context.got.post('courses/200/pay', {
        headers: {
            api_key: 'api_key', // Replace with your valid API key
        },
        json: {
            reason: 'Course fee payment',
            amount: 100.50,
            ispaid: true,
            paymentMethod: 'credit card',
        },
    });

    t.is(statusCode, 200); // Ensure the server responds with 200 OK
});

test.serial('POST /courses/:courseId/pay with missing payment information should return 400', async (t) => {
    const payload = {
        a:"a"
    }; // Missing "reason"
    const error = await t.throwsAsync(() =>
        t.context.got.post('courses/200/pay', {
            headers: { api_key: 'api_key' },
            json: payload,
        })
    );
    t.is(error.response.statusCode, 400);
    t.is(error.response.body.message, 'request.body should have required property \'amount\', request.body should have required property \'paymentMethod\'');
});

test.serial('POST /courses/:courseId/pay without authorization should return 401', async (t) => {
    const payload = {
        reason: 'Course fee payment',
        amount: 100.50,
        ispaid: true,
        paymentMethod: 'credit card',
    };
    const error = await t.throwsAsync(() =>
        t.context.got.post('courses/200/pay', {
            json: payload,
        })
    );
    t.is(error.response.statusCode, 401);
    t.is(error.response.body.message, "'api_key' header required");
});

test.serial('POST /courses/:courseId/pay with invalid amount should return 400', async (t) => {
    const payload = {
        reason: 'Course fee payment',
        amount: "a", // Invalid negative amount
        ispaid: true,
        paymentMethod: 'credit card',
    };
    const error = await t.throwsAsync(() =>
        t.context.got.post('courses/200/pay', {
            headers: { api_key: 'api_key' },
            json: payload,
        })
    );
    t.is(error.response.statusCode, 400);
    t.is(error.response.body.message, 'request.body.amount should be number');
});
