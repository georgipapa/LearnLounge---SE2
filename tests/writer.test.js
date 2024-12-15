const test = require('ava');
const http = require('http');
const { respondWithCode, writeJson } = require('../utils/writer'); // Adjust the path to your writer.js file

// Helper function to mock an HTTP response
function mockResponse() {
    const response = {};
    response.writeHead = (statusCode, headers) => {
        response.statusCode = statusCode;
        response.headers = headers;
    };
    response.end = (payload) => {
        response.payload = payload;
    };
    return response;
}

// Test: respondWithCode
test('respondWithCode should return a proper ResponsePayload object', (t) => {
    const result = respondWithCode(404, { error: 'Not Found' });
    t.is(result.code, 404);
    t.deepEqual(result.payload, { error: 'Not Found' });
});

// Test: writeJson with JSON payload and specific code
test('writeJson should write a JSON response with the correct payload and code', (t) => {
    const response = mockResponse();
    const payload = { message: 'Success' };
    writeJson(response, payload, 201);

    t.is(response.statusCode, 201);
    t.deepEqual(response.headers, { 'Content-Type': 'application/json' });
    t.is(response.payload, JSON.stringify(payload, null, 2));
});

// Test: writeJson should default to 200 if no code is provided
test('writeJson should default to 200 if no code is provided', (t) => {
    const response = mockResponse();
    const payload = { message: 'Default code' };
    writeJson(response, payload);

    t.is(response.statusCode, 200);
    t.deepEqual(response.headers, { 'Content-Type': 'application/json' });
    t.is(response.payload, JSON.stringify(payload, null, 2));
});

// Test: writeJson with plain text payload
test('writeJson should handle plain text payloads correctly', (t) => {
    const response = mockResponse();
    const payload = 'Plain text response';
    writeJson(response, payload, 400);

    t.is(response.statusCode, 400);
    t.deepEqual(response.headers, { 'Content-Type': 'application/json' });
    t.is(response.payload, payload);
});

// Test: writeJson with null payload
test('writeJson should handle null payload gracefully', (t) => {
    const response = mockResponse();
    writeJson(response, null);

    t.is(response.statusCode, 200);
    t.deepEqual(response.headers, { 'Content-Type': 'application/json' });
    t.is(response.payload, undefined); // null should be converted to 'null'
});

// Test: writeJson with an instance of ResponsePayload
test('writeJson should handle ResponsePayload instances', (t) => {
    const response = mockResponse();
    const payload = { message: 'Handled ResponsePayload' };
    const responsePayload = respondWithCode(202, payload);

    writeJson(response, responsePayload);

    t.is(response.statusCode, 202);
    t.deepEqual(response.headers, { 'Content-Type': 'application/json' });
    t.is(response.payload, JSON.stringify(payload, null, 2));
});
