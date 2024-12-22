const test = require('ava');
const { setupServer, teardownServer } = require('./testHelper');

test.before(setupServer);
test.after.always(teardownServer);

// Test: Successfully enroll a user in a course
test.serial('POST /user/:userId/courses should enroll user in a course successfully', async (t) => {
    // Make a POST request to enroll the user
    const { statusCode } = await t.context.got.post('user/123/courses', {
        headers: {
            api_key: 'api_key',
        },
        json: {
            summary: "This course introduces techniques for designing and developing small to medium software programs, covering the software lifecycle, user requirements, specification, design and implementation.",
            schedule: "2000-01-23T04:56:07.000Z",
            image: "",
            endDate: "2024-05-31T00:00:00.000Z",
            successRate: 95,
            price: 10,
            name: "Software Engineering I",
            id: 17,
            customInfo: "customInfo"
        },
    });

    // Assert: Ensure the response status code is 200 (success)
    t.is(statusCode, 200);
});

// Test: Attempting to enroll with missing required fields should return a 400 error
test.serial('POST /user/:userId/courses with missing required fields should return 400', async (t) => {
    const payload = {
        schedule: "2000-01-23T04:56:07.000Z",
        image: "",
        endDate: "2024-05-31T00:00:00.000Z",
        successRate: 95,
        price: 10,
        id: 17,
        customInfo: "customInfo"
    };
    // Attempt a POST request with incomplete data and expect an error
    const error = await t.throwsAsync(() =>
        t.context.got.post('user/123/courses', {
            headers: { api_key: 'api_key' },
            json: payload,
        })
    );

    // Assert: Check for a 400 Bad Request status code
    t.is(error.response.statusCode, 400);
    // Assert: Verify the error message mentions the missing `name` and `summary` fields
    t.regex(error.response.body.message, /should have required property 'name'/);
    t.regex(error.response.body.message, /should have required property 'summary'/);
});

// Test: Attempting to enroll without authorization should return a 401 error
test.serial('POST /user/:userId/courses without authorization should return 401', async (t) => {
    const payload = {
        summary: "This course introduces techniques for designing and developing small to medium software programs, covering the software lifecycle, user requirements, specification, design and implementation.",
        schedule: "2000-01-23T04:56:07.000Z",
        image: "",
        endDate: "2024-05-31T00:00:00.000Z",
        successRate: 95,
        price: 10,
        name: "Software Engineering I",
        id: 17,
        customInfo: "customInfo"
    };
    // Attempt a POST request without providing an API key and expect an error
    const error = await t.throwsAsync(() =>
        t.context.got.post('user/123/courses', {
            json: payload,
        })
    );

    // Assert: Check for a 401 Unauthorized status code
    t.is(error.response.statusCode, 401);
    // Assert: Verify the error message indicates the missing 'api_key' header
    t.is(error.response.body.message, "'api_key' header required");
});
