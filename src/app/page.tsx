'use client'
import Link from 'next/link';
import './style.scss';
import { useEffect, useRef } from 'react';

export default function Home() {
  let domSend: any = useRef();

  useEffect(() => {
    const mainBody = document.querySelector('main');
    const domHeader = document.querySelector('header');

    if (mainBody && domHeader) {
      if (domSend && domSend.current) {
        domSend.current.style.bottom = `${((mainBody?.clientHeight - (domSend.current.clientHeight)) / 2) + (domHeader.clientHeight / 2)}px`;
        domSend.current.style.left = `${(mainBody?.clientWidth - domSend.current.clientWidth) / 2}px`;
      }
    }
  })

  return (
    <main ref={domSend}>
      <Link href={'superior'} style={{ color: 'white', fontSize: '24px' }}>
        {';) good job!'}
      </Link>
    </main>
  );
}
