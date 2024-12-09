const test = require('ava');
const http = require('http');
const got = require('got');
const app = require('../index'); // Adjust the path to your app entry file

test.before(async (t) => {
    t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    const { port } = server.address();
    t.context.got = got.extend({ responseType: 'json', prefixUrl: `http://localhost:${port}` });
});

test.after.always((t) => {
    t.context.server.close();
});

test.serial('PUT /user/:userId/info should update personal info successfully', async (t) => {
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

    t.is(statusCode, 200); // Ensure the server responds with 200 OK
    t.is(body.lastName, "lastName"); // Verify returned data matches the request
    t.is(body.firstName, "firstName");
    t.is(body.coursesTaught[0], null);
});

test.serial('PUT /user/:userId/info with invalid data should return 400', async (t) => {
    const payload = {
        country: "USA",
        gender: "Male",
        languages: ["English"], // Missing required fields like `firstName`, `lastName`, etc.
    };

    const error = await t.throwsAsync(() =>
        t.context.got.put('user/13/info', {
            headers: { api_key: 'api_key' },
            json: payload,
        })
    );

    t.is(error.response.statusCode, 400); // Expecting a 400 Bad Request
    t.regex(error.response.body.message, /should have required property 'firstName'/);
    t.regex(error.response.body.message, /should have required property 'lastName'/);
});
