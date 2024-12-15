const http = require('http');
const test = require('ava');
const got = require('got');
const app = require('../index.js');

test.before(async (t) => {
	t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    const { port } = server.address();
	t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:${port}` });
});

test.after.always((t) => {
	t.context.server.close();
});

test.serial('POST /courses/create - Successfully create a course', async (t) => {
    const { statusCode } = await t.context.got.post('courses/create', {
        headers: {
            api_key: 'api_key',
        },
        json: {
            name: 'Software Engineering I',
            summary: 'This course introduces techniques for designing and developing\
            \ small to medium software programs, covering the software lifecycle,\
            \ user requirements, specification, design and implementation.',
            schedule: '2024-03-01T12:00:00Z',
            endDate: '2024-05-31T00:00:00.000Z',
            price: 150,
        },
    });

  t.is(statusCode, 200);
});

test.serial('POST /courses/create - Successfully create a course with optional fields', async (t) => {
    const { statusCode } = await t.context.got.post('courses/create', {
        headers: {
            api_key: 'api_key',
        },
        json: {
            name: 'Software Engineering I',
            summary: 'This course introduces techniques for designing and developing\
            \ small to medium software programs, covering the software lifecycle,\
            \ user requirements, specification, design and implementation.',
            schedule: '2024-03-01T12:00:00Z',
            endDate: '2024-05-31T00:00:00.000Z',
            price: 150,
            customInfo: 'Some additional info',
            successRate: 98,
        },
    });

  t.is(statusCode, 200);
});


test.serial('POST /courses/create without a correct form for price should return 400', async (t) => {
    const payload = {
        name: 'Software Engineering I',
        summary: 'This course introduces techniques for designing and developing\
            \ small to medium software programs, covering the software lifecycle,\
            \ user requirements, specification, design and implementation.',
        schedule: '2024-03-01T12:00:00Z',
        endDate: '2024-05-31T00:00:00.000Z',
        price: null,
        customInfo: 'Some additional info',
        successRate: 98,
    };
    const error = await t.throwsAsync(() =>
        t.context.got.post('courses/create', {
            headers: { api_key: 'api_key' },
            json: payload,
        })
    );
    t.is(error.response.statusCode, 400);
    t.is(error.response.body.message, 'request.body.price should be integer');
});

test.serial('POST /courses/create - Missing required fields (eg name)', async (t) => {
  const payload = {
      summary: 'This course introduces techniques for designing and developing small to medium software programs, covering the software lifecycle, user requirements, specification, design and implementation.',
      schedule: '2024-01-01T10:00:00Z',
      endDate: '2024-05-31T00:00:00Z',
      price: 100,
  };

  const error = await t.throwsAsync(() =>
    t.context.got.post('courses/create', {
        headers: { api_key: 'api_key' },
        json: payload,
    })
);
  t.is(error.response.statusCode, 400);
  t.regex(error.response.body.message, /should have required property 'name'/); // Adjust error message as per API
});
