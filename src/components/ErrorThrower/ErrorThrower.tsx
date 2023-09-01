import React, { CSSProperties, JSX } from 'react'
import { Refresh } from '@mui/icons-material'
import { Alert, Box, CardMedia, IconButton, Paper, Typography } from '@mui/material';

type illustratorTypes =
    "empty" | "server" | "notFound" | "unexpected" | 
    "network" | "unauthorized" | "waiting" | "waiting1" |
    "waiting2"

interface ErrorThrowerProps {
    title: string,
    message?: string,
    fullPage?: boolean,
    style?: CSSProperties,
    disableHeight?: boolean,
    withRefreshButton?: boolean,
    illustratorType: illustratorTypes,
    alertType?: "success" | "info" | "error" | "warning",
    hideAlertMsg?: boolean,
    children?: JSX.Element | JSX.Element[]
}

const illustrator = {
    empty: new URL('../../images/empty.png', import.meta.url).href,
    unexpected: new URL("../../images/unexpected.png", import.meta.url).href,
    server: new URL("../../images/server.png", import.meta.url).href,
    network: new URL("../../images/network.png", import.meta.url).href,
    notFound: new URL("../../images/notFound.png", import.meta.url).href,
    waiting: new URL("../../images/waiting.png", import.meta.url).href,
    waiting1: new URL("../../images/waiting1.png", import.meta.url).href,
    waiting2: new URL("../../images/waiting2.png", import.meta.url).href,
    unauthorized: new URL("../../images/unauthorized.png", import.meta.url).href,
}

function ErrorThrower(props: ErrorThrowerProps) {

    let {
        message, title, fullPage,
        style, disableHeight,
        withRefreshButton,
        alertType, hideAlertMsg,
        illustratorType, children
    } = props;

    const parentStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    }

    const height = fullPage ? "100vh" : disableHeight ? null : "calc(100vh - 87px)"
    const containerOptions = fullPage ? {
        top: 0, left: 0,
        position: "absolute",
        backgroundColor: "background.default",
        height: disableHeight ? null : "calc(100vh - 87px)"
    } : {}

    const RefreshIcon = () => {
        return <IconButton onClick={() => window.location.reload()}><Refresh /></IconButton>
    }

    return (
        <Box sx={{ ...parentStyle, ...containerOptions, height, width: "100%", ...style }} >
            <Box sx={{ ...parentStyle, m: 1, gap: 1, maxWidth: "600px" }}>
                <Paper elevation={2} sx={{ ...parentStyle, p: 2, textAlign: "center", width: "100%" }}>
                    <Typography variant='h6'>{title}</Typography>
                    <CardMedia
                        component={"img"}
                        sx={{ width: "100%" }}
                        src={illustrator[illustratorType]}
                    />
                    {children}
                </Paper>
                {!hideAlertMsg && <Alert
                    action={withRefreshButton && <RefreshIcon />}
                    sx={{ width: "100%", alignItems: "center" }}
                    severity={alertType ?? 'error'}
                >
                    {message}
                </Alert>}
            </Box>
        </ Box >
    )
}

export default ErrorThrower