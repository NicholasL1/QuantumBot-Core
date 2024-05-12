import { auth } from "../../../../firebase";
import { signOut } from "firebase/auth";

// Icons
import {
  LogoutOutlined,
  HomeFilled,
  MessageFilled,
  SettingFilled,
} from "@ant-design/icons";

import { Avatar } from "react-chat-engine-advanced";

interface SidebarProps {
  photoURL: string;
  displayName: string;
  email: string;
}

export default function Sidebar(props: SidebarProps) {
  return (
    <div style={{ textAlign: "center", width: "40vh" }}>
      {/* <div className="ce-sidebar-menu">
        <HomeFilled className="ce-sidebar-icon" />
        <MessageFilled className="ce-sidebar-icon ce-sidebar-icon-active" />
        <SettingFilled className="ce-sidebar-icon" />
      </div> */}

      <Avatar
        className="sidebar-avatar"
        avatarUrl={
          typeof props.photoURL === "string" ? props.photoURL : undefined
        } // Avatar = photoURL, username = email
        username={props.displayName! || props.email!}
        isOnline={true}
      />
      <LogoutOutlined onClick={() => signOut(auth)} className="signout-icon" />
    </div>
  );
}
