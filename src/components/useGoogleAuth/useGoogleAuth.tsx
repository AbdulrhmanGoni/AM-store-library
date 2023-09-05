import React from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import GoogleAuthButton from './GoogleAuthButton';
import { CSSProperties } from '@mui/material/styles/createMixins';

export interface onSuccessProps { access_token: string }
export interface GoogleAuthUserInfo {
    email?: string,
    name?: string,
    email_verified?: boolean
}
export interface GoogleAuthButtonProps {
    text?: string,
    mode?: "dark" | "light"
    sx?: CSSProperties,
    onSuccess: (userInfo: GoogleAuthUserInfo) => void,
    onError?: () => void,
    onClick?: () => void,
    onAgree?: () => void,
    onFinally?: () => void
}

export default function useGoogleAuth() {

    function AuthButton(props: GoogleAuthButtonProps) {
        let { text, mode, sx, onSuccess, onError, onClick, onAgree, onFinally } = props;
        return (
            <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID ?? ""}>
                <GoogleAuthButton
                    onSuccess={onSuccess}
                    onError={onError}
                    onFinally={onFinally}
                    onClick={onClick}
                    onAgree={onAgree}
                    mode={mode}
                    text={text}
                    sx={sx}
                />
            </GoogleOAuthProvider>
        )
    }

    return { AuthButton }
}
