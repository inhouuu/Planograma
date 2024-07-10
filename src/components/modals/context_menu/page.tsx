'use client'
import { useContext } from 'react';
import './style.scss'
import { GlobalContext } from '@/context/contextGlobals';

const context_menu = () => {
  const { formSelect, setFormSelect, setCtxMenu, ctxMenu }: any = useContext(GlobalContext);
  console.log('formSelect', formSelect);
  return (
    <div className='context_menu' style={ctxMenu}>
      asd
    </div>
  )
}

export default context_menu;