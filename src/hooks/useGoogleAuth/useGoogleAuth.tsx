import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleAuthButton from './GoogleAuthButton';
import { GoogleAuthButtonProps } from './GoogleAuthButton';

export default function useGoogleAuth() {

    function AuthButton(props: GoogleAuthButtonProps) {
        let { text, mode, sx, onSuccess, onError, onClick, onFinally } = props;
        return (
            <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID || ""}>
                <GoogleAuthButton
                    onSuccess={onSuccess}
                    onError={onError}
                    onFinally={onFinally}
                    onClick={onClick}
                    mode={mode}
                    text={text}
                    sx={sx}
                />
            </GoogleOAuthProvider>
        )
    }

    return { AuthButton }
}
