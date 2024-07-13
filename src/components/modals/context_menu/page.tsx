'use client'
import { useContext } from 'react';
import './style.scss'
import { GlobalContext } from '@/context/contextGlobals';
import { ContextApi } from '@/context/contextApi';

const context_menu = () => {
  const { formSelect, setFormSelect, setCtxMenu, ctxMenu, setPlanToggle }: any = useContext(GlobalContext);
  const { data }: any = useContext(ContextApi);
  console.log('formSelect', formSelect);
  console.log('data', data);
  return (
    < div className='context_menu' style={ctxMenu} >
      {!!Object.entries(formSelect).length ? <>
        {/* EMPILHAR */}
        {data == 'frontal' ? <>
          < ul >
            <li>
              <span>
                Empilhar
              </span>
              <div className='ctxBtns'>
                <button onClick={() => {
                  // let newMask: any = [];

                  // let minY = Math.min(...productsMask.filter((product: any) => productSelect[0].blocoId === product.blocoId).
                  //   map((a: any) => {
                  //     return a.y;
                  //   }));


                  // productsMask.map((product: any) => {
                  //   if (!(productSelect[0].blocoId === product.blocoId && minY === product.y)) {
                  //     newMask.push(product);
                  //   }
                  // })

                  // //QUANTIDADE DE EMPILHAMENTO
                  // newMask.map((nMask: any) => {
                  //   if (productSelect[0].blocoId === nMask.blocoId) {
                  //     nMask.camada -= 1;
                  //   }
                  // })

                  // setProductsMask(newMask);
                }}>-</button>
                {/* <span>{productSelect[0].camada}</span> */}
                <button onClick={() => {
                  let blockProducts: any = [];
                  let newMask: any = [];

                  //POSIÇÃO Y PARA VERIFICAR NOVO EMPILHAMENTO
                  // let adressY = Math.min(...productsMask.filter((product: any) => productSelect[0].blocoId === product.blocoId).
                  //   map((a: any) => {
                  //     return a.y;
                  //   }))

                  //CAPTURAR BASE DO BLOCO DE PRODUTOS
                  // address.map((adrs: any) => {
                  //   productsMask.map((product: any, idx: number) => {
                  //     if (!((adressY - product.height) < (adrs.y - adrs.height))) {
                  //       if (((adrs.y - product.height) === product.y)
                  //         && productSelect[0].blocoId === product.blocoId) {
                  //         blockProducts.push({
                  //           ...product,
                  //           produtoId: new Date().getTime() + idx,
                  //         })
                  //       }
                  //     }
                  //   })
                  // });

                  if (!!blockProducts.length) {

                    //EMPILHAR A BASE DE PRODUTOS
                    // newMask = productsMask.concat(blockProducts);

                    // //QUANTIDADE DE EMPILHAMENTO
                    // newMask.map((nMask: any) => {
                    //   if (productSelect[0].blocoId == nMask.blocoId)
                    //     nMask.camada = blockProducts[0].camada + 1;
                    // })

                    // setProductsMask(newMask);
                  }
                }}>+</button>
              </div>
            </li>
          </ul >
        </> : null}

        {/* FRENTE */}
        {data == 'frontal' ? <>
          < ul >
            <li>
              <span>
                Frente
              </span>
              <div className='ctxBtns'>
                <button onClick={() => {
                  // let newMask: any = [];

                  // //POSIÇÃO X PARA REMOVER NOVA FRENTE
                  // let maxX = Math.max(...productsMask.filter((product: any) => productSelect[0].blocoId === product.blocoId).
                  //   map((a: any) => {
                  //     return a.x;
                  //   }));


                  // productsMask.map((product: any) => {
                  //   if (maxX != product.x) {
                  //     newMask.push(product);
                  //   }
                  // })

                  // //QUANTIDADE DE FRENTES
                  // newMask.map((nMask: any) => {
                  //   if (productSelect[0].blocoId === nMask.blocoId) {
                  //     nMask.frente -= 1;
                  //   }
                  // })

                  // setProductsMask(newMask);
                }}>-</button>
                {/* <span>{productSelect[0].frente}</span> */}
                <button onClick={() => {
                  // let blockProducts: any = [];
                  // let newMask: any = [];

                  // //POSIÇÃO Y PARA ALOCAR NOVA FRENTE
                  // let adressY = Math.max(...productsMask.filter((product: any) => productSelect[0].blocoId === product.blocoId).
                  //   map((a: any) => {
                  //     return a.y
                  //   })),

                  //   //POSIÇÃO X PARA ALOCAR NOVA FRENTE
                  //   maxX = Math.max(...productsMask.filter((product: any) => productSelect[0].blocoId === product.blocoId).
                  //     map((a: any) => {
                  //       return a.x;
                  //     })) + (productSelect[0].width + 1),

                  //   top: any = (address[productSelect[0].nivel].y - address[productSelect[0].nivel].height),
                  //   bottom: any = (address[productSelect[0].nivel].y + address[productSelect[0].nivel].spacing);

                  // //VERIFICAR SE EXISTE ALGUM PRODUTO NO INTERVALO DE ESPAÇO DO NOVO PRODUTO
                  // if ((!productsMask.find((product: any) => product.x <= (maxX + (productSelect[0].width)) && product.x >= maxX && ((product.height + product.y) <= bottom && (product.height + product.y) >= top))) &&
                  //   !!((maxX + productSelect[0].width + 1) <= address[productSelect[0].nivel].width)) {

                  //   if (productSelect[0].camada > 1) {
                  //     for (let i = 0; i < productSelect[0].camada; i++) {
                  //       blockProducts.push({
                  //         ...productSelect[0],
                  //         x: maxX,
                  //         y: adressY,
                  //         produtoId: new Date().getTime() + i,
                  //       });
                  //     }
                  //   } else {
                  //     blockProducts.push({
                  //       ...productSelect[0],
                  //       x: maxX,
                  //       y: adressY,
                  //       produtoId: new Date().getTime() + 1,
                  //     });
                  //   }

                  //   //AUMENTAR FRENTE DE PRODUTOS
                  //   newMask = productsMask.concat(blockProducts);

                  //   //QUANTIDADE DE EMPILHAMENTO
                  //   newMask.map((nMask: any) => {
                  //     if (productSelect[0].blocoId === nMask.blocoId) {
                  //       nMask.frente = blockProducts[0].frente + 1;
                  //     }
                  //   })
                  //   setProductsMask(newMask);
                  // }
                }}>+</button>
              </div>
            </li>
          </ul >
        </> : null}

        {/* EXCLUIR */}
        < ul >
          <li onClick={() => {
            // if (!!productSelect.length) {
            //   let newMask = productsMask.filter((product: any) => product.blocoId != productSelect[0].blocoId);
            //   setProductsMask(newMask);
            // }
            setCtxMenu({
              visibility: 'hidden',
              display: 'none',
              active: false
            });
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <mask id="mask0_1568_1705" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <rect width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_1568_1705)">
                <path d="M9.39997 16.1539L12 13.5539L14.6 16.1539L15.6538 15.1001L13.0538 12.5001L15.6538 9.90005L14.6 8.84623L12 11.4462L9.39997 8.84623L8.34615 9.90005L10.9461 12.5001L8.34615 15.1001L9.39997 16.1539ZM7.3077 20.5C6.80257 20.5 6.375 20.325 6.025 19.975C5.675 19.625 5.5 19.1975 5.5 18.6923V6.00005H4.5V4.50008H8.99997V3.61548H15V4.50008H19.5V6.00005H18.5V18.6923C18.5 19.1975 18.325 19.625 17.975 19.975C17.625 20.325 17.1974 20.5 16.6922 20.5H7.3077ZM17 6.00005H6.99997V18.6923C6.99997 18.7693 7.03203 18.8398 7.09613 18.9039C7.16024 18.968 7.23077 19.0001 7.3077 19.0001H16.6922C16.7692 19.0001 16.8397 18.968 16.9038 18.9039C16.9679 18.8398 17 18.7693 17 18.6923V6.00005Z" fill="#E13434" />
              </g>
            </svg>
            <span>
              Excluir
            </span>
          </li>
        </ul >
      </> : null}

      {/* AGRUPAR */}
      {data == 'frontal' ? <>
        {/* {!!Object.values(address).length && !productSelect.length ? <> */}
        < ul >
          <li onClick={() => {
            // let minX: any = [],
            //   newMask: any = [],
            //   wallX: any = 0,
            //   //CAPTURAR OS PRODUTOS DO NÍVEL SELECIONADO
            //   level: any = address.find((adrs: any) => ctxMenu.posY < adrs.y && ctxMenu.posY > (adrs.y - adrs.height)).idx,
            //   //FILTRAR OS PRODUTOS MAIS PRÓXIMOS DO INÍCIO (UNIDADE DE CADA BLOCO)
            //   productsLevel: any = productsMask.filter((products: any) => products.nivel === level);

            // //ORGANIZAR E APLICAR A DIFERENÇA DA DISTÂNCIA ENTRE A POSIÇÃO ATUAL E A FUTURA
            // productsLevel.sort((a: any, b: any) => { return a.x - b.x }).map((productLevel: any) => {
            //   if (!(minX.find((e: any) => e.blocoId == productLevel.blocoId))) {
            //     minX.push(productLevel);
            //     let distanceX: number = productLevel.x - wallX;
            //     newMask = productsMask.map((product: any) => {
            //       if (product.blocoId == productLevel.blocoId) {
            //         product.x -= distanceX;
            //       }
            //       return product
            //     })
            //     wallX += ((productLevel.width * productLevel.frente) + productLevel.frente);
            //   }
            // })
            // setCtxMenu({
            //   visibility: 'hidden',
            //   display: 'none',
            //   active: false
            // });
            // setProductsMask(newMask)

          }}>
            <svg width="17" height="8" viewBox="0 0 17 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.82269 7.81402L0.907227 3.90702L4.81425 0L5.63078 0.808112L3.1033 3.32715H14.7112L12.1837 0.808112L13.0002 0L16.9072 3.90702L13.0002 7.81402L12.1752 7.00593L14.7112 4.47843H3.09484L5.63078 7.00593L4.82269 7.81402Z" fill="#1C1B1F" />
            </svg>
            <span>
              Agrupar
            </span>
          </li>
        </ul >
        {/* </> : null */}
        {/* } */}
      </> : null}

      {/* DESCRIÇÃO */}
      {
        < ul >
          <li onClick={() => {
            setPlanToggle(true);
            setCtxMenu({
              visibility: 'hidden',
              display: 'none',
              active: false
            });
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
              <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 7 L 11 9 L 13 9 L 13 7 L 11 7 z M 11 11 L 11 17 L 13 17 L 13 11 L 11 11 z" />
            </svg>
            <span>
              Descrição
            </span>
          </li>
        </ul >
      }
    </div >
  )
}

export default context_menu;