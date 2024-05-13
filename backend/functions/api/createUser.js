const functions = require("firebase-functions");
const axios = require("axios");

// Create user endpoint for when a user is registered with google sign in
exports.createUser = functions.auth.user().onCreate((user) => {
  axios.post(
    "https://api.chatengine.io/users/",
    {
      username: user.displayName,
      secret: user.uid,
      email: user.email,
      first_name: user.firstName,
      last_name: user.lastName,
    },
    { headers: { "Private-Key": "e672f363-5d46-4a96-8ed6-6d80c1d04af7" } }
  );
});
