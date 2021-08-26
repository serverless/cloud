import { useSnapshot } from "valtio";
import users from "@state/users";
import clsx from "clsx";

import Avatar from "./Avatar";

function UserItem({ picture, name, onClick }) {
  return (
    <a
      href="#"
      className={clsx("list-group-item list-group-item-action bg-gray-200")}
      onClick={onClick}
    >
      <Avatar src={picture} alt={name} />
      <h1 className="fs-5 mb-1">{name}</h1>
    </a>
  );
}

export default function UserList() {
  const { items } = useSnapshot(users);

  return (
    <div>
      <ul className="list-group rounded-0">
        {items.map(({ key, value }) => (
          <UserItem key={key} {...value} />
        ))}
      </ul>
    </div>
  );
}
