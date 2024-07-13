"use client"

import './style.scss'
import { useRef, useState, useEffect, useContext } from "react";
import { ContextApi } from '@/context/contextApi';
import { GlobalContext } from '@/context/contextGlobals';

//ICONS
import Logo from '@/icons/logo.svg'

export default function Header() {
    const [toggleForm, setToggleForm] = useState<boolean>(false);
    const [formSelect, setFormSelect] = useState<boolean>(false);
    const [toggleFile, setToggleFile] = useState<boolean>(false);
    const [toggleMenu, setToggleMenu] = useState<boolean>(false);
    const [attEvent, setAttEvent]: any = useState(false);
    const [color, setColor]: any = useState('');
    const { data }: any = useContext(ContextApi);
    const { form, setForm, setHide, hide, setSave, setAction, colorsPalette }: any = useContext(GlobalContext);


    const refTools: any = useRef();

    function resizeMain() {
        const domHeader: any = document.querySelector('header')
        refTools.current.style.height = '100%';
    }

    useEffect(() => {
        resizeMain();
        window.onresize = function () {
            resizeMain();
        }
    }, [])

    return (
        <>
            <aside className='tools' ref={refTools}>
                <div className='items'>
                    <div className={`square ${form == 'square' ? 'select' : null}`} onClick={() => {
                        setForm('square');
                        setAction('form');
                        setFormSelect(false);
                        setToggleForm(false);
                    }}>
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="23" height="23" rx="4.5" stroke="white" />
                        </svg>
                    </div>

                    <div className={`circle ${form == 'circle' ? 'select' : null}`} onClick={() => {
                        setForm('circle');
                        setAction('form');
                        setFormSelect(false);
                        setToggleForm(false);
                    }}>
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="white" />
                        </svg>
                    </div>

                    <div className={`pencil ${form == 'pencil' ? 'select' : null}`} onClick={() => {
                        setForm('pencil');
                        setAction('form');
                        setFormSelect(false);
                        setToggleForm(false);
                    }}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.1775 22.5789C3.23348 22.4824 3.30295 22.3941 3.40088 22.2857L21.2093 4.794M3.1775 22.5789C3.12298 22.6729 3.08124 22.7748 3.03846 22.911L1.37751 29.2709M3.1775 22.5789L9.32223 29.1014M9.32223 29.1014C9.2214 29.1568 9.10979 29.1875 8.9354 29.228L2.72154 30.6712M9.32223 29.1014C9.41483 29.0506 9.49834 28.9789 9.61302 28.8595C11.2013 27.206 19.7423 18.3145 27.0738 10.682M21.2093 4.794L24.6831 1.38196C25.3095 0.856591 25.5784 0.905649 26.0448 1.33132L30.4486 5.66269C31.1951 6.38131 31.1724 6.38476 30.4486 7.16875C29.3762 8.28516 28.2403 9.46766 27.0738 10.682M21.2093 4.794L27.0738 10.682M1.37751 29.2709L1.01183 30.6712C0.967758 30.9613 1.03772 31.0388 1.37751 30.9833L2.72154 30.6712M1.37751 29.2709L2.72154 30.6712" stroke="white" />
                        </svg>
                    </div>

                    <div className={`palette ${form == 'palette' ? 'selectPalette' : null}`} onClick={() => { setAction('palette'); form != 'palette' ? setForm('palette') : null }}>
                        <span className="material-symbols-outlined" style={{ color: color }}>format_color_fill</span>
                        <div className='colors'>
                            {colorsPalette[0] ? Object.values(colorsPalette[0]).map((value: any, idx: any) => (
                                <div className='color' style={{ 'backgroundColor': value }} onClick={() => { setColor(value); setForm('') }} key={idx}>
                                </div>
                            )) : null}
                        </div>
                    </div>

                    <div className={`move ${form == 'move' ? 'select' : null}`} onClick={() => { setAction('move'); setForm('move') }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 26 26" fill="none">
                            <path d="M4.69231 9.29785L1 12.9902L4.69231 16.6825" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M21.3076 9.29785L24.9999 12.9902L21.3076 16.6825" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M1 13H25" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9.61523 4.69231L13.3075 1L16.9998 4.69231" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M13.3076 25V1" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M16.9998 21.3076L13.3075 24.9999L9.61523 21.3076" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
            </aside >
        </>
    )
}
