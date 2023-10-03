import React, { useState, JSX, useEffect } from 'react';
import { Box, CircularProgress, IconButton, IconButtonProps, TextField } from '@mui/material'
import SearchResultRenderer from "../SearchResultRenderer"
import { Close, Replay } from '@mui/icons-material';


export interface searchResponse { _id: string, title: string }
export interface SearchFieldProps {
    actionWithProductId: (id: string) => void,
    endItemIcon: JSX.Element,
    dominName?: string,
    fieldSize?: "small" | "medium",
}

export default function SearchField({ actionWithProductId, endItemIcon, dominName, fieldSize }: SearchFieldProps) {

    const [searchInput, setSearchInput] = useState<string>("");
    const [searchKey, setSearchKey] = useState<string>("");
    const [products, setProducts] = useState<searchResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    function onChange(value: string) {
        value[0] !== searchKey && setSearchKey(value[0])
        !value && clearSearchField()
        setSearchInput(value)
    }

    function fetchProducts(searchKey: string) {
        setIsLoading(true);
        fetch(`${dominName}products?title=${searchKey}&returnType=title`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                isError && setIsError(false);
            })
            .catch(() => { setIsError(true) })
            .finally(() => { setIsLoading(false) })
    }

    function clearSearchField() {
        setSearchInput("");
        setSearchKey("");
        setProducts([]);
    }

    function filterProducts(productsList: searchResponse[]): searchResponse[] {
        let regExp = searchInput.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
        return productsList.filter(product => product.title.match(new RegExp(regExp, "ig")))
    }

    useEffect(() => { searchKey && fetchProducts(searchKey); }, [searchKey])

    const rightIconStyle = { position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)" }
    const iconSize = fieldSize === "small" ? { width: "0.85em", height: "0.85em" } : {}
    const iconsProps: IconButtonProps = {
        sx: {
            display: isError || !!searchInput ? "flex" : "none",
            ...rightIconStyle, right: 4
        },
        size: "small"
    }

    return (
        <Box sx={{ display: "flex", gap: 1, position: "relative", width: "100%" }}>
            <TextField
                onChange={({ target }) => { onChange(target.value) }}
                inputProps={{ sx: { p: "8.5px 40px 8.5px 14px" } }}
                fullWidth
                label="Search for products"
                id='searchProductsField'
                value={searchInput}
                error={isError}
                size={fieldSize}
            />
            {
                isLoading ?
                    <Box sx={{ display: "flex", ...rightIconStyle }}><CircularProgress size={20} /></Box>
                    : isError ?
                        <IconButton
                            onClick={() => { fetchProducts(searchKey) }}
                            {...iconsProps}
                        >
                            <Replay sx={iconSize} color="warning" />
                        </IconButton>
                        : !!searchInput ?
                            <IconButton
                                onClick={() => { clearSearchField() }}
                                {...iconsProps}
                            >
                                <Close sx={iconSize} />
                            </IconButton>
                            : null
            }
            {
                (!!products.length && !!searchInput) &&
                <SearchResultRenderer
                    actionWithProductId={actionWithProductId}
                    products={filterProducts(products)}
                    searchText={searchInput}
                    endItemIcon={endItemIcon}
                />
            }
        </Box>
    )
}