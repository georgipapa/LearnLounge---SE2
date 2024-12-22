const test = require('ava');
const { setupServer, teardownServer } = require('./testHelper');
const { generateBaseUserPayload, addCoursesTaught, addCertificates, addCoursesAttended } = require('../utils/validUserPayload');

test.before(setupServer);
test.after.always(teardownServer);

/**
 * Generates a full valid payload for updating user information.
 * Combines base payload with additional data like courses, certificates, etc.
 * @returns {Object} A complete payload for user updates.
 */
function generateValidUserPayload() {
    let payload = generateBaseUserPayload();
    payload = addCoursesTaught(payload);
    payload = addCertificates(payload);
    return addCoursesAttended(payload);
}
// Test: Successful update of user information
test.serial('PUT /user/:userId/info should update personal info successfully', async (t) => {
    const { got } = t.context;
    const payload = generateValidUserPayload();

    const { statusCode, body } = await got.put('user/13/info', {
        headers: { api_key: 'api_key' },
        json: payload,
    });

    t.is(statusCode, 200); // Ensure the server responds with 200 OK
    t.is(body.lastName, "lastName");    // Verify returned data matches the request
    t.is(body.firstName, "firstName");
    t.deepEqual(body.coursesTaught[0], null);
});

// Test: Invalid data should return a 400 error
test.serial('PUT /user/:userId/info with invalid data should return 400', async (t) => {
    const { got } = t.context;
    const invalidPayload = {
        country: "USA",
        gender: "Male",
        languages: ["English"], // Missing required fields like `firstName`, `lastName`, etc.
    };

    // Expect an error response when sending invalid data
    const error = await t.throwsAsync(() =>
        got.put('user/13/info', {
            headers: { api_key: 'api_key' },
            json: invalidPayload,
        })
    );

    // Assert: Check the error status code is 400 (Bad Request)
    t.is(error.response.statusCode, 400); 
    // Assert: Validate the error message indicates missing fields
    t.regex(error.response.body.message, /should have required property 'firstName'/);
    t.regex(error.response.body.message, /should have required property 'lastName'/);
});
