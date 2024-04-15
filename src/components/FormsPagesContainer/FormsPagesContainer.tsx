import React, { ReactNode, JSX } from 'react';
import { Box, Paper, Container, useTheme, SxProps } from '@mui/material';
import AMLogo from '../AMLogo';
import { P } from '../P';
import { darkBg, lightBg } from '../../images';

interface FormsPagesContainer {
    children: ReactNode,
    sx?: SxProps,
    title: string,
    icon: JSX.Element
}

export default function FormsPagesContainer({ title, icon, sx, children }: FormsPagesContainer) {

    const { palette: { mode } } = useTheme();

    return (
        <Box className="flex-column-center full-width"
            sx={{
                backgroundImage: `url(${mode === "light" ? lightBg : darkBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
                color: "white",
                ...sx
            }}>
            <Container maxWidth="xs" sx={{ pt: 2 }}>
                <Paper
                    className="flex-column-center"
                    sx={{
                        p: { xs: 1.5, sm: 2 },
                        bgcolor: "transparent",
                        boxShadow: "0 0 13px -5px black",
                        backgroundImage: mode === "dark" ? "linear-gradient(rgb(51 51 51 / 30%), rgb(51 51 51 / 30%))" : undefined
                    }}
                >
                    <AMLogo fullNameAppears sx={{ m: "12px auto", width: "150px", height: "100%" }} />
                    <Box className="flex-row-center gap1">
                        <P component="h1" variant="h5">{title}</P>
                        {icon}
                    </Box>
                    {children}
                </Paper>
            </Container>
        </Box>
    )
}
