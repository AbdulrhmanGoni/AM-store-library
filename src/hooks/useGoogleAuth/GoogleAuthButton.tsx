import React from "react";
import { Button, Box, SxProps } from "@mui/material";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import googleIcon from "../../images/google-icon.png";

export type GoogleUserCredentials = Omit<
  TokenResponse,
  "error" | "error_description" | "error_uri"
>;
export interface GoogleAuthButtonProps {
  text?: string;
  mode?: "dark" | "light";
  sx?: SxProps;
  onSuccess: (googleUserCredentials: GoogleUserCredentials) => void;
  onError?: () => void;
  onClick?: () => void;
  onFinally?: () => void;
}

export default function GoogleAuthButton(props: GoogleAuthButtonProps) {
  let { text, mode, sx, onSuccess, onError, onClick, onFinally } = props;
  let isDark = mode === "dark";
  const loginWithGoogle = useGoogleLogin({ onSuccess, onError });

  function click() {
    onClick?.();
    loginWithGoogle();
    onFinally?.();
  }

  return (
    <Button
      onClick={click}
      sx={{
        width: "100%",
        bgcolor: isDark ? "black" : "white",
        color: isDark ? "white" : "black",
        "&:hover": {
          bgcolor: isDark ? "#141414" : "rgb(237 237 237)",
        },
        ...sx,
      }}
    >
      <img
        src={googleIcon}
        style={{
          width: "45px",
          height: "35px",
          marginRight: "8px",
          userSelect: "none",
        }}
        alt="Google logo"
        draggable={false}
      />
      {text ? text : "Continue with Google"}
    </Button>
  );
}
