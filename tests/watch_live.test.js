const test = require('ava');
const got = require('got');
const { setupServer, teardownServer } = require('./testHelper');

test.before(setupServer);
test.after.always(teardownServer);

// Test case 1: GET request to retrieve live lecture details for a course
test.serial('GET /courses/:courseId/live should return live lecture details', async (t) => {
    // Send GET request to /courses/13/live endpoint to get live lecture details
    const { statusCode, body } = await t.context.got.get('courses/13/live');

    // Assert that the status code is 200 OK
    t.is(statusCode, 200);
    // Assert that the response body is an empty object (you might adjust this based on your actual response)
    t.deepEqual(body, {});
});

// Test case 2: GET request with whitespace-only userId should return 404
test('GET /user/:userId should return 404 for whitespace-only userId', async (t) => {
    // Define a userId consisting of only whitespace characters
    const userId = "   ";  // Whitespace-only input

    // Send GET request with the invalid userId and expect a 404 response (don't throw on error)
    const response = await t.context.got(`user/${userId}`, { throwHttpErrors: false });

    // Assert that the response status code is 404 (Not Found) for the invalid userId
    t.is(response.statusCode, 404, `Expected 404 for userId: "${userId}"`);
});
