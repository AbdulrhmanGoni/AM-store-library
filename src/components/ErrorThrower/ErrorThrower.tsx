import React, { CSSProperties, JSX } from 'react'
import { Refresh } from '@mui/icons-material'
import { Alert, Box, CardMedia, IconButton, Paper, Typography } from '@mui/material';
import empty from '../../images/empty.png';
import unexpected from "../../images/unexpected.png";
import server from "../../images/server.png";
import network from "../../images/network.png"
import notFound from "../../images/notFound.png"
import waiting from "../../images/waiting.png"
import waiting1 from "../../images/waiting1.png"
import waiting2 from "../../images/waiting2.png"
import unauthorized from "../../images/unauthorized.png"

export type illustratorTypes =
    "empty" | "server" | "notFound" | "unexpected" |
    "network" | "unauthorized" | "waiting" | "waiting1" |
    "waiting2"

interface ErrorThrowerProps {
    title: string,
    message?: string,
    fullPage?: boolean,
    style?: CSSProperties,
    paperStyle?: CSSProperties,
    disableHeight?: boolean,
    withRefreshButton?: boolean,
    illustratorType: illustratorTypes,
    alertType?: "success" | "info" | "error" | "warning",
    hideAlertMsg?: boolean,
    children?: JSX.Element | JSX.Element[]
}

const illustrator = {
    empty, unexpected, server,
    network, notFound, waiting,
    waiting1, waiting2, unauthorized
}

export default function ErrorThrower(props: ErrorThrowerProps) {

    let {
        message, title, fullPage,
        style, disableHeight,
        withRefreshButton,
        alertType, hideAlertMsg,
        illustratorType, children,
        paperStyle
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
                <Paper
                    elevation={2}
                    sx={{
                        ...parentStyle,
                        p: 2,
                        position: "relative",
                        textAlign: "center",
                        width: "100%",
                        ...paperStyle
                    }}>
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