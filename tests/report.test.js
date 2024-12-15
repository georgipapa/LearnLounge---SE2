const test = require('ava');
const http = require('http');
const got = require('got');
const app = require('../index'); // Adjust as necessary

test.before(async (t) => {
    t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    const { port } = server.address();
    t.context.got = got.extend({ responseType: 'json', prefixUrl: `http://localhost:${port}` });
});

test.after.always((t) => {
    t.context.server.close();
});

// Test: Successful report submission
test.serial('POST /report should handle report submission successfully', async (t) => {
    const { statusCode } = await t.context.got.post('report', {
        headers: { api_key: 'your-valid-api-key' },
        json: {
            typeOfReport: 'Bug Report',
            name: 'John Doe',
            message: 'Found a bug on the login page.',
            email: 'johndoe@example.com',
        },
    });

    t.is(statusCode, 200); // Ensure 200 OK response
});

test.serial('POST /report with missing typeOfReport should return 400', async (t) => {
    const payload = {
        name: 'John Doe',
        message: 'Found a bug on the login page.',
        email: 'johndoe@example.com',
    };

    const error = await t.throwsAsync(() =>
        t.context.got.post('report', {
            headers: { api_key: 'your-valid-api-key' },
            json: payload,
        })
    );

    t.is(error.response.statusCode, 400);
    t.is(error.response.body.message, 'request.body should have required property \'typeOfReport\'');
});

test.serial('POST /report with invalid email format should return 400', async (t) => {
    const payload = {
        typeOfReport: 'Bug Report',
        name: 'John Doe',
        message: 'Found a bug on the login page.',
        email: 'invalid-email',
    };

    const error = await t.throwsAsync(() =>
        t.context.got.post('report', {
            headers: { api_key: 'your-valid-api-key' },
            json: payload,
        })
    );

    t.is(error.response.statusCode, 400);
    t.is(error.response.body.message, 'Invalid email format');
});

// Test: Missing API key
test.serial('POST /report without API key should return 401', async (t) => {
    const payload = {
        typeOfReport: 'Bug Report',
        name: 'John Doe',
        message: 'Found a bug on the login page.',
        email: 'johndoe@example.com',
    };

    const error = await t.throwsAsync(() =>
        t.context.got.post('report', {
            json: payload,
        })
    );

    t.is(error.response.statusCode, 401);
    t.is(error.response.body.message, "'api_key' header required");
});

// Test: Empty fields
test.serial('POST /report with empty fields should return 400', async (t) => {
    const payload = {
        typeOfReport: '',
        name: '',
        message: '',
        email: '',
    };

    const error = await t.throwsAsync(() =>
        t.context.got.post('report', {
            headers: { api_key: 'your-valid-api-key' },
            json: payload,
        })
    );

    t.is(error.response.statusCode, 400);
    t.is(error.response.body.message, 'Missing required fields: typeOfReport, name, message, or email');
});

// Test: Overly long fields
test.serial('POST /report with overly long fields should return 400', async (t) => {
    const payload = {
        typeOfReport: 'a'.repeat(1001),
        name: 'a'.repeat(1001),
        message: 'a'.repeat(5001),
        email: 'a'.repeat(300) + '@example.com',
    };

    const error = await t.throwsAsync(() =>
        t.context.got.post('report', {
            headers: { api_key: 'your-valid-api-key' },
            json: payload,
        })
    );

    t.is(error.response.statusCode, 400);
    t.is(error.response.body.message, 'Invalid input size');
});
