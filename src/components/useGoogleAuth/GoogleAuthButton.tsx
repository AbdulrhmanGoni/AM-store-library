import React from 'react'
import { Button, Box } from '@mui/material'
import { useGoogleLogin } from '@react-oauth/google'
import { onSuccessProps, GoogleAuthButtonProps } from './useGoogleAuth'

interface ButtonProps extends GoogleAuthButtonProps {
    onSuccess: (props: onSuccessProps) => void,
    onError?: () => void
}

export default function GoogleAuthButton({ text, mode, sx, onSuccess, onError }: ButtonProps) {

    let isDark = mode === "dark";
    const loginWithGoogle = useGoogleLogin({ onSuccess, onError });

    return (
        <Button
            onClick={() => loginWithGoogle()}
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
                src={new URL('../../images/google-icon.png', import.meta.url).href}
                sx={{ width: "45px", height: "35px", mr: 1, userSelect: "none" }}
                alt='Google logo'
            />
            {text ? text : "Continue with Google"}
        </Button>
    )
}
