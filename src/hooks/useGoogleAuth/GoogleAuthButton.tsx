import React from 'react'
import { Button, Box } from '@mui/material'
import { useGoogleLogin } from '@react-oauth/google'
import { GoogleAuthButtonProps, onSuccessProps } from './useGoogleAuth'
import googleIcon from "../../images/google-icon.png"

export default function GoogleAuthButton(props: GoogleAuthButtonProps) {

    let { text, mode, sx, onSuccess, onError, onClick, onAgree, onFinally } = props;
    let isDark = mode === "dark";
    const loginWithGoogle = useGoogleLogin({
        onSuccess: ({ access_token }: onSuccessProps) => {
            onAgree?.()
            const headers = { Authorization: `Bearer ${access_token}` };
            fetch(process.env.REACT_APP_GOOGLE_API ?? "", { headers })
                .then(res => res.json())
                .then(data => onSuccess(data))
                .catch(() => onError?.())
                .finally(() => onFinally?.())
        },
        onError
    });

    return (
        <Button
            onClick={() => { loginWithGoogle(); onClick?.() }}
            sx={{
                width: "100%",
                bgcolor: isDark ? "black" : "white",
                color: isDark ? "white" : "black",
                "&:hover": {
                    bgcolor: isDark ? "#141414" : "rgb(237 237 237)"
                },
                ...sx
            }}
        >
            <Box
                component="img"
                src={googleIcon}
                sx={{ width: "45px", height: "35px", mr: 1, userSelect: "none" }}
                alt='Google logo'
            />
            {text ? text : "Continue with Google"}
        </Button>
    )
}
