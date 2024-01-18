import React, { ReactNode, useContext } from 'react'
import { CircularProgress, MenuItem } from '@mui/material'
import useHTTPRequestState from '../../hooks/useHTTPRequestState'
import { OptionsMenuContext } from './OptionsMenu';

export interface MenuOptionProps {
    asyncAction?: () => Promise<void>,
    action?: () => void,
    optionText: string,
    optionIcon?: ReactNode
}

export default function MenuOption({ asyncAction, action, optionText, optionIcon }: MenuOptionProps) {

    const {
        isLoading,
        setIsLoading
    } = useHTTPRequestState();

    const closeMenu = useContext(OptionsMenuContext)

    const handleAction = async () => {
        setIsLoading(true);
        action?.();
        await asyncAction?.();
        setIsLoading(false);
        closeMenu();
    };

    return (
        <MenuItem onClick={handleAction}>
            {isLoading ? <CircularProgress size={20} /> : optionIcon} {optionText}
        </MenuItem>
    )
}
