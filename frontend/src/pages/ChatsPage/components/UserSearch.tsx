import { AutoComplete, Input } from "antd";
import type { SelectProps } from "antd/es/select";
import { useState, useEffect, useRef } from "react";

import { PersonObject, Avatar } from "react-chat-engine-advanced";

import axios from "axios";

import { privateKey, projectId } from "../../../functions/constants";

import { User } from "firebase/auth";

interface CustomChatFormProps {
  username: string;
  secret: string;
  onSelect: (chatId: number) => void;
}

// User search component
export default function userSearch(props: CustomChatFormProps) {
  const didMountRef = useRef(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [users, setUsers] = useState<PersonObject[]>([]);
  const [options, setOptions] = useState<SelectProps<object>["options"]>([]);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      const headers = { "Private-Key": privateKey };
      axios
        .get("https://api.chatengine.io/users/", { headers })
        .then((r) => setUsers(r.data))
        .catch();
    }
  });

  const searchResult = (query: string) => {
    const foundUsers = users.filter(
      (user) =>
        JSON.stringify(user).toLowerCase().indexOf(query.toLowerCase()) !==
          -1 && user.first_name !== props.username
    );

    return foundUsers.map((user) => {
      return {
        value: user.username,
        label: (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>
              <Avatar avatarUrl={user.avatar} username={user.username!} />
            </span>
            <span>
              <div>{user.first_name}</div>
              <div>{user.username}</div>
            </span>
          </div>
        ),
      };
    });
  };
  const handleSearch = (query: string) => {
    setOptions(query ? searchResult(query) : []);
  };

  const onSelect = (value: string) => {
    setLoading(true);

    const headers = {
      "Project-ID": projectId,
      "User-Name": props.username,
      "User-Secret": props.secret!,
    };
    const data = {
      usernames: [props.username, value],
    };
    axios
      .put("https://api.chatengine.io/chats/", data, { headers })
      .then((r) => {
        props.onSelect(r.data.id);
        setLoading(false);
        setQuery("");
      })
      .catch(() => setLoading(false));
  };

  return (
    <div>
      <AutoComplete
        popupMatchSelectWidth={252}
        className="ce-chat-form-autocomplete"
        options={options}
        onSelect={onSelect}
        onSearch={handleSearch}
        value={query}
      >
        <Input.Search
          size="large"
          placeholder="Chats"
          enterButton
          loading={loading}
          onChange={(e) => setQuery(e.target.value)}
        />
      </AutoComplete>
    </div>
  );
}
