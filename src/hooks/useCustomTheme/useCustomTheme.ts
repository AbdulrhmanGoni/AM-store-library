import { createTheme, colors } from "@mui/material";
import useCookies from "../useCookies";


export default function useCustomTheme(modeCookieName?: string) {

    const { cookies: { [modeCookieName || ""]: mode }, addCookie } = useCookies();
    const primaryColor = colors.indigo["A400"]
    const lightBackground = { default: "#f6f6f6", paper: "#fff" }
    const darkBackground = { default: "#111936", paper: "#0a1336" }
    const isLightMode = mode === "light"
    const textColor = isLightMode ? "#000" : "#fff"
    const successColor = "#11cb1a"

    function switchTheme() {
        if (modeCookieName) {
            let newNede = mode === "light" ? "dark" : "light"
            addCookie(modeCookieName, newNede)
        }
    }

    const theme = createTheme({
        palette: {
            mode: isLightMode ? "light" : "dark",
            primary: { main: primaryColor },
            action: { hover: "3d5afe4d" },
            background: isLightMode ? lightBackground : darkBackground,
            success: { main: successColor, dark: successColor, light: successColor }
        },
        typography: {
            allVariants: {
                color: textColor
            }
        },
        components: {
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: isLightMode ? lightBackground.paper : darkBackground.paper,
                        color: textColor,
                    }
                }
            }
        }
    })

    Object.assign(theme.palette, { icons: { main: isLightMode ? primaryColor : "#fff" } })

    return {
        switchTheme,
        theme
    }
}
