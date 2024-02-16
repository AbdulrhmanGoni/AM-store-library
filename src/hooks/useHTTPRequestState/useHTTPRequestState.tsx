import { useState } from 'react'

type StateOptions = {
    initialLoading: boolean,
    initialError: boolean,
    initialSuccess: boolean,
}

export default function useHTTPRequestState<T>(initialData?: T, options?: StateOptions) {

    const [isLoading, setIsLoading] = useState<boolean>(options?.initialLoading || false);
    const [isError, setIsError] = useState<boolean>(options?.initialError || false);
    const [isSuccess, setIsSuccess] = useState<boolean>(options?.initialSuccess || false);
    const [data, setData] = useState<T | undefined>(initialData);

    return {
        data,
        setData,
        isLoading,
        setIsLoading,
        isSuccess,
        setIsSuccess,
        isError,
        setIsError
    }
}
