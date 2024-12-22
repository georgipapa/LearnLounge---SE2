const test = require('ava');
const { setupServer, teardownServer } = require('./testHelper');

test.before(setupServer);
test.after.always(teardownServer);

// Test:  Successfully get course details
test.serial('GET /courses/:courseId should return course details', async (t) => {
    const { body, statusCode } = await t.context.got('courses/17');

    t.is(statusCode, 200, 'Expected a 200 OK response for a valid courseId');
    t.like(body, {
        name: 'Software Engineering I',
        id: 17,
        price: 10,
    });
});

// Test: Invalid courseId should return 404
test.serial('GET /courses/:courseId should return 404 for invalid courseId', async (t) => {
    const invalidCourseId = "   "; // Whitespace-only input representing an invalid courseId

    const response = await t.context.got(`courses/${invalidCourseId}`, { throwHttpErrors: false });
    t.is(response.statusCode, 404, `Expected 404 for invalid courseId: "${invalidCourseId}"`);
});
