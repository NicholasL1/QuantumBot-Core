import { auth } from "../../firebase";
import { signOut, User } from "firebase/auth";
import { PrettyChatWindow } from "react-chat-engine-pretty";

import 'bootstrap/dist/css/bootstrap.min.css';

interface ChatProps {
  user: User;
}

// Use firebaseAuth User to get signed in user
export default function Page(props: ChatProps) {
  return (
    <div style={{ height: "100vh" }}>
      <button
        className="btn btn-primary btn-sm"
        style={{ position: "absolute", top: "0px", right: "0px" }}
        onClick={() => signOut(auth)}
      >
        <span className="glyphicon glyphicon-log-out"></span> Sign out
      </button>
      <PrettyChatWindow
        projectId={process.env.NEXT_PUBLIC_CHAT_ENGINE_PROJECT_ID!}
        username={props.user.email || ""}
        secret={props.user.uid}
        style={{ height: "100%" }}
      />
    </div>
  );
}