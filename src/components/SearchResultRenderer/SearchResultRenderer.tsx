import React from 'react';
import { Box, List, Typography, ListItem, ListItemButton } from '@mui/material';
import { SearchFieldProps, searchResponse } from '../SearchForProductsField';


interface SearchResultRendererProps extends SearchFieldProps {
    products: searchResponse[],
    searchText: string,
    actionWithProductId: (id: string) => void
}

export default function SearchResultRenderer(props: SearchResultRendererProps) {

    const { products, searchText, actionWithProductId, endItemIcon } = props

    const mark = (text?: string) => (
        <Typography
            component="mark"
            sx={{ bgcolor: "primary.main", color: "text.primary" }}
        >
            {text ?? ""}
        </Typography>
    )

    const listHeight = products.length > 6 ? 290 : products.length * 40;

    return (
        <Box
            sx={{
                width: '100%', height: listHeight,
                bgcolor: 'background.paper',
                position: "absolute",
                left: 0, top: "100%", zIndex: 100
            }}
        >
            <List disablePadding sx={{
                width: "100%",
                height: listHeight,
                overflow: "auto"
            }}>
                {
                    products?.map(({ _id, title }) => {
                        let regExp = new RegExp(searchText.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"), "ig");
                        const
                            matched = title.match(regExp),
                            splitedText = title.split(regExp);

                        return (
                            <ListItem key={_id} component="div" disablePadding>
                                <ListItemButton onClick={() => actionWithProductId(_id)} sx={{ justifyContent: "space-between", }}>
                                    <Typography component="p">
                                        {splitedText.map((str, index) =>
                                            <Typography component="span" key={str + index}>
                                                {str}{index !== splitedText.length - 1 && mark(matched?.[index])}
                                            </Typography>
                                        )}
                                    </Typography>
                                    {endItemIcon}
                                </ListItemButton>
                            </ListItem>
                        )
                    })
                }
            </List>
        </Box>
    );
}