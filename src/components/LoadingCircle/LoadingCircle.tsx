import React, { CSSProperties } from 'react';
import { Box, CircularProgress } from '@mui/material';

interface LoadingCircleProps {
    style?: CSSProperties,
    id?: string,
    darkBg?: boolean
}

function LoadingCircle({ style, id, darkBg }: LoadingCircleProps) {

    const startStyle = {
        position: "fixed",
        top: 0, left: 0,
        minHeight: "100vh",
        width: "100%",
        display: id === "loadingCircle" ? "none" : "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        backgroundColor: darkBg ? "#00000080" : "tranparent",
    }

    return (
        <Box id={id} sx={{ ...startStyle, ...style }}>
            <CircularProgress color='primary' />
        </Box>
    );
}

export default LoadingCircle;
