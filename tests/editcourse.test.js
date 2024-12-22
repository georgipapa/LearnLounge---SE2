const test = require('ava');
const { setupServer, teardownServer } = require('./testHelper');

test.before(setupServer);
test.after.always(teardownServer);

// Test: Successfully edit a course
test.serial('PUT /courses/teaching/:courseId/edit - Successfully edit your course', async (t) => {
    const { body, statusCode } = await t.context.got.put('courses/teaching/13/edit', {
        json: {
            name: 'Software Engineering I',
            summary: 'This course introduces techniques for designing and developing small to medium software programs, covering the software lifecycle, user requirements, specification, design and implementation.',
            schedule: '2000-01-23T04:56:07.000Z',
            endDate: '2024-05-31T00:00:00.000Z',
            price: 10,
            customInfo: 'customInfo',
            successRate: 95,
        },
        headers: { api_key: 'api_key' },
    });

    // Assertions
    t.is(statusCode, 200, 'Expected status code 200 for successful edit');
    t.like(body, {
        name: 'Software Engineering I',
        summary: 'This course introduces techniques for designing and developing small to medium software programs, covering the software lifecycle, user requirements, specification, design and implementation.',
        schedule: '2000-01-23T04:56:07.000Z',
        endDate: '2024-05-31T00:00:00.000Z',
        price: 10,
        customInfo: 'customInfo',
        successRate: 95,
    }, 'Response should match the updated course data');
});

// Test: Invalid data should return 400
test.serial('PUT /courses/teaching/:courseId/edit - Invalid data should return 400', async (t) => {
    const payload = {
        name: 'Software Engineering I',
        summary: 'This course introduces techniques for designing and developing small to medium software programs, covering the software lifecycle, user requirements, specification, design and implementation.',
        schedule: '2000-01-23T04:56:07.000Z',
        endDate: '2024-05-31T00:00:00.000Z',
        price: null, // Invalid type (should be an integer)
        customInfo: 'customInfo',
        successRate: 95,
    };

    const error = await t.throwsAsync(
        t.context.got.put('courses/teaching/13/edit', {
            json: payload,
            headers: { api_key: 'api_key' },
        })
    );

    // Assertions
    t.is(error.response.statusCode, 400, 'Expected status code 400 for invalid payload');
    t.is(error.response.body.message, 'request.body.price should be integer', 'Expected error message for invalid price field');
});

// Test: Invalid courseId should return 404
test.serial('GET /courses/:courseId - Invalid courseId should return 404', async (t) => {
    const invalidCourseId = "   "; // Whitespace-only input

    const response = await t.context.got(`courses/${invalidCourseId}`, { throwHttpErrors: false });

    // Assertions
    t.is(response.statusCode, 404, `Expected 404 for invalid courseId: "${invalidCourseId}"`);
    t.regex(response.body.message, /not found/i, 'Expected "not found" message for invalid courseId');
});
