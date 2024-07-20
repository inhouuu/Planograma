'use client'

import { createContext, useEffect, useState } from 'react';
export const GlobalContext: any = createContext({});

export const GlobalProvider = ({ children }: any) => {
    const [colorsPalette, setColorsPalette]: any = useState([]);
    const [color, setColor]: any = useState('');
    const [action, setAction]: any = useState('');
    const [form, setForm]: any = useState('');
    // const [save, setSave]: any = useState(false);
    // const [products, setProducts]: any = useState([]);
    // const [hide, setHide]: any = useState(true);
    const [ctxMenu, setCtxMenu]: any = useState({});
    // const [moduloSelect, setModuloSelect]: any = useState({});
    // const [productSelect, setProductSelect]: any = useState({});
    // const [address, setAddress]: any = useState([]);
    // const [productsMask, setProductsMask]: any = useState([]);
    // const [file, setFile]: any = useState({});
    const [supCoords, setSupCoords]: any = useState([]);
    const [formSelect, setFormSelect]: any = useState({});
    const [planToggle, setPlanToggle]: any = useState(false);
    const [descToggle, setDescToggle]: any = useState(true);

    //LER PALLETA DE CORES JSON
    useEffect(() => {
        fetch('/palette_color.json', {
            headers: {
                Accept: 'application/json'
            }
        }).then(res => res.json())
            .then((res: any) => {
                setColorsPalette(res.palette_color)
                console.log('pal', res.palette_color);
                setColor(Object.values(res.palette_color[0])[0])
            })
    }, [])

    //OBJECT EXPORT
    const paramsValues: Object = {
        action,
        setAction,
        colorsPalette,
        color,
        setColor,
        form,
        setForm,
        // save,
        // setSave,
        // products,
        // setProducts,
        // hide,
        // setHide,
        ctxMenu,
        setCtxMenu,
        // setModuloSelect,
        // moduloSelect,
        // productSelect,
        // setProductSelect,
        // address,
        // setAddress,
        // productsMask,
        // setProductsMask,
        // file,
        // setFile,
        supCoords,
        setSupCoords,
        formSelect,
        setFormSelect,
        setPlanToggle,
        planToggle,
        descToggle,
        setDescToggle
    }

    return <GlobalContext.Provider value={paramsValues}>{children}</GlobalContext.Provider>;
}