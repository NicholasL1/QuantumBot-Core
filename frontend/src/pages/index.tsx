import { useState } from "react";

import { User } from "firebase/auth";
import { auth } from "../../firebase";

import AuthPage from "./AuthPage";
import ChatsPage from "./ChatsPage";
import Loading from "./Loading";

export default function Home() {
  const [user, setUser] = useState<User | null>();
  auth.onAuthStateChanged((user) => setUser(user));

  // If the user hasn't loaded yet, return loading page
  if (user === undefined) {
    console.log("undefined");
    return <Loading />;
  } else if (user === null) { // If no user, return authentication page
    console.log("null");
    return <AuthPage />;
  } else {
    return <ChatsPage user={user} />; // Else return the chats page with the signed in user
  }
}
