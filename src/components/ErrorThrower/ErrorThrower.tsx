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
import signUp from "../../images/sign-up-illustrator.svg"

export type illustratorTypes =
    "empty" | "server" | "notFound" | "unexpected" |
    "network" | "unauthorized" | "waiting" | "waiting1" |
    "waiting2" | "signUp"

interface ErrorThrowerOptions {
    title: string,
    message?: string,
    fullPage?: boolean,
    style?: CSSProperties,
    paperStyle?: CSSProperties,
    disableHeight?: boolean,
    withRefreshButton?: boolean,
    alertType?: "success" | "info" | "error" | "warning",
    hideAlertMsg?: boolean,
    children?: JSX.Element
}
interface ErrorThrowerProps extends ErrorThrowerOptions {
    illustratorType: illustratorTypes
}

interface ErrorThrowerCustomProps extends ErrorThrowerOptions {
    customIllustrator: JSX.Element,
}

const illustrators = {
    empty, unexpected, server,
    network, notFound, waiting,
    waiting1, waiting2, unauthorized,
    signUp
}

export default function ErrorThrower(props: ErrorThrowerProps | ErrorThrowerCustomProps) {

    let {
        message, title, fullPage,
        style, disableHeight,
        withRefreshButton,
        alertType, hideAlertMsg,
        children, paperStyle
    } = props;

    const { illustratorType } = props as ErrorThrowerProps
    const { customIllustrator } = props as ErrorThrowerCustomProps

    const height = fullPage ? "100vh" : disableHeight ? null : "calc(100vh - 87px)"
    const containerOptions = fullPage ? {
        top: 0, left: 0,
        position: "absolute",
        backgroundColor: "background.default",
        height: disableHeight ? null : "calc(100vh - 87px)"
    } : {}

    const RefreshIcon = () => {
        return <IconButton onClick={() => location.reload()}><Refresh /></IconButton>
    }

    return (
        <Box className="flex-column-center full-width" sx={{ ...containerOptions, height, ...style }} >
            <Box className="flex-column-center gap1" sx={{ maxWidth: "570px" }}>
                <Paper
                    elevation={2}
                    className="flex-column-center full-width"
                    sx={{
                        p: 2,
                        position: "relative",
                        textAlign: "center",
                        "& img": {
                            width: "100%",
                            maxWidth: "450px",
                            userSelect: "none"
                        },
                        ...paperStyle
                    }}>
                    <Typography variant='h6'>{title}</Typography>
                    {
                        customIllustrator || (
                            <CardMedia
                                component={"img"}
                                src={illustrators[illustratorType]}
                            />
                        )
                    }
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