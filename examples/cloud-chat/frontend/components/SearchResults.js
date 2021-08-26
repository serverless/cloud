import { useSnapshot } from "valtio";
import messages from "@state/messages";
import users from "@state/users";
import clsx from "clsx";

import Avatar from "./Avatar";

const noop = () => {};

function UserItem({ picture, name, onClick }) {
  return (
    <a
      href="#"
      className={clsx(
        "list-group-item list-group-item-action bg-gray-200 border-0 px-0 py-1 d-flex align-items-center gap-3"
      )}
      onClick={onClick}
    >
      {picture && <Avatar src={picture} alt={name} />}
      <h1 className="fs-5 mb-1">{name}</h1>
    </a>
  );
}

function ConversationItem({ title, picture, last, selected, onClick }) {
  return (
    <a
      href="#"
      className={clsx(
        "list-group-item list-group-item-action bg-gray-200 border-0 px-0 d-flex gap-3 align-items-center",
        selected && "active"
      )}
      onClick={onClick}
    >
      {picture && <Avatar src={picture} alt={title} />}
      <div>
        <h1 className="fs-5 mb-1">{title}</h1>
        <p
          className={clsx(
            selected ? "text-light" : "text-black-50",
            "fs-6 mt-0 mb-1"
          )}
        >
          {last}
        </p>
      </div>
    </a>
  );
}

function NoUsers() {
  return <p>No users found, try zooming out or panning to a different area</p>;
}

export default function SearchResults({
  onConversationClick = noop,
  onUserClick = noop,
}) {
  const { conversations } = useSnapshot(messages);
  const { items: userList, ready } = useSnapshot(users);

  return (
    <div className="p-2">
      {conversations.length > 0 && (
        <div className="p-0 pt-4">
          <h4>Conversations</h4>
          <ul className="list-group rounded-0">
            {conversations.map(({ key, value }) => (
              <ConversationItem
                key={key}
                {...value}
                onClick={() => onConversationClick(value)}
              />
            ))}
          </ul>
        </div>
      )}

      <div className="p-0 pt-4">
        <h4>Users nearby</h4>
        {ready && (
          <>
            {userList.length === 0 && <NoUsers />}
            {userList.length > 0 && (
              <ul className="list-group">
                {userList.map(({ key, value }) => (
                  <UserItem
                    key={key}
                    {...value}
                    onClick={() => onUserClick(value)}
                  />
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}
