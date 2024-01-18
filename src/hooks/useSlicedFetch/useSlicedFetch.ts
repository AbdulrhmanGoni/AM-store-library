import { useEffect, useState } from "react";
import useRequestHeaders from "./useRequestHeaders";
import axios from "axios";

interface UseSlicedFetchOptions {
    defaultSliceSize?: number,
    defaultSliceNumber?: number,
    queryParams?: string,
    itemsIdPropertyName?: string,
    autoFetchingFirstSlice?: boolean
}

export default function useSlicedFetch<T>(url: string, contentName: string, options?: UseSlicedFetchOptions) {

    const {
        defaultSliceSize = 10,
        defaultSliceNumber = 0,
        queryParams = "",
        itemsIdPropertyName,
        autoFetchingFirstSlice
    } = options ?? {};

    const [items, setItems] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [thereIsNoMore, setThereIsNoMore] = useState<boolean>(false);
    const [refetched, setRefetch] = useState<number>(0);
    const [sliceNumber, setSliceNumber] = useState<number>(defaultSliceNumber);
    const [newItemsList, setNewItemsList] = useState<string[]>([]);
    const [fetchedSlices, setFetchedSlices] = useState<number>(0);

    const requestHeaders = useRequestHeaders();

    useEffect(() => {
        if (sliceNumber > fetchedSlices && !thereIsNoMore) {
            const sliceParams = `sliceNumber=${sliceNumber}&sliceSize=${defaultSliceSize}`;
            const queries = `${queryParams}&${sliceParams}`;

            setIsLoading(true);
            axios.get(`${url}?${queries}`, { headers: requestHeaders })
                .then((response) => {
                    const { [contentName]: items, thereIsMore } = response.data
                    if (items) {
                        if (items?.length) {
                            if (itemsIdPropertyName) {
                                setItems((state) =>
                                    state.concat(items.filter((com: T | any) =>
                                        !newItemsList.includes(com[itemsIdPropertyName])
                                    ))
                                )
                            } else {
                                setItems((state) => [...state, ...items])
                            }
                            setFetchedSlices(state => ++state)
                        }
                        !thereIsMore && setThereIsNoMore(true);
                        !isSuccess && setIsSuccess(true);
                        isError && setIsError(false);
                    } else {
                        isSuccess && setIsSuccess(false);
                        !isError && setIsError(true);
                    }
                })
                .catch(() => {
                    isSuccess && setIsSuccess(false);
                    !isError && setIsError(true);
                })
                .finally(() => { setIsLoading(false) })
        }
    }, [sliceNumber, refetched])

    useEffect(() => { autoFetchingFirstSlice && setSliceNumber(1) }, []);

    function getNextSlice() { !thereIsNoMore && setSliceNumber(state => ++state); }
    function refetch() { setRefetch(state => state); }

    function addNewItem(item: T, itemId: string) {
        setItems((state) => [item, ...state]);
        itemId && setNewItemsList(state => [itemId, ...state]);
    }

    function deleteItem(itemId: string, itemsIdPropertyName: string) {
        setItems((state) => {
            if (itemsIdPropertyName) {
                return state.filter((item: T | any) => item[itemsIdPropertyName] !== itemId)
            } else {
                return state.filter((item: T | any) => item.id !== itemId)
            }
        })
    }

    return {
        data: items,
        isError,
        isLoading,
        isSuccess,
        getNextSlice,
        refetch,
        addNewItem,
        deleteItem
    };
}
