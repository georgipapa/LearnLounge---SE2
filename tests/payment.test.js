// Importing necessary modules for testing
const test = require('ava');  // Ava testing framework for writing and running tests
const http = require('http');  // HTTP module for creating an HTTP server
const got = require('got');  // Got library to make HTTP requests
const app = require('../index'); // Import the application (server) to be tested, adjust path as necessary

// Before hook - Setting up the testing environment
test.before(async (t) => {
    // Create an HTTP server and start listening on a random port
    t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    const { port } = server.address();  // Retrieve the port the server is listening on
    // Create a custom Got instance for making HTTP requests to the local server
    t.context.got = got.extend({ responseType: 'json', prefixUrl: `http://localhost:${port}` });
});

// After hook - Clean up after all tests are done
test.after.always((t) => {
    t.context.server.close();  // Close the server once all tests are finished
});

// Test case 1: Successfully handling a payment for a course
test.serial('POST /courses/:courseId/pay should handle payment successfully', async (t) => {
    // Sending a POST request to handle payment for course 200
    const { statusCode } = await t.context.got.post('courses/200/pay', {
        headers: {
            api_key: 'api_key',  // Send the API key in the request headers for authentication
        },
        json: {  // Payment information to be included in the request body
            reason: 'Course fee payment',
            amount: 100.50,
            ispaid: true,
            paymentMethod: 'credit card',
        },
    });

    // Assert that the response status is 200 (OK)
    t.is(statusCode, 200);
});

// Test case 2: Missing payment information should return 400
test.serial('POST /courses/:courseId/pay with missing payment information should return 400', async (t) => {
    // Payload missing required fields like "reason", "amount", and "paymentMethod"
    const payload = {
        a: "a"  // Invalid data (doesn't contain required fields)
    };
    const error = await t.throwsAsync(() =>
        t.context.got.post('courses/200/pay', {
            headers: { api_key: 'api_key' },  // Include the API key for authorization
            json: payload,  // Send the invalid payload
        })
    );

    // Check that the response status is 400 (Bad Request)
    t.is(error.response.statusCode, 400);
    // Check that the error message indicates the missing required fields
    t.is(error.response.body.message, 'request.body should have required property \'amount\', request.body should have required property \'paymentMethod\'');
});

// Test case 3: Missing authorization header should return 401
test.serial('POST /courses/:courseId/pay without authorization should return 401', async (t) => {
    const payload = {
        reason: 'Course fee payment',
        amount: 100.50,
        ispaid: true,
        paymentMethod: 'credit card',
    };
    const error = await t.throwsAsync(() =>
        t.context.got.post('courses/200/pay', {
            json: payload,  // No API key provided in the request
        })
    );

    // Check that the response status is 401 (Unauthorized)
    t.is(error.response.statusCode, 401);
    // Check that the error message indicates the missing 'api_key' header
    t.is(error.response.body.message, "'api_key' header required");
});

// Test case 4: Invalid amount format should return 400
test.serial('POST /courses/:courseId/pay with invalid amount should return 400', async (t) => {
    const payload = {
        reason: 'Course fee payment',
        amount: "a",  // Invalid amount (should be a number, but it's a string)
        ispaid: true,
        paymentMethod: 'credit card',
    };
    const error = await t.throwsAsync(() =>
        t.context.got.post('courses/200/pay', {
            headers: { api_key: 'api_key' },  // Include the API key in the headers
            json: payload,  // Send the payload with an invalid amount
        })
    );

    // Check that the response status is 400 (Bad Request)
    t.is(error.response.statusCode, 400);
    // Check that the error message matches the expected validation error for the 'amount' field
    t.is(error.response.body.message, 'request.body.amount should be number');
});
