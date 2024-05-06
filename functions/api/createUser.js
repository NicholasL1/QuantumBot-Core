const functions = require("firebase-functions");
const axios = require("axios");

exports.createUser = functions.auth.user().onCreate((user) => {
  axios.post(
    "https://api.chatengine.io/users/",
    {
      username: user.email,
      secret: user.uid,
      email: user.email,
      display_name: user.displayName,
    },
    { headers: { "Private-Key": "e672f363-5d46-4a96-8ed6-6d80c1d04af7" } }
  );
});
