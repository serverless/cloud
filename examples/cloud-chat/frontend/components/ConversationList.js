import { useCallback } from "react";
import { useSnapshot } from "valtio";
import messageState from "@state/messages";
import clsx from "clsx";
import TypingIndicator from "@icons/TypingIndicator";
import Avatar from "./Avatar";

function ConversationItem({ picture, title, last, selected, onClick, typing }) {
  return (
    <div
      className={clsx(
        "list-group-item list-group-item-action bg-white border-0 py-1 px-0"
      )}
    >
      <a
        href="#"
        className={clsx(
          "list-group-item list-group-item-action bg-gray-200 border-0 rounded-3 mx-0 d-flex gap-3 align-items-center",
          selected && "active"
        )}
        onClick={onClick}
      >
        <div>{picture && <Avatar src={picture} alt={title} />}</div>
        <div>
          <h1 className="fs-5 mb-1">{title}</h1>
          <p
            className={clsx(
              selected ? "text-light" : "text-black-50",
              "fs-6 mt-0 mb-1"
            )}
          >
            {typing ? <TypingIndicator /> : last}
          </p>
        </div>
      </a>
    </div>
  );
}

function NoConversations() {
  return (
    <p className="text-center m-4 text-black-50">
      No conversations found, try searching for users nearby
    </p>
  );
}

export default function ConversationList() {
  const { conversations, selectedConversationId } = useSnapshot(messageState);

  const handleItemClick = useCallback((item) => {
    messageState.selectConversation(item);
  }, []);

  return (
    <div>
      {conversations.length === 0 && <NoConversations />}
      <ul className="list-group rounded-0">
        {conversations.map(({ key, value }) => (
          <ConversationItem
            key={key}
            {...value}
            selected={value.convId === selectedConversationId}
            onClick={() => handleItemClick(value)}
          />
        ))}
      </ul>
    </div>
  );
}
