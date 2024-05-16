const functions = require("firebase-functions");
const axios = require("axios");

// Create user endpoint - adds user in chat engine
exports.createUser = functions.auth.user().onCreate(async (user) => {
  try {
    await axios.post(
      "https://api.chatengine.io/users/",
      {
        username: user.displayName,
        secret: user.uid,
        email: user.email,
      },
      { headers: { "Private-Key": "e672f363-5d46-4a96-8ed6-6d80c1d04af7" } }
    );
    functions.logger.info("Successfully created user in Chat Engine.");
  } catch (error) {
    functions.logger.error("Error creating user in Chat Engine:", error);
  }
});
