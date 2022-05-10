import useSWR from "swr";

export async function fetcher(key) {
  const result = await fetch(key);

  if (!result.ok) {
    const error = await result.json().catch(() => {});
    throw new Error(error.message || "Unknown error");
  }

  return result.json();
}

export function useData(path) {
  return useSWR(path, fetcher, { refreshInterval: 5000 });
}

export function useFile(id) {
  const { data: file, error } = useData(id && `/api/files/${id}`);

  if (error) {
    return { error };
  }

  if (!id || !file) {
    return {};
  }

  return { file };
}

export function useStats() {
  const { data, error } = useData("/open/stats");

  if (error) {
    return { error };
  }

  return { data };
}
