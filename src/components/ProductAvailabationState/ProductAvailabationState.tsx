import React from 'react';
import { Alert, SxProps, Typography } from '@mui/material';

interface ProductAvailabationStateProps {
    amount: number,
    visitAllAmount?: boolean,
    style?: SxProps,
    disableResponsive?: boolean
}

export default function ProductAvailabationState({ amount, visitAllAmount, style, disableResponsive }: ProductAvailabationStateProps) {

    let howManyLeft = () => {
        if (visitAllAmount) {
            return !amount ? "Out Of Stock" : amount < 6 ? `${amount} Left` : amount < 11 ? `${amount} Left` : "Available"
        } else {
            return amount ? `${amount} Left` : "Out Of Stock"
        }
    }

    return (amount < 4 || visitAllAmount ?
        <Alert
            icon={false} color={amount > 3 ? "info" : amount ? "warning" : "error"}
            sx={{ p: "5px 8px", "& div": { p: 0 }, ...style }}>
            <Typography
                sx={{ fontSize: { xs: disableResponsive ? ".82rem" : ".75rem", sm: ".8rem" } }}
                variant='subtitle2'>
                {howManyLeft()}
            </Typography>
        </Alert> : null
    )
}