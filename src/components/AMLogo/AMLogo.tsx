import React from 'react';
import { Avatar, SxProps, useMediaQuery, useTheme } from '@mui/material';
import blackLogo from '../../images/AM-Logo-black.png';
import whiteLogo from '../../images/AM-Logo-white.png';
import blackFullLogo from '../../images/AM-Stroe-Logo-black.png';
import whiteFullLogo from '../../images/AM-Stroe-Logo-white.png';

interface AMLogoProps {
    sx?: SxProps,
    fullNameAppears?: boolean
}

export default function AMLogo({ sx, fullNameAppears }: AMLogoProps) {
    const { palette: { mode } } = useTheme()

    const darkModeLogo = fullNameAppears ? whiteFullLogo : whiteLogo
    const lightModeLogo = fullNameAppears ? blackFullLogo : blackLogo

    const logoWidth = fullNameAppears ? "104px" : "100px"
    const logoHeight = fullNameAppears ? "50px" : "40px"

    return (
        <Avatar
            src={mode == "dark" ? darkModeLogo : lightModeLogo}
            alt='AM-Store-Logo.png'
            sx={{
                width: logoWidth,
                height: logoHeight,
                userSelect: "none",
                p: 0.5,
                borderRadius: 0,
                bgcolor: "transparent",
                ...sx
            }}
        />
    )
}
