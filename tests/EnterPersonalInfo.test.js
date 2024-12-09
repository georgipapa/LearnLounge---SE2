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

test.serial('POST /user/:userId/info should save personal info successfully', async (t) => {
    const { statusCode, body } = await t.context.got.post('user/13/info', {
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
            coursesTaught: [],
            certificates: [
                {
                    courseName: "Advanced Algorithms",
                    teacherName: "Dr. Smith",
                    certificateId: 101,
                    studentName: "John Doe",
                    grade: "A+",
                    completionDate: "2020-12-15",
                    otherRelevantInformation: ["Certificate of Excellence"]
                }
            ],
            specialization: "Software Engineering",
            middleName: "Michael",
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
                    customInfo: "Free course"
                }
            ],
            username: "johndoe123"
        },
    });

    t.is(statusCode, 200); // Ensure the server responds with 200 OK
    t.is(body.userId, 0); // Ensure the user ID matches
    t.is(body.firstName, "firstName"); // Verify some returned data
});

test.serial('POST /user/:userId/info with missing required fields should return 400', async (t) => {
    const payload = {
        country: "USA",
        gender: "Male",
        languages: ["English", "Spanish"],
        rating: 4.8,
    }; // Missing required fields like `firstName`, `lastName`, etc.

    const error = await t.throwsAsync(() =>
        t.context.got.post('user/13/info', {
            headers: { api_key: 'api_key' },
            json: payload,
        })
    );

    t.is(error.response.statusCode, 400); // Expecting a 400 Bad Request
    t.regex(error.response.body.message, /should have required property 'firstName'/);
    t.regex(error.response.body.message, /should have required property 'lastName'/);
});
