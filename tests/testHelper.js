const http = require('http');
const got = require('got');
const app = require('../index');

/**
 * Sets up the HTTP server for testing purposes.
 * 
 * This function is designed to:
 * - Create a new HTTP server using the application (`app`).
 * - Start the server and store its port dynamically.
 * - Configure a `got` instance for making HTTP requests to the server.
 * 
 * @param {Object} t - The test context object provided by AVA.
 */

async function setupServer(t) {
    t.context.server = http.createServer(app);
    await new Promise((resolve) => {
        t.context.server.listen(() => {
            t.context.port = t.context.server.address().port;
            t.context.got = got.extend({ responseType: 'json', prefixUrl: `http://localhost:${t.context.port}` });
            resolve();
        });
    });
}

/**
 * Tears down the HTTP server after testing.
 * 
 * This function closes the server to free up resources and ensure no conflicts
 * with other tests.
 * 
 * @param {Object} t - The test context object provided by AVA.
 */

function teardownServer(t) {
    t.context.server.close();
}

// Export the setup and teardown functions for use in test files
module.exports = {
    setupServer,
    teardownServer,
};