import React from "react";
import { PromiseState } from "../../interfaces";
import { Skeleton } from "@mui/material";

interface DisplayerItemWithLoadingStateProps extends PromiseState {
    element: JSX.Element,
    width?: number | string,
    height: number | string
}

export default function ElementWithLoadingState({ element, width, height, isLoading }: DisplayerItemWithLoadingStateProps) {
    return isLoading ? <Skeleton
        width={width ?? "100%"}
        height={height}
        variant="rounded"
        sx={{ bgcolor: "rgb(0 0 0 / 20%)" }} />
        : element
}