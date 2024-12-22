const test = require('ava');
const { setupServer, teardownServer } = require('./testHelper');

test.before(setupServer);
test.after.always(teardownServer);

// Test: Successfully unenrolling from a course
test.serial('DELETE /user/:userId/courses/:courseId should unenroll the user successfully', async (t) => {
    const { statusCode, body } = await t.context.got.delete('user/13/courses/13', {
        headers: {
            api_key: 'api_key',
        },
    });

    t.is(statusCode, 200); // Ensure the server responds with 200 OK
    t.is(body.id, 17); // Verify returned course ID
    t.is(body.name, "Software Engineering I"); // Verify returned course name
    t.regex(body.summary, /introduces techniques for designing and developing/); // Verify course summary
});

// Test: Unauthorized access
test.serial('DELETE /user/:userId/courses/:courseId without authorization should return 401', async (t) => {
    const error = await t.throwsAsync(() =>
        t.context.got.delete('user/13/courses/13')
    );

    t.is(error.response.statusCode, 401); // Expecting a 401 Unauthorized
    t.is(error.response.body.message, "'api_key' header required"); // Verify error message
});
