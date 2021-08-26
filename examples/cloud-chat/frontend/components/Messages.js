import { useEffect, useRef } from "react";
import { useSnapshot } from "valtio";
import clsx from "clsx";

import MessageBubble from "@components/MessageBubble";

import messagesState from "@state/messages";
import authState from "@state/auth";

function NoMessages() {
  return <p></p>;
}

export default function Messages({ className }) {
  const { messages } = useSnapshot(messagesState);
  const auth = useSnapshot(authState);
  const root = useRef();

  useEffect(() => {
    root.current.scrollTop =
      root.current.scrollHeight - root.current.clientHeight;
  }, [messages]);

  return (
    <ul className={clsx("list-unstyled p-3 mb-0", className)} ref={root}>
      <style jsx>{`
        ul {
          overflow-y: scroll;
          overflow-x: hidden;
          padding-bottom: 4em !important;
        }
        ul::-webkit-scrollbar-track {
          display: none;
        }
      `}</style>

      {messages.map((message, index) => {
        return (
          <MessageBubble
            key={index}
            message={message}
            sent={auth.user.id === message.value.from}
          ></MessageBubble>
        );
      })}
    </ul>
  );
}
