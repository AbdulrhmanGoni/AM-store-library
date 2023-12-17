import React from 'react';
import { Box, CircularProgress, SxProps } from '@mui/material';

interface LoadingCircleProps {
    style?: SxProps,
    staticCircle?: boolean,
    darkBg?: boolean
}

export default function LoadingCircle({ style, staticCircle, darkBg }: LoadingCircleProps) {

    const startStyle: SxProps = {
        position: "fixed",
        top: 0, left: 0,
        minHeight: "100vh",
        width: "100%",
        display: staticCircle ? "none" : "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1300,
        backgroundColor: darkBg ? "#00000080" : "tranparent",
        ...style
    }

    return (
        <Box id={staticCircle ? "loadingCircle-id" : undefined} sx={startStyle}>
            <CircularProgress color='primary' />
        </Box>
    );
}