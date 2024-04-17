import React, { useState, JSX, useEffect, useRef } from 'react';
import { Box, CircularProgress, IconButton, IconButtonProps, TextField } from '@mui/material'
import SearchResultRenderer from "./SearchResultRenderer"
import { Close, Replay } from '@mui/icons-material';

export interface searchResponse { _id: string, title: string }
export interface SearchFieldProps {
    actionWithProductId: (id: string) => void,
    endItemIcon: JSX.Element,
    hostName?: string,
    defaultValue?: string,
    onEnter?: (searchInput: string) => void,
    fieldSize?: "small" | "medium",
    disableResultsList?: boolean,
    additionalFilter?: string,
    closeOnClick?: boolean
}

let timeoutId: NodeJS.Timeout | undefined;
let abortController: AbortController | undefined;

export default function SearchForProductsField(props: SearchFieldProps) {

    const {
        actionWithProductId,
        endItemIcon,
        hostName,
        fieldSize,
        onEnter,
        defaultValue,
        disableResultsList,
        additionalFilter,
        closeOnClick
    } = props;

    const inputRef = useRef<HTMLInputElement | undefined>();
    const [searchInput, setSearchInput] = useState<string>("");
    const [notFoundOn, setNotFoundOn] = useState<string>("");
    const [products, setProducts] = useState<searchResponse[]>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [ableResultsList, setAbleResultsList] = useState<boolean>(true);

    function fetchProducts(searchInput: string, signal?: AbortSignal) {
        setIsLoading(true);
        fetch(`${hostName}/products?title=${searchInput}&type=title&limit=25&${additionalFilter}`, { signal })
            .then((res) => {
                if (res.status === 200) return res.json();
                else return null;
            })
            .then((data) => {
                if (data) {
                    if (!data.length) {
                        setNotFoundOn(searchInput)
                    }
                    setProducts(data)
                    isError && setIsError(false);
                } else setIsError(true)
            })
            .catch((error) => {
                if (!error?.message?.match("aborted")) {
                    setIsError(true)
                }
            })
            .finally(() => { setIsLoading(false) })
    }

    function debounce() {
        if (searchInput && searchInput.slice(0, notFoundOn.length || 1) !== notFoundOn) {
            clearTimeout(timeoutId);
            abortController?.abort();
            abortController = new AbortController();
            timeoutId = setTimeout(() => {
                fetchProducts(searchInput, abortController?.signal);
            }, 500);
        }
    }

    function clearSearchField() {
        abortController?.abort();
        abortController = undefined;
        timeoutId = undefined;
        setSearchInput("");
        setProducts(undefined);
    }

    function filterProducts(productsList: searchResponse[]): searchResponse[] {
        const regExp = searchInput.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
        return productsList.filter(product => product.title.match(new RegExp(regExp, "ig")))
    }

    useEffect(() => {
        if (!(ableResultsList && !disableResultsList)) {
            setAbleResultsList(!disableResultsList)
        }
    }, [])

    useEffect(() => {
        if (!(ableResultsList && !disableResultsList)) {
            setAbleResultsList(!disableResultsList)
        }
    }, [disableResultsList])

    useEffect(() => {
        if (defaultValue) {
            setSearchInput(defaultValue)
        }
    }, [defaultValue])

    const rightIconStyle = { position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)" }
    const iconSize = fieldSize === "small" ? { width: "0.85em", height: "0.85em" } : {}
    const iconsProps: IconButtonProps = {
        sx: {
            display: isError || !!searchInput ? "flex" : "none",
            ...rightIconStyle, right: 4
        },
        size: fieldSize
    }

    return (
        <Box sx={{ display: "flex", gap: 1, position: "relative", width: "100%" }}>
            <TextField
                onKeyUp={debounce}
                onChange={({ target }) => {
                    products && setProducts(undefined);
                    setSearchInput(target.value);
                }}
                inputProps={{ sx: { pr: "40px" } }}
                label="Search for products"
                inputRef={inputRef}
                id='searchProductsField'
                value={searchInput}
                error={isError}
                size={fieldSize}
                fullWidth
                onFocus={() => {
                    !disableResultsList && !ableResultsList && setAbleResultsList(true)
                }}
                onKeyDown={(event) => {
                    if (event.key === "Enter" || event.code === "Enter") {
                        const input = event.target as HTMLInputElement
                        onEnter?.(input.value)
                    }
                }}
            />
            {
                isLoading ?
                    <Box sx={{ display: "flex", ...rightIconStyle }}>
                        <CircularProgress color={!isError ? "primary" : "error"} size={20} />
                    </Box>
                    : isError ?
                        <IconButton
                            onClick={() => { fetchProducts(searchInput, abortController?.signal) }}
                            {...iconsProps}
                        >
                            <Replay sx={iconSize} color="error" />
                        </IconButton>
                        : searchInput ?
                            <IconButton
                                onClick={() => { clearSearchField() }}
                                {...iconsProps}
                            >
                                <Close sx={iconSize} />
                            </IconButton>
                            : null
            }
            {
                (ableResultsList && products && !isLoading && !!searchInput) &&
                <SearchResultRenderer
                    actionWithProductId={actionWithProductId}
                    products={filterProducts(products)}
                    searchText={searchInput}
                    endItemIcon={endItemIcon}
                    close={() => {
                        setAbleResultsList(false);
                        inputRef.current?.blur()
                    }}
                    closeOnClick={closeOnClick}
                />
            }
        </Box>
    )
}