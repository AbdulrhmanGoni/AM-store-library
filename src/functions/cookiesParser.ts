export type Cookies = { [key: string]: string }

export default function cookiesParser(): Cookies {
    const cookies: Cookies = {};
    document.cookie.split("; ").forEach(cookie => {
        const [key, value] = cookie.split("=")
        cookies[key] = value
    })
    return cookies
}
