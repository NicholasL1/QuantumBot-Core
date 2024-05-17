import { auth } from "../../../../firebase";
import { signOut } from "firebase/auth";

import { useRouter } from "next/router";

// Icons
import {
  LogoutOutlined,
  ReloadOutlined,
  MessageFilled,
  SettingFilled,
} from "@ant-design/icons";

import { Avatar } from "react-chat-engine-advanced";

interface SidebarProps {
  photoURL: string;
  displayName: string;
}

export default function Sidebar(props: SidebarProps) {
  const router = useRouter();

  return (
    <div style={{ textAlign: "center" }}>
      <div className="ce-sidebar-menu" style={{ paddingRight: "0%" }}>
        <ReloadOutlined
          onClick={() => router.reload()}
          className="ce-sidebar-icon"
        />
        <MessageFilled className="ce-sidebar-icon ce-sidebar-icon-active" />
        <SettingFilled className="ce-sidebar-icon" />
      </div>

      <Avatar
        className="sidebar-avatar"
        avatarUrl={
          typeof props.photoURL === "string" ? props.photoURL : undefined
        } // Avatar = photoURL, username = email
        username={props.displayName!}
        isOnline={true}
      />
      <LogoutOutlined onClick={() => signOut(auth)} className="signout-icon" />
    </div>
  );
}
