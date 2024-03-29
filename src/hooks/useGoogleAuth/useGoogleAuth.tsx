import React, { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleAuthButton, { GoogleAuthButtonProps } from './GoogleAuthButton';

export default function useGoogleAuth({ clientId }: { clientId: string }) {

    const [googleScriptLoadSuccess, setGoogleScriptLoadSuccess] = useState(false);
    const [googleScriptLoadError, setGoogleScriptLoadError] = useState(false);

    function AuthButton(props: GoogleAuthButtonProps) {

        let { text, mode, sx, onSuccess, onError, onClick, onFinally } = props;

        return (
            <GoogleOAuthProvider
                clientId={clientId}
                onScriptLoadSuccess={() => {
                    setGoogleScriptLoadSuccess(true);
                    googleScriptLoadError && setGoogleScriptLoadError(false);
                }}
                onScriptLoadError={() => setGoogleScriptLoadSuccess(false)}
            >
                <GoogleAuthButton
                    onSuccess={onSuccess}
                    onError={onError}
                    onFinally={onFinally}
                    onClick={onClick}
                    mode={mode}
                    text={text}
                    sx={sx}
                    googleScriptLoadSuccess={googleScriptLoadSuccess}
                    googleScriptLoadError={googleScriptLoadError}
                />
            </GoogleOAuthProvider>
        )
    }

    return { AuthButton, googleScriptLoadSuccess, googleScriptLoadError }
}
