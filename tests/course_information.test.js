const test = require('ava');
const got = require('got');
const { setupServer, teardownServer } = require('./testHelper');

test.before(setupServer);
test.after.always(teardownServer);

test.serial('GET /courses/:courseId should return course details', async (t) => {
    const { body, statusCode } = await t.context.got('courses/17');
    t.is(statusCode, 200);
    t.like(body, {
        name: 'Software Engineering I',
        id: 17,
        price: 10,
    });
});

test.serial('GET /courses/:courseId should return 404 for invalid courseId', async (t) => {
    const invalidCourseId = "   "; // Whitespace-only input

    const response = await t.context.got(`courses/${invalidCourseId}`, { throwHttpErrors: false });
    t.is(response.statusCode, 404, `Expected 404 for invalid courseId: "${invalidCourseId}"`);
});
