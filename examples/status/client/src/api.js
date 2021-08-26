
const baseURL = `${window.location.origin}/api`

const getHeaders = (password) => {
    const storedPassword = localStorage.getItem("serverless-status")
    const parseStoredPassword = storedPassword ? JSON.parse(storedPassword) : ''
    
    return {
        Authorization: `Bearer ${password || parseStoredPassword}`,
        "Content-Type": "application/json",
    }
}
export const apiClient = async ({ url, body, password, method = 'GET' }) => {
    
    const res = await fetch(`${baseURL}/${url}`, {
        method,
        headers: getHeaders(password),
        body
    })
    
    const json = await res.json()
    if (res.ok) {

        return json
    } else {

        
        throw new Error(json.message)
    }
}


