import Image from "next/image";

import { User } from "firebase/auth";
import {
  MultiChatWindow,
  MultiChatSocket,
  useMultiChatLogic,
  MessageFormProps,
  ChatCardProps,
  ChatHeaderProps,
} from "react-chat-engine-advanced";

// Functions
import { useIsMobile } from "../../functions/isMobile";

// Asset imports
import valley from "../../assets/valley.jpeg";

// Component imports
import Sidebar from "./components/Sidebar";
import UserSearch from "./components/UserSearch";
import ChatCard from "./components/ChatCard";
import ChatHeader from "./components/ChatHeader";
import MessageForm from "./components/MessageForm";

interface ChatProps {
  user: User | null;
}

// Use firebaseAuth User to get signed in user
export default function Page(props: ChatProps) {
  // Handle case where props.user might be null
  const user = props.user || { displayName: "", uid: "", photoURL: "" };

  const chatProps = useMultiChatLogic(
    process.env.NEXT_PUBLIC_CHAT_ENGINE_PROJECT_ID!,
    user.displayName!,
    user.uid!
  );

  // If webpage in mobile mode
  const isMobile: boolean = useIsMobile();

  // Background image

  return (
    <div style={{ overflow: "hidden" }}>
      <div className="background-image" style={{ zIndex: -1 }}>
        <Image src={valley} alt="Valley" fill={true} objectFit="cover" />
      </div>
      <div className="background-gradient-light">
        <div
          style={{
            position: "absolute",
            top: isMobile ? "0px" : "10vh",
            left: isMobile ? "0px" : "calc(50vw - 3vw - 1.5vw - 35vw)",
            height: isMobile ? "100vh" : "80vh",
            width: isMobile ? "100vw" : "calc(100vw - 10.5vw - 10.5vw)",
            backgroundColor: "rgb(40, 43, 54)",
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
            <Sidebar
              photoURL={user.photoURL!}
              displayName={user.displayName!}
            />
          </div>
          <div
            className="chat-window"
            style={{
              width: isMobile ? "100vw" : "calc(100vw - 6vw)",
              position: "absolute",
              top: "0px",
              left: isMobile ? "0px" : "6vw",
              height: "100%", // Fill parent height
            }}
          >
            <MultiChatSocket {...chatProps} />

            <MultiChatWindow
              {...chatProps}
              renderChatForm={() => (
                <UserSearch
                  username={chatProps.username}
                  secret={chatProps.secret}
                  onSelect={(chatId: number) =>
                    chatProps.onChatCardClick(chatId)
                  }
                />
              )}
              renderChatCard={(props: ChatCardProps) => (
                <ChatCard
                  {...props}
                  username={chatProps.username}
                  onChatCardClick={chatProps.onChatCardClick}
                  isActive={
                    props.chat !== undefined &&
                    chatProps.activeChatId === props.chat.id
                  }
                  chat={props.chat}
                />
              )}
              renderChatHeader={(props: ChatHeaderProps) => (
                <ChatHeader
                  {...props}
                  chat={chatProps.chat}
                  username={chatProps.username}
                  secret={chatProps.secret}
                />
              )}
              renderMessageForm={(props: MessageFormProps) => (
                <MessageForm {...props} displayName={chatProps.username} />
              )}
              renderChatSettings={() => <div className="ce-empty-settings" />}
              style={{ height: "100%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
