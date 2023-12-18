import React from "react";
import { Refresh } from "@mui/icons-material";
import { Alert, IconButton, SxProps } from "@mui/material";

interface FetchFailedAlertProps {
    message: string,
    refetch?: () => void,
    height?: string,
    width?: string,
    style?: SxProps
}

export default function FetchFailedAlert(props: FetchFailedAlertProps) {

    const { message, refetch, height = "100%", width = "100%", style } = props;
    return (
        <Alert
            severity="error"
            className="flex-row-center"
            sx={{
                height, width,
                "& .MuiAlert-action": { ml: 0, p: "0px 0 0 8px" },
                ...style
            }}
            action={
                refetch &&
                <IconButton onClick={refetch}>
                    <Refresh />
                </IconButton>
            }
        >
            {message}
        </Alert>
    )
}
