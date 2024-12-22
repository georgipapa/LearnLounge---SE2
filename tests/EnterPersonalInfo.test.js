const test = require('ava');
const { setupServer, teardownServer } = require('./testHelper');
const { generateBaseUserPayload, addCertificates, addCoursesAttended } = require('../utils/validUserPayload');

test.before(setupServer);
test.after.always(teardownServer);

/**
 * Generates a complete, valid user payload by combining the base payload
 * with certificates and attended courses.
 * @returns {Object} Complete user payload.
 */
function generateValidUserPayload() {
    let payload = generateBaseUserPayload();
    payload = addCertificates(payload);
    return addCoursesAttended(payload);
}

// Test: Successfully save personal info
test.serial('POST /user/:userId/info should save personal info successfully', async (t) => {
    const { got } = t.context;
    const payload = generateValidUserPayload();

    const { statusCode, body } = await got.post('user/13/info', {
        headers: {
            api_key: 'api_key',
        },
        json: payload,
    });

    // Assertions
    t.is(statusCode, 200); // Ensure the server responds with 200 OK
    t.is(body.userId, 0); // Ensure the user ID matches the payload
    t.is(body.firstName, "firstName"); // Verify returned first name matches input
});

// Test: Missing required fields should return 400
test.serial('POST /user/:userId/info with missing required fields should return 400', async (t) => {
    const { got } = t.context;

    // Payload missing required fields like `firstName` and `lastName`
    const incompletePayload = {
        country: "USA",
        gender: "Male",
        languages: ["English", "Spanish"],
        rating: 4.8,
    };

    // Expect the server to throw an error for invalid input
    const error = await t.throwsAsync(() =>
        got.post('user/13/info', {
            headers: { api_key: 'api_key' },
            json: incompletePayload,
        })
    );

    // Assertions
    t.is(error.response.statusCode, 400); // Expecting a 400 Bad Request
    t.regex(error.response.body.message, /should have required property 'firstName'/); // Check for missing `firstName`
    t.regex(error.response.body.message, /should have required property 'lastName'/); // Check for missing `lastName`
});
