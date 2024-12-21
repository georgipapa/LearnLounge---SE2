const test = require('ava');
const got = require('got');
const { setupServer, teardownServer } = require('./testHelper');

test.before(setupServer);
test.after.always(teardownServer);

// Test 1: POST request to handle message posting successfully
test.serial('POST /courses/:courseId/text should handle message posting successfully', async (t) => {
    // Send a POST request to the /courses/13/text endpoint with a sample message
    const { statusCode } = await t.context.got.post('courses/13/text', {
        json: { message: 'Your message here' },  // JSON body with the message
    });

    // Assert that the response status code is 200 (success)
    t.is(statusCode, 200);
});

// Test 2: POST request with invalid request body should return 400
test.serial('POST /courses/:courseId/text should return 400 for invalid request body', async (t) => {
    // Send a POST request with an invalid (null) request body
    const error = await t.throwsAsync(() =>
        t.context.got.post('courses/1/text', {
            json: null,  // Invalid JSON body (null)
        })
    );

    // Assert that the response status code is 400 (Bad Request) due to invalid body
    t.is(error.response.statusCode, 400);
    // Assert that the error message in the response body matches the expected one
    t.is(error.response.body.message, 'Unexpected token n in JSON at position 0');
});
