import React from 'react';
import { alpha, SxProps, TypographyVariant, Palette, PaletteColor } from '@mui/material';
import { P } from '../P';

interface highlightedWord {
    highlightColor: string | "success" | "info" | "primary" | "error" | "warning",
    style?: SxProps,
    children: string,
    variant?: TypographyVariant
}

export default function HighlightedWord({ highlightColor, style, children, variant }: highlightedWord) {
    return (
        <P
            variant={variant}
            sx={{
                p: "1px 8px",
                color: "white",
                borderRadius: 1,
                bgcolor: ({ palette }) => {
                    const color = palette[highlightColor as keyof Palette] as PaletteColor | undefined;
                    if (color?.main) {
                        return alpha(color.main, .65)
                    } else {
                        try { return alpha(highlightColor, .65) }
                        catch { return undefined }
                    }
                },
                ...style
            }}>
            {children}
        </P>
    )
}
