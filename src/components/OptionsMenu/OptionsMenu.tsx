import React, { ReactNode, createContext, useState, JSX } from 'react';
import { Box, IconButton, Menu, SxProps } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import MenuOption, { MenuOptionProps } from './MenuOption';

interface OptionsMenuProps {
    style?: SxProps,
    children?: ReactNode,
    preventDefaultStyle?: boolean
}

export const OptionsMenuContext = createContext(() => { })

function OptionsMenu({ style, preventDefaultStyle, children }: OptionsMenuProps) {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);

    function closeMenu() { setAnchorEl(null) }

    const styleIcon: SxProps = preventDefaultStyle ? {} : { right: 4, top: 4, position: "absolute", ...style }

    return (
        <Box sx={styleIcon}>
            <IconButton
                aria-controls={open ? 'options-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={(e) => setAnchorEl(e.currentTarget)}
                size='small'
            >
                <MoreVert fontSize='small' />
            </IconButton>
            <OptionsMenuContext.Provider value={closeMenu}>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={closeMenu}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    sx={{ "& li": { gap: 1 } }}
                >
                    {children}
                </Menu>
            </OptionsMenuContext.Provider>
        </Box>
    );
}

OptionsMenu.Option = MenuOption as ({ asyncAction, optionText, optionIcon }: MenuOptionProps) => JSX.Element

export default OptionsMenu
