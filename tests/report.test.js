const test = require('ava');
const got = require('got');
const { setupServer, teardownServer } = require('./testHelper');

test.before(setupServer);
test.after.always(teardownServer);

// Test case 1: Successful report submission
test.serial('POST /report should handle report submission successfully', async (t) => {
    const { statusCode } = await t.context.got.post('report', {
        headers: { api_key: 'your-valid-api-key' },  // Send the API key in headers for authentication
        json: {  // JSON body containing the report details
            typeOfReport: 'Bug Report',
            name: 'John Doe',
            message: 'Found a bug on the login page.',
            email: 'johndoe@example.com',
        },
    });

    // Assert that the server responds with a 200 status code (OK)
    t.is(statusCode, 200);
});

// Test case 2: Missing 'typeOfReport' field should return a 400 error
test.serial('POST /report with missing typeOfReport should return 400', async (t) => {
    // Payload without the 'typeOfReport' field
    const payload = {
        name: 'John Doe',
        message: 'Found a bug on the login page.',
        email: 'johndoe@example.com',
    };

    // Expecting a 400 error due to missing required field
    const error = await t.throwsAsync(() =>
        t.context.got.post('report', {
            headers: { api_key: 'your-valid-api-key' },  // API key is included
            json: payload,  // Send the incomplete payload
        })
    );

    // Check that the response status is 400 and error message is appropriate
    t.is(error.response.statusCode, 400);
    t.is(error.response.body.message, 'request.body should have required property \'typeOfReport\'');
});

// Test case 3: Invalid email format should return a 400 error
test.serial('POST /report with invalid email format should return 400', async (t) => {
    // Payload with an invalid email format
    const payload = {
        typeOfReport: 'Bug Report',
        name: 'John Doe',
        message: 'Found a bug on the login page.',
        email: 'invalid-email',  // Invalid email format
    };

    // Expecting a 400 error due to invalid email format
    const error = await t.throwsAsync(() =>
        t.context.got.post('report', {
            headers: { api_key: 'your-valid-api-key' },  // API key is included
            json: payload,  // Send the invalid email payload
        })
    );

    // Check that the response status is 400 and error message indicates invalid email format
    t.is(error.response.statusCode, 400);
    t.is(error.response.body.message, 'Invalid email format');
});

// Test case 4: Missing API key should return a 401 error
test.serial('POST /report without API key should return 401', async (t) => {
    const payload = {
        typeOfReport: 'Bug Report',
        name: 'John Doe',
        message: 'Found a bug on the login page.',
        email: 'johndoe@example.com',
    };

    // Expecting a 401 error due to missing API key in the request
    const error = await t.throwsAsync(() =>
        t.context.got.post('report', {
            json: payload,  // Payload without API key
        })
    );

    // Check that the response status is 401 and the error message indicates a missing 'api_key'
    t.is(error.response.statusCode, 401);
    t.is(error.response.body.message, "'api_key' header required");
});

// Test case 5: Empty fields should return a 400 error
test.serial('POST /report with empty fields should return 400', async (t) => {
    // Payload with empty fields
    const payload = {
        typeOfReport: '',
        name: '',
        message: '',
        email: '',  // Empty fields are invalid
    };

    // Expecting a 400 error due to missing required fields
    const error = await t.throwsAsync(() =>
        t.context.got.post('report', {
            headers: { api_key: 'your-valid-api-key' },  // API key is included
            json: payload,  // Send the payload with empty fields
        })
    );

    // Check that the response status is 400 and the error message mentions the missing fields
    t.is(error.response.statusCode, 400);
    t.is(error.response.body.message, 'Missing required fields: typeOfReport, name, message, or email');
});

// Test case 6: Overly long fields should return a 400 error
test.serial('POST /report with overly long fields should return 400', async (t) => {
    // Payload with fields that exceed the length limit
    const payload = {
        typeOfReport: 'a'.repeat(1001),  // Exceeds the maximum allowed length
        name: 'a'.repeat(1001),  // Exceeds the maximum allowed length
        message: 'a'.repeat(5001),  // Exceeds the maximum allowed length
        email: 'a'.repeat(300) + '@example.com',  // Exceeds the maximum allowed length for email
    };

    // Expecting a 400 error due to the overly long input
    const error = await t.throwsAsync(() =>
        t.context.got.post('report', {
            headers: { api_key: 'your-valid-api-key' },  // API key is included
            json: payload,  // Send the payload with overly long fields
        })
    );

    // Check that the response status is 400 and the error message indicates invalid input size
    t.is(error.response.statusCode, 400);
    t.is(error.response.body.message, 'Invalid input size');
});
