import React, { CSSProperties } from 'react';
import { Box, CircularProgress } from '@mui/material';

interface LoadingCircleProps {
    style?: CSSProperties,
    staticCircle?: string,
    darkBg?: boolean
}

function LoadingCircle({ style, staticCircle, darkBg }: LoadingCircleProps) {

    const startStyle = {
        position: "fixed",
        top: 0, left: 0,
        minHeight: "100vh",
        width: "100%",
        display: staticCircle === "loadingCircle-id" ? "none" : "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        backgroundColor: darkBg ? "#00000080" : "tranparent",
    }

    return (
        <Box id={staticCircle} sx={{ ...startStyle, ...style }}>
            <CircularProgress color='primary' />
        </Box>
    );
}

export default LoadingCircle;
