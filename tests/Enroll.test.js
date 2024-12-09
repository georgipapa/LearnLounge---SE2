const test = require('ava');
const http = require('http');
const got = require('got');
const app = require('../index'); // Adjust the path as necessary

test.before(async (t) => {
    t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    const { port } = server.address();
    t.context.got = got.extend({ responseType: 'json', prefixUrl: `http://localhost:${port}` });
});

test.after.always((t) => {
    t.context.server.close();
});

test.serial('POST /user/:userId/courses should enroll user in a course successfully', async (t) => {
    const { statusCode } = await t.context.got.post('user/123/courses', {
        headers: {
            api_key: 'api_key', // Replace with your valid API key
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

    t.is(statusCode, 200); // Ensure the server responds with 200 OK
});

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
    const error = await t.throwsAsync(() =>
        t.context.got.post('user/123/courses', {
            headers: { api_key: 'api_key' },
            json: payload,
        })
    );
    t.is(error.response.statusCode, 400);
    t.regex(error.response.body.message, /should have required property 'name'/);
    t.regex(error.response.body.message, /should have required property 'summary'/);
});

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
    const error = await t.throwsAsync(() =>
        t.context.got.post('user/123/courses', {
            json: payload,
        })
    );
    t.is(error.response.statusCode, 401);
    t.is(error.response.body.message, "'api_key' header required");
});
