import { useContext, useState } from "react";

import { User } from "firebase/auth";

import { CaretUpFilled } from "@ant-design/icons";

import { MessageObject, MessageFormProps } from "react-chat-engine-advanced";

import { nowTimeStamp } from "../../../functions/dates";
import { Context } from "../../../functions/context";

interface CustomMessageFormProps extends MessageFormProps {
  displayName: string;
}

export default function MessageForm(props: CustomMessageFormProps) {
  const [text, setText] = useState<string>("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (text.trim().length === 0) {
      return;
    }

    setText("");

    const message: MessageObject = {
      text: text,
      sender_username: props.displayName!,
      created: nowTimeStamp(),
      custom_json: {},
      attachments: [],
    };

    props.onSubmit && props.onSubmit(message);
  };

  return (
    <form onSubmit={onSubmit} className="ce-custom-message-form">
      <input
        onChange={(e) => setText(e.target.value)}
        value={text}
        placeholder="Type something..."
        className="ce-custom-message-input"
      />

      <button type="submit" className="ce-custom-send-button">
        <CaretUpFilled />
      </button>
    </form>
  );
}
