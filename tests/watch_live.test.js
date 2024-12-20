// Import necessary modules for the test
const test = require('ava');  // Ava testing framework for defining tests
const http = require('http');  // Node's HTTP module for server creation
const got = require('got');  // Got library to make HTTP requests
const app = require('../index');  // Import the app to be tested (adjust the path if necessary)

// Before hook to setup the testing environment
test.before(async (t) => {
    // Create an HTTP server using the app (e.g., Express or other)
    t.context.server = http.createServer(app);
    const server = t.context.server.listen();  // Start the server
    const { port } = server.address();  // Get the assigned port number
    // Extend Got to use the local server's base URL for requests
    t.context.got = got.extend({ responseType: 'json', prefixUrl: `http://localhost:${port}` });
});

// After hook to close the server after tests are done
test.after.always((t) => {
    t.context.server.close();  // Close the server after all tests
});

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
