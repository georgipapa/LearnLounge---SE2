const test = require('ava');
const http = require('http');
const got = require('got');
const app = require('../index');

//starts a temp server to do the tests
async function setupServer(t) {
    t.context.server = http.createServer(app);
    await new Promise((resolve) => {
        t.context.server.listen(() => {
            t.context.port = t.context.server.address().port;
            t.context.got = got.extend({ responseType: 'json', prefixUrl: `http://localhost:${t.context.port}` });
            resolve();
        });
    });
}

//stops the temp server
function teardownServer(t) {
    t.context.server.close();
}

test.before(setupServer);
test.after.always(teardownServer);

test.serial('POST /courses/:courseId/certificate should handle certificate issuance successfully', async (t) => {
    // Sending a POST request to issue a certificate for course 13
    const { statusCode } = await t.context.got.post('courses/13/certificate', {
        headers: {
            api_key: 'api_key',
        },
        json: {  // Data to be sent in the request body
            courseName: 'courseName',
            teacherName: 'teacherName',
            certificateId: 1,
            studentName: 'studentName',
            grade: 'grade',
            completionDate: '2000-01-23',
            otherRelevantInformation: ['otherRelevantInformation', 'otherRelevantInformation'],
        },
    });

    // Check that the response status code is 200 (OK)
    t.is(statusCode, 200);
});

test.serial('POST /courses/:courseId/certificate with incorrect date format should return 400', async (t) => {
    const payload = {
        courseName: 'courseName',
        teacherName: 'teacherName',
        certificateId: 1,
        studentName: 'studentName',
        grade: 'grade',
        completionDate: 'invalid-date',  // Invalid date format
        otherRelevantInformation: ['info1', 'info2'],
    };
    const error = await t.throwsAsync(() =>
        t.context.got.post('courses/13/certificate', {
            headers: { api_key: 'api_key' },
            json: payload,  // Send the invalid payload
        })
    );

    // Check that the response status code is 400 (Bad Request)
    t.is(error.response.statusCode, 400);
    // Check that the error message matches the expected error for invalid date format
    t.is(error.response.body.message, 'request.body.completionDate should match format "date"');
});

test.serial('GET /courses/:courseId should return course details', async (t) => {
    const { body, statusCode } = await t.context.got('courses/17');

    t.is(statusCode, 200, 'Expected a 200 OK response for a valid courseId');
    t.like(body, {
        name: 'Software Engineering I',
        id: 17,
        price: 10,
    });
});

test.serial('DELETE /user/:userId/courses/:courseId should unenroll the user successfully', async (t) => {
    const { statusCode, body } = await t.context.got.delete('user/13/courses/13', {
        headers: {
            api_key: 'api_key',
        },
    });

    t.is(statusCode, 200); // Ensure the server responds with 200 OK
    t.is(body.id, 17); // Verify returned course ID
    t.is(body.name, "Software Engineering I"); // Verify returned course name
});

// Test: Unauthorized access
test.serial('DELETE /user/:userId/courses/:courseId without authorization should return 401', async (t) => {
    const error = await t.throwsAsync(() =>
        t.context.got.delete('user/13/courses/13')
    );

    t.is(error.response.statusCode, 401); // Expecting a 401 Unauthorized
    t.is(error.response.body.message, "'api_key' header required"); // Verify error message
});

test.serial('PUT /user/:userId/info should update personal info successfully', async (t) => {
    const payload = generateValidUserPayload();

    const { statusCode, body } = await t.context.got.put('user/13/info', {
        headers: { api_key: 'api_key' },
        json: payload,
    });

    t.is(statusCode, 200); // Ensure the server responds with 200 OK
    t.is(body.lastName, "lastName");    // Verify returned data matches the request
    t.is(body.firstName, "firstName");
    t.deepEqual(body.coursesTaught[0], null);
});

test.serial('PUT /user/:userId/info with invalid data should return 400', async (t) => {
    const invalidPayload = {
        country: "USA",
        gender: "Male",
        languages: ["English"], // Missing required fields like `firstName`, `lastName`, etc.
    };

    // Expect an error response when sending invalid data
    const error = await t.throwsAsync(() =>
        t.context.got.put('user/13/info', {
            headers: { api_key: 'api_key' },
            json: invalidPayload,
        })
    );

    // Assert: Check the error status code is 400 (Bad Request)
    t.is(error.response.statusCode, 400); 
});
