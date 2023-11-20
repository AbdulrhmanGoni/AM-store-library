import React, { JSX } from "react";
import {
    Alert,
    IconButton,
    Tooltip,
    TooltipProps,
    styled,
    tooltipClasses,
    useMediaQuery
} from "@mui/material";

interface AlertTooltipProps {
    tooltipProps?: TooltipProps,
    title: string,
    type?: "success" | "info" | "warning" | "error",
    color?: string,
    fSize?: number,
    action?: () => void,
    actionIcon?: JSX.Element,
    children: JSX.Element,
}

export default function AlertTooltip(props: AlertTooltipProps) {

    const {
        tooltipProps,
        title,
        type = "info",
        color = "#fff",
        fSize = 16,
        actionIcon,
        action,
        children
    } = props;
    const smallScreens = useMediaQuery("(max-width: 550px)");

    const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: theme.palette.background.paper,
            color,
            maxWidth: smallScreens ? 300 : 500,
            boxShadow: theme.shadows[1],
            fontSize: fSize,
            padding: 0,
            margin: 0
        }
    }));

    return (
        <StyledTooltip
            title={
                <Alert
                    severity={type}
                    variant="outlined"
                    className="flex-row-center-start"
                    sx={{
                        p: "0 3px 0 6px",
                        ".MuiAlert-message": { p: .5, flex: 1 },
                        ".MuiAlert-icon": { mr: "0px", p: "0px" },
                        ".MuiSvgIcon-root": { width: "0.9em", height: "0.9em" },
                        ".MuiAlert-action": { p: "0px", m: "0px" }
                    }}
                    action={
                        actionIcon && action &&
                        <IconButton
                            size="small"
                            onClick={action}
                            color={type}
                            sx={{ p: .5 }}
                        >
                            {actionIcon}
                        </IconButton>
                    }
                >
                    {title}
                </Alert>
            }
            {...tooltipProps}
        >
            {children}
        </StyledTooltip>
    )
}