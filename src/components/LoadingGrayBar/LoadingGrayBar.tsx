import React from 'react';
import { Skeleton } from "@mui/material";
import { SxProps } from "@mui/material/styles";

export type LoadingGrayBarProps = {
    type?: "rounded" | "circular" | "rectangular" | "text",
    sx?: SxProps,
    width?: number | string,
    height: number | string
}

export default function LoadingGrayBar({ type, width, height, sx }: LoadingGrayBarProps) {
    return (
        <Skeleton variant={type ?? "rounded"} sx={{ width, height, ...sx }} />
    )
}