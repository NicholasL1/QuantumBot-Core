import { CSSProperties } from "react";

import { auth } from "../../../firebase";
import { signOut, User } from "firebase/auth";
import { MultiChatWindow, useMultiChatLogic } from "react-chat-engine-advanced";

// Functions
import { useIsMobile } from "../../functions/isMobile";

// Asset imports
import valley from "../../assets/valley.jpeg";

// Component imports
import Sidebar from "./components/Sidebar";

// Bootstrap styling
import "bootstrap/dist/css/bootstrap.min.css";

interface ChatProps {
  user: User;
}

// Use firebaseAuth User to get signed in user
export default function Page(props: ChatProps) {
  const chatProps = useMultiChatLogic(
    process.env.NEXT_PUBLIC_CHAT_ENGINE_PROJECT_ID!,
    props.user.email!,
    props.user.uid
  );

  // If webpage in mobile mode
  const isMobile: boolean = useIsMobile();

  // Background image
  const backgroundImage = {
    backgroundImage: `url(${valley})`,
  } as CSSProperties;

  return (
    <div className="background-image" style={backgroundImage}>
      <div className="background-gradient-light">
        <div
          style={{
            position: "relative",
            top: isMobile ? "0px" : "10vh",
            left: isMobile ? "0px" : "calc(50vw - 3vw - 1.5vw - 35vw)",
            height: isMobile ? "100vh" : "80vh",
            width: isMobile ? "100vw" : "calc(100vw - 10.5vw - 10.5vw)",
            backgroundColor: "grey",
          }}
        >
          <div
            style={{
              width: "6vw",
              height: "100%",
              position: "absolute",
              top: "0px",
              left: "0px",
              backgroundColor: "rgb(40,43,54)",
            }}
          >
            <Sidebar user={props.user} />
          </div>
          <MultiChatWindow {...chatProps} style={{ height: "100%" }} />
        </div>
      </div>
    </div>
  );
}
