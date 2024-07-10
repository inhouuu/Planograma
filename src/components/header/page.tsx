'use client'
import './style.scss';
import Image from 'next/image';
import { GlobalContext } from '@/context/contextGlobals';
import { useContext } from 'react';
//IMAGEM
import imgPerfil from '@/icons/finn perfil.png';

export default function Header({ response }: any) {
    let { setModalToggle, modalToggle }: any = useContext(GlobalContext);

    //DOM ELEMENTO MAIN
    return (
        <header>
            <div className='contentLeft'>
                <div className='logo'>
                    PLANOGRAMA
                </div>

                <div className='itemsHeader'>
                    <ul>
                        <li>
                            Slot
                        </li>

                        <li>
                            Slot
                        </li>

                        <li onClick={() => setModalToggle(true)}>
                            Editar Módulos
                        </li>

                        <li>
                            Configuração
                        </li>
                    </ul>
                </div>
            </div>

            <div className='perfil'>
                <div className='perfiName'>
                    {/* NOME */}
                    <span>Name Surname</span>

                    {/* CARGO */}
                    <span>Admin</span>
                </div>

                <Image className='perfilPicture' src={imgPerfil} alt='imgPerfil' />
            </div>
        </header>
    )
}