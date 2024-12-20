const test = require('ava');
const http = require('http');
const got = require('got');
const app = require('../index'); // Adjust the path to your app entry file

// Setup: Start the HTTP server before tests
test.before(async (t) => {
    t.context.server = http.createServer(app); // Create a server instance using the app
    const server = t.context.server.listen(); // Start the server
    const { port } = server.address(); // Retrieve the server's port
    // Create a `got` instance pre-configured for JSON responses and the test server's URL
    t.context.got = got.extend({ responseType: 'json', prefixUrl: `http://localhost:${port}` });
});

// Cleanup: Close the HTTP server after tests
test.after.always((t) => {
    t.context.server.close(); // Ensure the server is properly closed
});

// Test: Update personal information successfully
test.serial('PUT /user/:userId/info should update personal info successfully', async (t) => {
    // Make a PUT request with valid user data
    const { statusCode, body } = await t.context.got.put('user/13/info', {
        headers: {
            api_key: 'api_key', // Replace with your valid API key
        },
        json: {
            lastName: "Doe",
            country: "USA",
            gender: "Male",
            languages: ["English", "Spanish"],
            rating: 4.8,
            description: "Experienced software engineer.",
            dateOfBirth: "1990-05-15",
            otherRelevantInformation: ["Loves teaching", "Team player"],
            title: "Mr.",
            userId: 13,
            firstName: "John",
            coursesTaught: [
                {
                    name: "Advanced Programming",
                    description: "Detailed programming course",
                    summary: "In-depth programming techniques.",
                    schedule: "2023-01-01T10:00:00.000Z",
                    endDate: "2023-12-31T10:00:00.000Z",
                    price: 150
                }
            ],
            certificates: [
                {
                    courseName: "Data Science Basics",
                    teacherName: "Dr. Alan",
                    certificateId: 202,
                    studentName: "John Doe",
                    grade: "A",
                    completionDate: "2020-05-15",
                    otherRelevantInformation: ["Certificate of Completion"]
                }
            ],
            specialization: "Software Engineering",
            middleName: "Michael",
            coursesAttended: [
                {
                    summary: "Basic Software Engineering Concepts",
                    schedule: "2022-02-01T10:00:00.000Z",
                    image: "",
                    endDate: "2022-06-01T00:00:00.000Z",
                    successRate: 95,
                    price: 0,
                    name: "Software Engineering Basics",
                    id: 5,
                    customInfo: "Online course"
                }
            ],
            username: "johndoe123"
        },
    });

    // Assert: Check the status code is 200 (success)
    t.is(statusCode, 200); 
    // Assert: Verify key fields in the response body
    t.is(body.lastName, "lastName"); 
    t.is(body.firstName, "firstName");
    t.is(body.coursesTaught[0], null);
});

// Test: Update with invalid data should return a 400 error
test.serial('PUT /user/:userId/info with invalid data should return 400', async (t) => {
    const payload = {
        country: "USA",
        gender: "Male",
        languages: ["English"], // Missing required fields like `firstName`, `lastName`, etc.
    };

    // Expect an error response when sending invalid data
    const error = await t.throwsAsync(() =>
        t.context.got.put('user/13/info', {
            headers: { api_key: 'api_key' },
            json: payload,
        })
    );

    // Assert: Check the error status code is 400 (Bad Request)
    t.is(error.response.statusCode, 400); 
    // Assert: Validate the error message indicates missing fields
    t.regex(error.response.body.message, /should have required property 'firstName'/);
    t.regex(error.response.body.message, /should have required property 'lastName'/);
});
