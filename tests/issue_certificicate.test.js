// Importing necessary modules for the test
const test = require('ava');  // Ava testing framework for writing tests
const http = require('http');  // HTTP module to create a server
const got = require('got');  // Got library for making HTTP requests
const app = require('../index');  // Import the app (server) from your project

// Setup the test environment before each test
test.before(async (t) => {
    // Create an HTTP server using your app and start it
    t.context.server = http.createServer(app);
    const server = t.context.server.listen();  // Start listening on a random port
    const { port } = server.address();  // Get the server's port
    // Create a custom Got instance that will send requests to the test server
    t.context.got = got.extend({ responseType: 'json', prefixUrl: `http://localhost:${port}` });
});

// Clean up after all tests are done
test.after.always((t) => {
    t.context.server.close();  // Close the server after all tests are finished
});

// Test case 1: Successfully issuing a certificate
test.serial('POST /courses/:courseId/certificate should handle certificate issuance successfully', async (t) => {
    // Sending a POST request to issue a certificate for course 13
    const { statusCode } = await t.context.got.post('courses/13/certificate', {
        headers: {
            api_key: 'api_key',  // Pass the API key in headers for authentication
        },
        json: {  // Data to be sent in the request body
            courseName: 'courseName',
            teacherName: 'teacherName',
            certificateId: 1,
            studentName: 'studentName',
            grade: 'grade',
            completionDate: '2000-01-23',
            otherRelevantInformation: ['otherRelevantInformation', 'otherRelevantInformation'],
        },
    });

    // Check that the response status code is 200 (OK)
    t.is(statusCode, 200);
});

// Test case 2: Invalid date format should return 400
test.serial('POST /courses/:courseId/certificate with incorrect date format should return 400', async (t) => {
    const payload = {
        courseName: 'courseName',
        teacherName: 'teacherName',
        certificateId: 1,
        studentName: 'studentName',
        grade: 'grade',
        completionDate: 'invalid-date',  // Invalid date format
        otherRelevantInformation: ['info1', 'info2'],
    };
    const error = await t.throwsAsync(() =>
        t.context.got.post('courses/13/certificate', {
            headers: { api_key: 'api_key' },
            json: payload,  // Send the invalid payload
        })
    );

    // Check that the response status code is 400 (Bad Request)
    t.is(error.response.statusCode, 400);
    // Check that the error message matches the expected error for invalid date format
    t.is(error.response.body.message, 'request.body.completionDate should match format "date"');
});

// Test case 3: Missing authorization should return 401
test.serial('POST /courses/:courseId/certificate without authorization should return 401', async (t) => {
    const payload = {
        courseName: 'courseName',
        teacherName: 'teacherName',
        certificateId: 1,
        studentName: 'studentName',
        grade: 'grade',
        completionDate: '2000-01-23',
        otherRelevantInformation: ['info1', 'info2'],
    };
    const error = await t.throwsAsync(() =>
        t.context.got.post('courses/13/certificate', {
            json: payload,  // No 'api_key' header provided
        })
    );

    // Check that the response status code is 401 (Unauthorized)
    t.is(error.response.statusCode, 401);
    // Check that the error message indicates the missing API key
    t.is(error.response.body.message, "'api_key' header required");
});
