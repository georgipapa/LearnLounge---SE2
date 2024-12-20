// ResponsePayload constructor
var ResponsePayload = function(code, payload) {
  this.code = code;
  this.payload = payload;
}

// Function to create a ResponsePayload
exports.respondWithCode = function(code, payload) {
  return new ResponsePayload(code, payload);
}

// Helper function to determine response code
function determineResponseCode(arg1, arg2) {
  if (Number.isInteger(arg2)) return arg2;
  if (Number.isInteger(arg1)) return arg1;
  return 200; // Default code
}

// Helper function to determine response payload
function determinePayload(arg1, arg2) {
  if (arg1 instanceof ResponsePayload) return arg1.payload;
  return arg1;
}

// Function to write JSON response
var writeJson = exports.writeJson = function(response, arg1, arg2) {
  // Handle ResponsePayload directly
  if (arg1 instanceof ResponsePayload) {
    writeJson(response, arg1.payload, arg1.code);
    return;
  }

  // Determine code and payload
  const code = determineResponseCode(arg1, arg2);
  let payload = determinePayload(arg1, arg2);

  // Format payload as JSON if it's an object
  if (typeof payload === 'object') {
    payload = JSON.stringify(payload, null, 2);
  }

  // Write response
  response.writeHead(code, { 'Content-Type': 'application/json' });
  response.end(payload);
}
