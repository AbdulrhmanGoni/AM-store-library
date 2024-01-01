import { useEffect, useState } from "react"

type Cookies = { [key: string]: string }

export default function useCookies() {

    const [cookies, setCookies] = useState<Cookies>({})

    useEffect(() => {
        const cookies: Cookies = {}
        document.cookie.split("; ").forEach(cookie => {
            const [key, value] = cookie.split("=")
            cookies[key] = value
        })
        setCookies(cookies)
    }, [])

    function getCookie(name: string): string | undefined {
        return cookies[name]
    }

    function addCookie(name: string, value: string, maxAge?: number) {
        setCookies(state => { return { ...state, [name]: value } })
        const expiresIn = maxAge || 60 * 60 * 24 * 30 // or expires in a month
        document.cookie = `${name}=${value}; path=/; max-age=${expiresIn};`
    }

    function removeCookie(name: string) {
        setCookies(state => {
            const updatedCookies = { ...state }
            delete updatedCookies[name]
            return updatedCookies
        })
        document.cookie = `${name}=0; path=/; max-age=0;`
    }

    return {
        cookies,
        addCookie,
        removeCookie,
        getCookie
    }
}