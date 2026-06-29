const { setGlobalOptions } = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");

// Set options (allowing up to 10 instances for cost control)
setGlobalOptions({ maxInstances: 10 });

// Import the Express app from server.js
const app = require("./server.js");

// Export the Express app as a Cloud Function named "api"
exports.api = onRequest(app);
