const test = require('ava');
const { setupServer, teardownServer } = require('./testHelper');

test.before(setupServer);
test.after.always(teardownServer);

// Test case: Successfully delete a course
test.serial('DELETE /courses/teaching/:courseId/edit - Successfully delete your course', async (t) => {
    const { statusCode } = await t.context.got.delete('courses/teaching/13/edit', {
        headers: {
            api_key: 'api_key',
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
