// Import the required modules for the test
const test = require('ava');  // Ava testing framework to define and run tests
const http = require('http');  // Node's HTTP module for server creation
const got = require('got');  // Got library to make HTTP requests
const app = require('../index');  // Import your app to be tested (adjust path as needed)

// Before hook: Setup the server and got instance to be used for the tests
test.before(async (t) => {
    // Create an HTTP server using your app (typically an Express app)
    t.context.server = http.createServer(app);
    const server = t.context.server.listen();  // Start the server
    const { port } = server.address();  // Get the port assigned by the system
    // Extend Got to use the local server's prefixUrl for sending requests
    t.context.got = got.extend({ responseType: 'json', prefixUrl: `http://localhost:${port}` });
});

// After hook: Close the server after all tests have finished
test.after.always((t) => {
    t.context.server.close();  // Stop the server after all tests are done
});

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
