'use client'
import { useContext, useRef } from 'react';
import './style.scss';
import { GlobalContext } from '@/context/contextGlobals';

export default function EditModules() {
    let { colorsPalette, setPlanToggle, planToggle, formSelect, setSupCoords, supCoords, setColor, color }: any = useContext(GlobalContext);

    const refEditModules: any = useRef();
    let modules: number = 0;

    //CENTRALIZAR ITEM ABSOLUTO
    return (
        <div className="backdrop" ref={refEditModules} style={planToggle ? { opacity: '1', visibility: 'visible' } : { opacity: '0', visibility: 'hidden' }}>
            <div className='center' style={planToggle ? { bottom: '0%' } : { bottom: '100%' }}>
                <div className='edit'>
                    <div className='editHeader'>
                        {formSelect.type == 'form' ? <h2>Forma</h2> : null}
                        {formSelect.type == 'plant' ? <h2>Planta</h2> : null}
                        {formSelect.type == 'product' ? <h2>Produto</h2> : null}
                        <button className='editClose material-symbols-outlined' onClick={() => setPlanToggle(false)}>
                            close
                        </button>
                    </div>

                    <div className='editMain'>
                        <div className='inputLine'>
                            <div className='data_field'>
                                <span className='name'>Nome</span>
                                <input type='text' id='textName' autoComplete="off" max={10} defaultValue={''} onChange={(event: any) => {
                                    formSelect.name = event.target.value;
                                }}></input>
                            </div>
                            <div className='data_field'>
                                <span className='name'>Descrição</span>
                                <input type='text' id='textDesc' autoComplete="off" max={20} onChange={(event: any) => {
                                    formSelect.desc = event.target.value;
                                }}></input>
                            </div>
                            <div className='data_field'>
                                <span className='name'>Tipo</span>
                                <input type='text' id='textTipo' autoComplete="off" defaultValue={formSelect.type} disabled></input>
                            </div>


                            {formSelect.type == 'plant' ? <>
                                < div className='data_field'>
                                    <span className='name'>Nº Módulos</span>
                                    <input type='number' id='textNmodulos' autoComplete="off" onChange={(event: any) => {
                                        formSelect.nModules = event.target.value;
                                    }}></input>
                                </div>
                            </> : null}

                            {formSelect.type == 'plant' ? <>
                                <div className='data_field'>
                                    <span className='name'>Orientação</span>
                                    <input type='text' id='textOrient' autoComplete="off" onChange={(event: any) => {
                                        formSelect.display = event.target.value;
                                    }}></input>
                                </div>
                            </> : null}
                        </div>

                        {/* PALETA DE CORES */}
                        <div id='palette_color'>
                            <h3>Escolher Cor</h3>
                            <div className='group_colors'>
                                {colorsPalette[0] ? Object.values(colorsPalette[0]).map((value: any, idx: any) => (
                                    <div className='color' style={{ 'backgroundColor': value }} onClick={() => { formSelect.color = value }} key={idx}>
                                        <div className='arrow'>
                                            <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4.84011 8.12776L12.0034 0.963891L12.0034 0.963884C12.1403 0.826935 12.3261 0.75 12.5198 0.75C12.7134 0.75 12.8992 0.826936 13.0361 0.963883L12.86 1.13997L13.0361 0.963884C13.1731 1.10083 13.25 1.28657 13.25 1.48025C13.25 1.67392 13.1731 1.85966 13.0361 1.99661L5.35656 9.67617L5.35646 9.67627L4.84011 8.12776ZM4.84011 8.12776L1.99662 5.28371L1.99661 5.28369C1.85966 5.14674 1.67392 5.06981 1.48025 5.06981C1.28657 5.06981 1.10083 5.14674 0.963884 5.28369C0.826936 5.42064 0.75 5.60638 0.75 5.80005C0.75 5.99373 0.826936 6.17947 0.963884 6.31641L4.32363 9.67617L4.32373 9.67627L4.50051 9.49949L4.84011 8.12776Z" fill="white" stroke="white" strokeWidth="0.5" />
                                            </svg>
                                        </div>
                                    </div>
                                )) : null}
                            </div>
                        </div>

                        {formSelect.type == 'plant' || formSelect.type == 'product' ? <>
                            <div className='measure'>
                                <h3>Estrutura</h3>
                                <div className='fields'>
                                    <div className='field'>
                                        <span className="material-symbols-outlined arrow_range icon">arrow_range</span>
                                        <div className='data_field'>
                                            <span className='name'>Altura(m)</span>
                                            <input type='number' id='textH' autoComplete="off" onChange={(event: any) => {
                                                formSelect.height = event.target.value;
                                            }}></input>
                                        </div>
                                    </div>

                                    <div className='field'>
                                        <span className="material-symbols-outlined icon">arrow_range</span>
                                        <div className='data_field'>
                                            <span className='name'>Largura(m)</span>
                                            <input type='number' id='textW' autoComplete="off" onChange={(event: any) => {
                                                formSelect.width = event.target.value;
                                            }}></input>
                                        </div>
                                    </div>

                                    <div className='field'>
                                        <span className="material-symbols-outlined icon">deployed_code</span>
                                        <div className='data_field'>
                                            <span className='name'>Comprimento(m)</span>
                                            <input type='number' id='textD' autoComplete="off" onChange={(event: any) => {
                                                formSelect.deep = event.target.value;
                                            }}></input>
                                        </div>
                                    </div>

                                    <div className='field'>
                                        <span className="material-symbols-outlined icon">deployed_code</span>
                                        <div className='data_field'>
                                            <span className='name'>Divisória(m)</span>
                                            <input type='number' id='textD' onChange={(event: any) => {
                                                formSelect.div = event.target.value;
                                            }}></input>
                                        </div>
                                    </div>

                                    <div className='field'>
                                        <span className="material-symbols-outlined icon">deployed_code</span>
                                        <div className='data_field'>
                                            <span className='name'>Roda Pé(m)</span>
                                            <input type='number' id='textD' onChange={(event: any) => {
                                                formSelect.footer = event.target.value;
                                            }}></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </> : null}

                        {formSelect.type == 'plant' || formSelect.type == 'product' ? <>
                            <div className='measure'>
                                <h3>Módulos</h3>
                                <div className='fields2'>
                                    {[...Array(7)].map(() => (
                                        <>
                                            <div className='boxField'>
                                                <div className='field'>
                                                    <span className="material-symbols-outlined arrow_range icon">arrow_range</span>
                                                    <div className='data_field'>
                                                        <span className='name'>Altura(m)</span>
                                                        <input type='number' id='textH' autoComplete="off" onChange={(event: any) => {
                                                            formSelect.height = event.target.value;
                                                        }}></input>
                                                    </div>
                                                </div>

                                                <div className='field'>
                                                    <span className="material-symbols-outlined icon">arrow_range</span>
                                                    <div className='data_field'>
                                                        <span className='name'>Largura(m)</span>
                                                        <input type='number' id='textW' autoComplete="off" onChange={(event: any) => {
                                                            formSelect.width = event.target.value;
                                                        }}></input>
                                                    </div>
                                                </div>

                                                <div className='field'>
                                                    <span className="material-symbols-outlined icon">deployed_code</span>
                                                    <div className='data_field'>
                                                        <span className='name'>Comprimento(m)</span>
                                                        <input type='number' id='textD' autoComplete="off" onChange={(event: any) => {
                                                            formSelect.deep = event.target.value;
                                                        }}></input>
                                                    </div>
                                                </div>

                                                {/* <div className='field'>
                                                <span className="material-symbols-outlined icon">deployed_code</span>
                                                <div className='data_field'>
                                                    <span className='name'>Divisória(m)</span>
                                                    <input type='number' id='textD' onChange={(event: any) => {
                                                        formSelect.div = event.target.value;
                                                    }}></input>
                                                </div>
                                            </div>

                                            <div className='field'>
                                                <span className="material-symbols-outlined icon">deployed_code</span>
                                                <div className='data_field'>
                                                    <span className='name'>Roda Pé(m)</span>
                                                    <input type='number' id='textD' onChange={(event: any) => {
                                                        formSelect.footer = event.target.value;
                                                    }}></input>
                                                </div>
                                            </div> */}
                                            </div>
                                        </>
                                    ))}
                                </div>
                            </div>
                        </> : null}

                    </div>

                    <div className='editFooter'>
                        <button id='save' onClick={() => {
                            let newCoord: any = []
                            if (!formSelect.id) {
                                formSelect.blocoId = 'block' + new Date().getTime();
                                for (let i = 0; i < formSelect.nModules; i++) {
                                    newCoord.push({
                                        ...formSelect,
                                        height: (formSelect.height / formSelect.nModules),
                                        id: (new Date().getTime() + i),
                                    })
                                }
                                supCoords.map((e: any) => newCoord.push(e));
                            } else {
                                newCoord = supCoords.map((e: any) => {
                                    if (e.id == formSelect.id) {
                                        e = formSelect;
                                    }
                                    return e;
                                })
                            }
                            console.log('newCoord', newCoord);
                            setPlanToggle(false);
                            setSupCoords(newCoord);
                        }}>
                            <span>Salvar</span>
                            <span className="material-symbols-outlined">
                                save
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}