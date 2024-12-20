const http = require('http');
const test = require('ava');
const got = require('got');
const app = require('../index.js');

// Before all tests, set up the server and HTTP client
test.before(async (t) => {
    t.context.server = http.createServer(app);  // Create HTTP server
    const server = t.context.server.listen();   // Start the server
    const { port } = server.address();          // Get server's port
    t.context.got = got.extend({                // Configure the HTTP client
        responseType: "json",                   // Expect JSON response
        prefixUrl: `http://localhost:${port}`   // Use the server's address as prefix
    });
});

// After all tests, close the server
test.after.always((t) => {
    t.context.server.close();  // Close the server
});

// Test case: Successfully delete a course
test.serial('DELETE /courses/teaching/:courseId/edit - Successfully delete your course', async (t) => {
    const { statusCode } = await t.context.got.delete('courses/teaching/13/edit', {
        headers: {
            api_key: 'api_key', // API key header
        },
    });

  t.is(statusCode, 200);  // Check that deletion was successful
});

// Test case: Unauthorized deletion attempt (should return 404)
test.serial('DELETE /courses/teaching/:courseId/edit - Should return 404 for unauthorised access', async (t) => {
    const error  = await t.throwsAsync(() =>  // Expect error when unauthorized
        t.context.got.delete('DELETE /courses/teaching/13/edit')
    )

    t.is(error.response.statusCode, 404);  // Check for 404 status code
});

// Test case: Invalid courseId should return 404
test.serial('GET /courses/:courseId - Invalid courseId should return 404', async (t) => {
    const invalidCourseId = "   ";  // Whitespace-only courseId (invalid)

    const response = await t.context.got(`courses/${invalidCourseId}`, { throwHttpErrors: false });
    t.is(response.statusCode, 404, `Expected 404 for invalid courseId: "${invalidCourseId}"`);  // Verify 404 for invalid ID
});
