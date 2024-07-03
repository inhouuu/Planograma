'use client'
import './style.scss'
import { useContext, lazy, useEffect, useRef } from 'react';
import { ContextApi, bridge } from '@/context/contextApi';
import EditorVisual from '@/components/visual_editor/page'
import Boards from '@/components/boards/page'

export default function Id({ params }: any) {
    //CALLBACK DO PATH 
    bridge(params.id);

    const refMain: any = useRef();

    function resizeMain() {
        const domHeader: any = document.querySelector('header')
        refMain.current.style.height = '100%';
        refMain.current.style.height = `${(refMain.current.clientHeight - domHeader?.clientHeight)}px`;
    }

    useEffect(() => {
        resizeMain();
        window.onresize = function () {
            resizeMain();
        }
    }, [])

    return (
        <main ref={refMain}>
            {/* <Boards response={params} /> */}
            <EditorVisual response={params} />
        </main>
    )
}