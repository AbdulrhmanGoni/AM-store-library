import React, { CSSProperties } from 'react';
import { applyDiscount, nDecorator } from '../../functions';
import { P } from '../P';
import { Box, useMediaQuery } from '@mui/material';

interface PriceDisplayerProps {
    price: number,
    currency?: string,
    style?: CSSProperties,
    operator?: string,
    discount?: number
}

export default function PriceDisplayer(props: PriceDisplayerProps) {

    const mobileDevice = useMediaQuery("(max-width: 600px)")
    const {
        price,
        currency = "$",
        style,
        operator,
        discount
    } = props;
    const priceFontSize = mobileDevice ? ".88rem" : "1.02rem";
    const currencyFontSize = mobileDevice ? ".72rem" : ".8rem";

    return (
        <Box
            sx={{
                display: "inline-flex",
                flexDirection: "column",
                ...style
            }}
        >
            {
                !!discount &&
                <Box
                    className='flex-row-center gap1'
                    sx={{ fontSize: currencyFontSize, ml: 1 }}
                >
                    <P
                        style={{
                            color: 'gray',
                            textDecoration: "line-through"
                        }}
                    >
                        {price?.toFixed(2)}
                    </P>
                    <P style={{ color: 'red' }}>{discount * 100}%</P>
                </Box>
            }
            <Box className="flex-row">
                <Box component="span"
                    style={{
                        fontSize: currencyFontSize,
                        transform: "translate(0px, -1px)",
                        display: "inline-block",
                        margin: "0 2px 0 0",
                        ...style
                    }}>
                    {currency}
                </Box>
                <P sx={{ fontSize: priceFontSize, ...style }}>
                    {operator ?? null}{nDecorator((discount ? applyDiscount(price, discount) : price)?.toFixed(2))}
                </P>
            </Box>
        </Box>
    );
}
