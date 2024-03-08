import useCustomTheme from '../../hooks/useCustomTheme';
import { ThemeProvider } from '@emotion/react';
import React, { createContext } from "react";

type SwitchThemeContextType = { switchTheme: () => void, mode: "dark" | "light" }

export const SwitchThemeContext = createContext<SwitchThemeContextType>({ switchTheme() { }, mode: "dark" })

interface CustomThemeProviderProps {
    children: React.ReactNode,
    site: "the-store" | "admin-panel"
}

export default function CustomThemeProvider({ children, site }: CustomThemeProviderProps) {

    const modeCookieName = site === "admin-panel" ? "AM_Store_admind_panel_theme" : "AM_Store_client_site_theme"

    const { theme, switchTheme } = useCustomTheme(modeCookieName);

    return (
        <ThemeProvider theme={theme}>
            <SwitchThemeContext.Provider value={{ switchTheme, mode: theme.palette.mode }}>
                {children}
            </SwitchThemeContext.Provider>
        </ThemeProvider>
    )
}
