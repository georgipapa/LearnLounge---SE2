const test = require('ava');
const got = require('got');
const { setupServer, teardownServer } = require('./testHelper');

test.before(setupServer);
test.after.always(teardownServer);

// Test case 1: Test for retrieving user details by valid userId
test.serial('GET /user/:userId should return user details', async (t) => {
    // Send GET request to retrieve details of user with userId 0
    const { body, statusCode } = await t.context.got.get('user/0');

    // Assert that the response status is 200 OK
    t.is(statusCode, 200);
    // Assert that the response body contains expected user details
    t.like(body, {
        userId: 0,
        username: 'username',
        firstName: 'firstName',
        lastName: 'lastName',
        country: 'country',
        gender: 'gender',
        rating: 6.027456183070403,  // Rating value is approximately 6.03
        description: 'description',
        specialization: 'specialization',
    });
});

// Test case 2: Test for retrieving user details with invalid userId
test.serial('GET /user/:userId should return 404 for invalid userId', async (t) => {
    // Define an invalid userId (whitespace-only input)
    const invalidUserId = "   "; // Whitespace-only input

    // Send GET request with invalid userId and expect a non-throwing response (false on error)
    const response = await t.context.got(`user/${invalidUserId}`, { throwHttpErrors: false });

    // Assert that the response status is 404 for the invalid userId
    t.is(response.statusCode, 404, `Expected 404 for invalid userId: "${invalidUserId}"`);
});
