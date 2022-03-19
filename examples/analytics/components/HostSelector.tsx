import useSWR from "swr";

import { Dropdown } from "react-bootstrap";

const fetcher = (key) => fetch(key).then((res) => res.json());

export default function HostSelector({ value, onChange }) {
  const { data } = useSWR("/api/hosts", fetcher);
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {value.hostname || "Select host..."}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {data?.items?.map((host) => (
          <Dropdown.Item key={host.key} onClick={() => onChange(host)}>
            {host.hostname}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
