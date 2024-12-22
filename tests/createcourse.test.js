const test = require('ava');
const { setupServer, teardownServer } = require('./testHelper');

test.before(setupServer);
test.after.always(teardownServer);

// Test case: Successfully create a course with required fields
test.serial('POST /courses/create - Successfully create a course', async (t) => {
    const { statusCode } = await t.context.got.post('courses/create', {
        headers: {
            api_key: 'api_key',
        },
        json: {  // Course data
            name: 'Software Engineering I',
            summary: 'This course introduces techniques for designing and developing small to medium software programs...',
            schedule: '2024-03-01T12:00:00Z',
            endDate: '2024-05-31T00:00:00.000Z',
            price: 150,
        },
    });

  t.is(statusCode, 200);  // Verify response status code is 200
});

// Test case: Successfully create a course with optional fields
test.serial('POST /courses/create - Successfully create a course with optional fields', async (t) => {
    const { statusCode } = await t.context.got.post('courses/create', {
        headers: {
            api_key: 'api_key',
        },
        json: {  // Course data with optional fields
            name: 'Software Engineering I',
            summary: 'This course introduces techniques for designing and developing small to medium software programs...',
            schedule: '2024-03-01T12:00:00Z',
            endDate: '2024-05-31T00:00:00.000Z',
            price: 150,
            customInfo: 'Some additional info',
            successRate: 98,
        },
    });

  t.is(statusCode, 200);  // Verify response status code is 200
});

// Test case: Invalid price (null) should return 400 error
test.serial('POST /courses/create without a correct form for price should return 400', async (t) => {
    const payload = {  // Payload with invalid price (null)
        name: 'Software Engineering I',
        summary: 'This course introduces techniques for designing and developing small to medium software programs...',
        schedule: '2024-03-01T12:00:00Z',
        endDate: '2024-05-31T00:00:00.000Z',
        price: null,  // Invalid price
        customInfo: 'Some additional info',
        successRate: 98,
    };

    const error = await t.throwsAsync(() =>  // Expect error due to invalid price
        t.context.got.post('courses/create', {
            headers: { api_key: 'api_key' },
            json: payload,
        })
    );
    t.is(error.response.statusCode, 400);  // Check for 400 status code
    t.is(error.response.body.message, 'request.body.price should be integer');  // Verify error message
});

// Test case: Missing required fields (name) should return 400 error
test.serial('POST /courses/create - Missing required fields (eg name)', async (t) => {
  const payload = {  // Missing name field
      summary: 'This course introduces techniques for designing and developing small to medium software programs...',
      schedule: '2024-01-01T10:00:00Z',
      endDate: '2024-05-31T00:00:00Z',
      price: 100,
  };

  const error = await t.throwsAsync(() =>  // Expect error due to missing required field
    t.context.got.post('courses/create', {
        headers: { api_key: 'api_key' },
        json: payload,
    })
);
  t.is(error.response.statusCode, 400);  // Check for 400 status code
  t.regex(error.response.body.message, /should have required property 'name'/);  // Verify missing 'name' error message
});
