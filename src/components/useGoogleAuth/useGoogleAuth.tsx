import React, { useState } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import GoogleAuthButton from './GoogleAuthButton';
import { CSSProperties } from '@mui/material/styles/createMixins';

export interface onSuccessProps { access_token: string }
export interface GoogleAuthButtonProps {
    text?: string,
    mode?: "dark" | "light"
    sx?: CSSProperties,
    onClick: () => void
}

export default function useGoogleAuth() {

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    async function onSuccess({ access_token }: onSuccessProps) {
        setLoading(true);
        const headers = { Authorization: `Bearer ${access_token}` };
        fetch(process.env.REACT_APP_GOOGLE_API ?? "", { headers })
            .then(res => res.json())
            .then(data => { setData(data) })
            .catch(() => { setError(true) })
            .finally(() => { setLoading(false) })
    }

    function AuthButton({ text, mode, sx, onClick }: GoogleAuthButtonProps) {
        return (
            <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID ?? ""}>
                <GoogleAuthButton
                    onSuccess={onSuccess}
                    onError={() => setError(true)}
                    mode={mode}
                    text={text}
                    sx={sx}
                    onClick={onClick}
                />
            </GoogleOAuthProvider>
        )
    }

    return {
        AuthButton, data, error, loading
    }
}
