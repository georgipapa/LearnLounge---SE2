const test = require('ava');
const got = require('got');
const { setupServer, teardownServer } = require('./testHelper');

test.before(setupServer);
test.after.always(teardownServer);

/**
 * Test: Fetch course details for a valid course ID.
 * Ensures the endpoint returns the correct course details with a 200 OK status.
 */
test.serial('GET /courses/:courseId should return course details', async (t) => {
    const { body, statusCode } = await t.context.got('courses/17');

    t.is(statusCode, 200, 'Expected a 200 OK response for a valid courseId');
    t.like(body, {
        name: 'Software Engineering I',
        id: 17,
        price: 10,
    });
});

/**
 * Test: Attempt to fetch course details with an invalid course ID.
 * Ensures the endpoint returns a 404 Not Found error for invalid inputs.
 */
test.serial('GET /courses/:courseId should return 404 for invalid courseId', async (t) => {
    const invalidCourseId = "   "; // Whitespace-only input representing an invalid courseId

    const response = await t.context.got(`courses/${invalidCourseId}`, { throwHttpErrors: false });
    t.is(response.statusCode, 404, `Expected 404 for invalid courseId: "${invalidCourseId}"`);
});
