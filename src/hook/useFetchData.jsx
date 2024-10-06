import React, { useEffect, useState } from 'react'

export default function useFetch(url) {
    const [value, setValue] = useState(null);
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            // setLoader(true);

            try {
                const response = await fetch(url);
                console.log(url);

                if (!response.ok) {
                    throw new Error('network response error')
                }
                const result = await response.json();
                console.log(result);
                setValue(result);
            }
            catch (error) {
                setError(error.message);
            }
            finally {
                setLoader(false);
            }
        }

        fetchData();
    }, [url])

    return { value, error, loader }
}
