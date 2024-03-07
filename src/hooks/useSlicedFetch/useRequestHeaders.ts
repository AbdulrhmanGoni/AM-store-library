import useCookies from "../useCookies"

export interface useRequestHeadersProps {
    isAdminsRequest?: boolean,
    isUsersRequest?: boolean
}

export default function useRequestHeaders({ isUsersRequest, isAdminsRequest }: useRequestHeadersProps) {

    const {
        cookies: {
            "admin-access-token": adminAccessToken,
            adminId,
            userId,
            "access-token": accessToken
        }
    } = useCookies()

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
