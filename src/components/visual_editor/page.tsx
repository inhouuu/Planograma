'use client'

import './style.scss'
import { useEffect, useRef } from 'react';
import Superior from './superior/page'
import Frontal from './frontal/page'
import Tools from '@/components/tools/page'

export default function VisualEditor({ response }: any) {
    //DOM ELEMENTO MAIN
    const refMain: any = useRef();

    return (
        <div ref={refMain} className='boxEdit'>
            <Tools />
            <div id='editor_visual'>
                {response.id == 'superior' ? <Superior superior={response.superior} modulos={response.modulos} /> : null}
                {/* {response == 'modulos' ? <Frontal superior={response.superior} modulo={response.modulos} /> : null} */}
            </div>
        </div>
    )
}