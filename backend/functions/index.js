/* eslint-disable object-curly-spacing */
const admin = require("firebase-admin");
admin.initializeApp();

// Import the function from the specific file
const { addMessage } = require("./api/addMessage");
const { createUser } = require("./api/createUser");
const { deleteUser } = require("./api/deleteUser");

// Export the function for deployment
exports.addMessage = addMessage;
exports.createUser = createUser;
exports.deleteUser = deleteUser;
