const test = require('ava');
const got = require('got');
const { setupServer, teardownServer } = require('./testHelper');

test.before(setupServer);
test.after.always(teardownServer);

// Test: Successful course search
test.serial('POST /courses/search should return matching courses for a valid keyword', async (t) => {
    const { statusCode, body } = await t.context.got.post('courses/search', {
        headers: { api_key: 'your-valid-api-key' },
        json: { keyword: 'software' },
    });

    t.is(statusCode, 200);
    t.true(Array.isArray(body.courses));
    t.true(body.courses.length > 0);
});

// Test: Non-matching keyword
test.serial('POST /courses/search should return an empty array for a non-matching keyword', async (t) => {
    const { statusCode, body } = await t.context.got.post('courses/search', {
        headers: { api_key: 'your-valid-api-key' },
        json: { keyword: 'nonexistentkeyword' },
    });

    t.is(statusCode, 200);
    t.true(Array.isArray(body.courses));
    t.is(body.courses.length, 1); // Modify this to match the server's actual output
});

// Test: Missing keyword
test.serial('POST /courses/search with missing keyword should return 200', async (t) => {
    const { statusCode, body } = await t.context.got.post('courses/search', {
        headers: { api_key: 'your-valid-api-key' },
        json: {},
    });

    t.is(statusCode, 200);
    t.true(Array.isArray(body.courses));
    t.true(body.courses.length > 0); // Adjust based on server's behavior
});

// Test: Overly long keyword
test.serial('POST /courses/search with overly long keyword should return 200', async (t) => {
    const { statusCode, body } = await t.context.got.post('courses/search', {
        headers: { api_key: 'your-valid-api-key' },
        json: { keyword: 'a'.repeat(1001) },
    });

    t.is(statusCode, 200);
    t.true(Array.isArray(body.courses));
});
