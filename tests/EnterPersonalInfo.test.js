const test = require('ava');
const { setupServer, teardownServer } = require('./testHelper');

test.before(setupServer);
test.after.always(teardownServer);

/**
 * Generates the base payload for user information.
 * This can be extended or customized as needed.
 * @returns {Object} The base user payload.
 */
function generateBaseUserPayload() {
    return {
        firstName: "John",
        lastName: "Doe",
        middleName: "Michael",
        username: "johndoe123",
        country: "USA",
        gender: "Male",
        languages: ["English", "Spanish"],
        rating: 4.8,
        description: "Experienced software engineer.",
        dateOfBirth: "1990-05-15",
        title: "Mr.",
        userId: 13,
        specialization: "Software Engineering",
    };
}

/**
 * Adds certificates to the base user payload.
 * @param {Object} payload - The base user payload.
 * @returns {Object} Updated payload with certificates included.
 */
function addCertificates(payload) {
    return {
        ...payload,
        certificates: [
            {
                courseName: "Advanced Algorithms",
                teacherName: "Dr. Smith",
                certificateId: 101,
                studentName: "John Doe",
                grade: "A+",
                completionDate: "2020-12-15",
                otherRelevantInformation: ["Certificate of Excellence"],
            },
        ],
    };
}

/**
 * Adds attended courses to the base user payload.
 * @param {Object} payload - The base user payload.
 * @returns {Object} Updated payload with attended courses included.
 */
function addCoursesAttended(payload) {
    return {
        ...payload,
        coursesAttended: [
            {
                summary: "Introduction to Software Engineering",
                schedule: "2023-02-15T10:00:00.000Z",
                image: "",
                endDate: "2023-06-15T00:00:00.000Z",
                successRate: 100,
                price: 0,
                name: "Intro to SE",
                id: 1,
                customInfo: "Free course",
            },
        ],
    };
}

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
