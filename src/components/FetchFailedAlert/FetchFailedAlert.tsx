import React from "react";
import { Refresh } from "@mui/icons-material";
import { Alert, IconButton } from "@mui/material";

interface FetchFailedAlertProps {
    message: string,
    refetch?: () => void,
    height?: string,
    width?: string,
}

export default function FetchFailedAlert({ message, refetch, height = "100%", width = "100%" }: FetchFailedAlertProps) {
    return (
        <Alert
            severity="error"
            className="flex-row-center"
            sx={{
                height, width,
                "& .MuiAlert-action": { ml: 0, p: "0px 0 0 8px" }
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
