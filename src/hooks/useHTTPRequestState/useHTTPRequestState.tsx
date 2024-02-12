import { useState } from 'react'

export default function useHTTPRequestState() {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    return {
        isLoading,
        setIsLoading,
        isSuccess,
        setIsSuccess,
        isError,
        setIsError
    }
}
