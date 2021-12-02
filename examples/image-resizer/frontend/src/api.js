const baseURL = `${window.location.origin}/api`
export const apiClient = async ({ url, body, method = 'GET' }) => {
  const res = await fetch(`${baseURL}/${url}`, {
    method,
    body
  })
  const json = await res.json()
  if (res.ok) {
    return json
  } else {
    throw new Error(json.message)
  }
}
