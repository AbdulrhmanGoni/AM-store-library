import useCookies from "../useCookies"

export default function useRequestHeaders() {

    const {
        cookies: {
            "admin-access-token": adminAccessToken,
            adminId,
            userId,
            "access-token": accessToken
        }
    } = useCookies()

    const adminPanelHost = process.env.REACT_APP_ADMIN_PANEL_HOST_NAME
    const amStoreHost = process.env.REACT_APP_AM_STORE_HOST_NAME

    const isUsersRequest = window.location.host === amStoreHost
    const isAdminsRequest = window.location.host === adminPanelHost

    const token =
        isUsersRequest ? accessToken :
            isAdminsRequest ? adminAccessToken :
                null

    const tokenId =
        isUsersRequest ? userId :
            isAdminsRequest ? adminId :
                null

    const headers = {
        'authorization': `Bearer ${token}`,
        'token-id': tokenId,
        'Content-Type': 'application/json',
    }

    return headers
}
