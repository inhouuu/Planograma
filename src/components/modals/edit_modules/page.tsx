'use client'
import { useContext, useRef } from 'react';
import './style.scss';
import { GlobalContext } from '@/context/contextGlobals';

export default function EditModules({ refMain }: any) {
    let { setModalToggle, modalToggle }: any = useContext(GlobalContext);

    const refEditModules: any = useRef();

    //CENTRALIZAR ITEM ABSOLUTO

    return (
        <div className="backdrop" ref={refEditModules} style={modalToggle ? { opacity: '1', visibility: 'visible' } : { opacity: '0', visibility: 'hidden' }}>
            <div className='center' style={modalToggle ? { bottom: '0%' } : { bottom: '100%' }}>
                <div className='edit'>
                    <div className='editHeader'>
                        <h2>Planta</h2>
                        <button className='editClose material-symbols-outlined' onClick={() => setModalToggle(false)}>
                            close
                        </button>
                    </div>

                    <div className='editMain'>
                        <div className='inputLine'>
                            <div className='data_field'>
                                <span className='name'>Nome</span>
                                <input type='text' id='textName' autoComplete="off"></input>
                            </div>
                            <div className='data_field'>
                                <span className='name'>Descrição</span>
                                <input type='text' id='textName' autoComplete="off"></input>
                            </div>
                            <div className='data_field'>
                                <span className='name'>Tipo</span>
                                <input type='text' id='textName' autoComplete="off"></input>
                            </div>

                            <div className='data_field'>
                                <span className='name'>Nº Módulos</span>
                                <input type='text' id='textName' autoComplete="off"></input>
                            </div>

                            <div className='data_field'>
                                <span className='name'>Orientação</span>
                                <input type='text' id='textName' autoComplete="off"></input>
                            </div>
                        </div>

                        <div className='measure'>
                            <div className='field'>
                                <span className="material-symbols-outlined arrow_range icon">arrow_range</span>
                                <div className='data_field'>
                                    <span className='name'>Altura</span>
                                    <input type='number' id='textH' autoComplete="off"></input>
                                </div>
                            </div>

                            <div className='field'>
                                <span className="material-symbols-outlined icon">arrow_range</span>
                                <div className='data_field'>
                                    <span className='name'>Largura</span>
                                    <input type='number' id='textW' autoComplete="off"></input>
                                </div>
                            </div>

                            <div className='field'>
                                <span className="material-symbols-outlined icon">deployed_code</span>
                                <div className='data_field'>
                                    <span className='name'>Comprimento</span>
                                    <input type='number' id='textD' autoComplete="off"></input>
                                </div>
                            </div>

                            <div className='field'>
                                <span className="material-symbols-outlined icon">deployed_code</span>
                                <div className='data_field'>
                                    <span className='name'>Altura Divisória</span>
                                    <input type='number' id='textD'></input>
                                </div>
                            </div>

                            <div className='field'>
                                <span className="material-symbols-outlined icon">deployed_code</span>
                                <div className='data_field'>
                                    <span className='name'>Roda Pé</span>
                                    <input type='number' id='textD'></input>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className='editFooter'>
                        <button id='save' onClick={() => setModalToggle(false)}>
                            <span>Salvar</span>
                            <span className="material-symbols-outlined">
                                save
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}