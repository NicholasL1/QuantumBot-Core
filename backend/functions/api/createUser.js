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
      { headers: { "Private-Key": "837bbe2b-607a-42cf-bd4d-ff2c72698d02" } }
    );
    functions.logger.info("Successfully created user in Chat Engine.");
  } catch (error) {
    functions.logger.error("Error creating user in Chat Engine:", error);
  }
});
