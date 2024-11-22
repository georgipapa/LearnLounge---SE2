const http = require('http');
const test = require('ava');
const got = require('got');
const app = require("../index.js");

// test("Test passes", (t) => {
// 	t.pass();
// });

// test('Async', async t => {
//     const res = Promise.resolve('test');
//     t.is(await res, 'test');
// });

// test.before(async (t) => {
// 	t.context.server = http.createServer(app);
//     const server = t.context.server.listen();
//     const { port } = server.address();
// 	t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:${port}` });
// });

// test.after.always((t) => {
// 	t.context.server.close();
// });

// test("GET /api returns correct response and status code", async (t) => {
// 	const { body, statusCode } = await t.context.got("api");
// 	t.is(body.message, "It works!");
// 	t.is(statusCode, 200);
// });
