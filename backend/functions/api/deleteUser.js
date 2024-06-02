const functions = require("firebase-functions");
const axios = require("axios");

// Delete created user from DB
exports.deleteUser = functions.auth.user().onDelete((user) => {
  axios.delete("https://api.chatengine.io/users/me/", {
    headers: {
      "Project-ID": "6afc9a84-40fa-499b-93f2-db57d3592418",
      "User-Name": user.displayName,
      "User-Secret": user.uid,
    },
  });
});
