import { auth } from "../../../../firebase";
import { signOut, User } from "firebase/auth";

// Problem is with the ant-design icons, can maybe use bootstrap/font awesome icons instead?
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";

import { Avatar } from "react-chat-engine-advanced";

interface SidebarProps {
  user: User;
}

export default function Sidebar(props: SidebarProps) {
  return (
    <div style={{ textAlign: "center" }}>
      <div className="ce-sidebar-menu">
        <FontAwesomeIcon icon={faHouse as IconProp} color="grey" />
        <FontAwesomeIcon icon={faMessage as IconProp} color="grey" />
        <FontAwesomeIcon icon={faGear as IconProp} color="grey" />
      </div>

      <Avatar
        className="sidebar-avatar"
        avatarUrl={
          typeof props.user?.photoURL === "string"
            ? props.user.photoURL
            : undefined
        } // Avatar = photoURL, username = email
        username={props.user?.displayName! || props.user.email!}
        isOnline={true}
      />
      <FontAwesomeIcon icon={faRightFromBracket as IconProp} color="grey" />
    </div>
  );
}
