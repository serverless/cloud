import { useStats } from "../lib/data";

export default function Stats() {
  const { data, error } = useStats();

  if (error || !data) {
    return null;
  }

  return (
    <div>
      <h5>App stats</h5>
      <ul>
        <li>Users: {data.user_count || 0}</li>
        <li>Files: {data.file_count || 0}</li>
      </ul>
    </div>
  );
}
