const test = require('ava');
const { setupServer, teardownServer } = require('./testHelper');

test.before(setupServer);
test.after.always(teardownServer);
/**
 * Generates a base payload for user information.
 * This allows reuse and customization for different scenarios.
 * @returns {Object} Base payload with default user information.
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
 * Adds courses taught by the user to the payload.
 * @param {Object} payload - The base user payload.
 * @returns {Object} Updated payload with courses taught.
 */
function addCoursesTaught(payload) {
    return {
        ...payload,
        coursesTaught: [
            {
                name: "Advanced Programming",
                description: "Detailed programming course",
                summary: "In-depth programming techniques.",
                schedule: "2023-01-01T10:00:00.000Z",
                endDate: "2023-12-31T10:00:00.000Z",
                price: 150,
            },
        ],
    };
}

/**
 * Adds certificates earned by the user to the payload.
 * @param {Object} payload - The base user payload.
 * @returns {Object} Updated payload with certificates.
 */
function addCertificates(payload) {
    return {
        ...payload,
        certificates: [
            {
                courseName: "Data Science Basics",
                teacherName: "Dr. Alan",
                certificateId: 202,
                studentName: "John Doe",
                grade: "A",
                completionDate: "2020-05-15",
                otherRelevantInformation: ["Certificate of Completion"],
            },
        ],
    };
}

/**
 * Adds courses attended by the user to the payload.
 * @param {Object} payload - The base user payload.
 * @returns {Object} Updated payload with attended courses.
 */
function addCoursesAttended(payload) {
    return {
        ...payload,
        coursesAttended: [
            {
                name: "Software Engineering Basics",
                summary: "Basic Software Engineering Concepts",
                schedule: "2022-02-01T10:00:00.000Z",
                endDate: "2022-06-01T00:00:00.000Z",
                successRate: 95,
                price: 0,
                id: 5,
                customInfo: "Online course",
            },
        ],
    };
}

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

/**
 * Test: Successful update of user information.
 */
test.serial('PUT /user/:userId/info should update personal info successfully', async (t) => {
    const { got } = t.context;
    const payload = generateValidUserPayload();

    const { statusCode, body } = await got.put('user/13/info', {
        headers: { api_key: 'api_key' }, // Replace with your valid API key
        json: payload,
    });

    t.is(statusCode, 200); // Ensure the server responds with 200 OK
    t.is(body.lastName, "lastName");    // Verify returned data matches the request
    t.is(body.firstName, "firstName");
    t.deepEqual(body.coursesTaught[0], null);
});

/**
 * Test: Invalid data should return a 400 error.
 */
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
