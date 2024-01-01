import { Avatar, Box, Paper, SxProps } from '@mui/material';
import { P } from '../P';
import React, { JSX } from 'react'

interface MessageCardProps {
    userName: string,
    avatar?: string,
    message: string,
    timeAgo?: string,
    children?: any,
    cardStyle?: SxProps
    cardId?: string
    preventDefaultAvatar?: boolean
}

export default function MessageCard({ userName, timeAgo, avatar, children, message, cardStyle, cardId, preventDefaultAvatar }: MessageCardProps) {
    return (
        <Paper id={cardId} className="flex-column gap1" sx={cardStyle}>
            <Box className="flex-row gap1 full-width" sx={{ p: 1.7 }}>
                <Avatar sx={{ height: 35, width: 35, mt: "6px" }} alt='logo' src={avatar}>
                    {!preventDefaultAvatar ? undefined : userName[0]}
                </Avatar>
                <Box className="flex-column gap1">
                    <P variant='subtitle2'>
                        {userName}
                        <P component="span" sx={{ fontSize: "12px", ml: 1 }}>
                            {timeAgo}
                        </P>
                    </P>
                    <P variant='body2'>{message}</P>
                    {children}
                </Box>
            </Box>
        </Paper>
    );
}

