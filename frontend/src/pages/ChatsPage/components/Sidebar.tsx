import { auth } from "../../../../firebase";
import { signOut, User } from "firebase/auth";

// // Problem is with the ant-design icons, can maybe use bootstrap/font awesome icons instead?
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { IconProp } from "@fortawesome/fontawesome-svg-core";
// import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
// import { faHouse } from "@fortawesome/free-solid-svg-icons";
// import { faMessage } from "@fortawesome/free-solid-svg-icons";
// import { faGear } from "@fortawesome/free-solid-svg-icons";

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
    <div style={{ textAlign: "center" }}>
      <div className="ce-sidebar-menu">
        <HomeFilled className="ce-sidebar-icon" />
        <MessageFilled className="ce-sidebar-icon ce-sidebar-icon-active" />
        <SettingFilled className="ce-sidebar-icon" />
      </div>

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
