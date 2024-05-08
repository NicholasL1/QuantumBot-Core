import { auth } from "../../firebase";
import { signOut, User } from "firebase/auth";
import { MultiChatWindow, useMultiChatLogic } from "react-chat-engine-advanced";

// Bootstrap styling
import "bootstrap/dist/css/bootstrap.min.css";

interface ChatProps {
  user: User;
}

// Use firebaseAuth User to get signed in user
export default function Page(props: ChatProps) {
  const chatProps = useMultiChatLogic(process.env.NEXT_PUBLIC_CHAT_ENGINE_PROJECT_ID!, props.user.email!, props.user.uid)
  return (
    <>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"
        media="print"
      />
      <div style={{ height: "100vh" }}>
        <button
          className="btn btn-primary btn-md"
          style={{ position: "absolute", top: "0px", left: "0px" }}
          onClick={() => signOut(auth)}
        >
          <span className="glyphicon glyphicon-log-out"></span>
        </button>
        <MultiChatWindow
          {...chatProps}
          style={{ height: "100%" }}
        />
      </div>
    </>
  );
}
