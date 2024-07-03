'use client'

import { createContext, useEffect, useState } from 'react';
import Loading from '@/components/loading/page';
export const ContextApi: any = createContext({});

export let path: string = '';

export function bridge(params: any) {
    if (params) {
        path = params;
    }
}

export function Auth({ children }: any) {
    const [data, setData]: any = useState('');
    useEffect(() => {
        setData(path);
    }, [!Boolean(path.length)]);

    return (
        <ContextApi.Provider value={{ data }}>
            {/* {!Boolean(data.length) ? <Loading /> : children} */}
            {children}
        </ContextApi.Provider>
    )
}