const functions = require("firebase-functions");
const axios = require("axios");

// Delete created user from DB
exports.deleteUser = functions.auth.user().onDelete((user) => {
  axios.delete("https://api.chatengine.io/users/me/", {
    headers: {
      "Project-ID": "3ef665c1-2d73-49ce-9592-8b6cad9c4104",
      "User-Name": user.email,
      "User-Secret": user.uid,
    },
  });
});
