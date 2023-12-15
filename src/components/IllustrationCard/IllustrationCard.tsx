import React, { JSX } from 'react'
import { Refresh } from '@mui/icons-material'
import {
    Alert, Box, CardMedia,
    IconButton, Paper,
    SxProps
} from '@mui/material';
import {
    empty, unexpected, server,
    network, notFound, waiting,
    waiting1, waiting2, unauthorized,
    signUp
} from '../../images';
import { P } from '../P';

export type illustratorTypes =
    "empty" | "server" | "notFound" | "unexpected" |
    "network" | "unauthorized" | "waiting" | "waiting1" |
    "waiting2" | "signUp"

interface IllustrationCardOptions {
    title: string,
    message?: string,
    fullPage?: boolean,
    style?: SxProps,
    paperStyle?: SxProps,
    disableHeight?: boolean,
    withRefreshButton?: boolean,
    alertType?: "success" | "info" | "error" | "warning",
    hideAlertMsg?: boolean,
    children?: JSX.Element
}
interface IllustrationCardProps extends IllustrationCardOptions {
    illustratorType: illustratorTypes
}

interface IllustrationCardCustomProps extends IllustrationCardOptions {
    customIllustrator: JSX.Element,
}

const illustrators = {
    empty, unexpected, server,
    network, notFound, waiting,
    waiting1, waiting2, unauthorized,
    signUp
}

export default function IllustrationCard(props: IllustrationCardProps | IllustrationCardCustomProps) {

    let {
        message, title, fullPage,
        style, disableHeight,
        withRefreshButton,
        alertType, hideAlertMsg,
        children, paperStyle
    } = props;

    const { illustratorType } = props as IllustrationCardProps
    const { customIllustrator } = props as IllustrationCardCustomProps

    const height = fullPage ? "100vh" : disableHeight ? "initial" : "calc(100vh - 87px)"

    const containerOptions: SxProps = fullPage ? {
        top: 0, left: 0,
        position: "absolute",
        backgroundColor: "background.default",
        height
    } : {}

    const RefreshIcon = () => {
        return <IconButton onClick={() => location.reload()}><Refresh /></IconButton>
    }

    return (
        <Box className="flex-column-center full-width" sx={{ ...containerOptions, ...style }}>
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
                    <P variant='h6'>{title}</P>
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
        </Box>
    )
}