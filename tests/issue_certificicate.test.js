const test = require('ava');
const http = require('http');
const got = require('got');
const app = require('../index');

test.before(async (t) => {
    t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    const { port } = server.address();
    t.context.got = got.extend({ responseType: 'json', prefixUrl: `http://localhost:${port}` });
});

test.after.always((t) => {
    t.context.server.close();
});

test.serial('POST /courses/:courseId/certificate should handle certificate issuance successfully', async (t) => {
    const { statusCode } = await t.context.got.post('courses/13/certificate', {
        headers: {
            api_key: 'api_key',
        },
        json: {
            courseName: 'courseName',
            teacherName: 'teacherName',
            certificateId: 1,
            studentName: 'studentName',
            grade: 'grade',
            completionDate: '2000-01-23',
            otherRelevantInformation: ['otherRelevantInformation', 'otherRelevantInformation'],
        },
    });

    t.is(statusCode, 200);
});

test.serial('POST /courses/:courseId/certificate with incorrect date format should return 400', async (t) => {
    const payload = {
        courseName: 'courseName',
        teacherName: 'teacherName',
        certificateId: 1,
        studentName: 'studentName',
        grade: 'grade',
        completionDate: 'invalid-date',
        otherRelevantInformation: ['info1', 'info2'],
    };
    const error = await t.throwsAsync(() =>
        t.context.got.post('courses/13/certificate', {
            headers: { api_key: 'api_key' },
            json: payload,
        })
    );
    t.is(error.response.statusCode, 400);
    t.is(error.response.body.message, 'request.body.completionDate should match format "date"');
});

test.serial('POST /courses/:courseId/certificate without authorization should return 401', async (t) => {
    const payload = {
        courseName: 'courseName',
        teacherName: 'teacherName',
        certificateId: 1,
        studentName: 'studentName',
        grade: 'grade',
        completionDate: '2000-01-23',
        otherRelevantInformation: ['info1', 'info2'],
    };
    const error = await t.throwsAsync(() =>
        t.context.got.post('courses/13/certificate', {
            json: payload,
        })
    );
    t.is(error.response.statusCode, 401);
    t.is(error.response.body.message, "'api_key' header required");
});

