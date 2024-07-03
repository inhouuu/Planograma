'use client'

import './style.scss'
import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { GlobalContext } from '@/context/contextGlobals';

export default function Frontal({ superior, modulo }: any) {
    //DOM CANVAS FRONTAL
    const domFrontal: any = useRef();

    //VÁRIAVEIS GLOBAIS
    const { products, ctxMenu, setCtxMenu, setProductSelect, productSelect, productsMask, setProductsMask, setAddress }: any = useContext(GlobalContext);

    function addressDraw() {
        let canvasW: number = (domFrontal.current.width);
        let canvasH: number = (domFrontal.current.height);
        let adressMask: any = [];

        for (let [idx, end] of modulo.ends.entries()) {
            let mask: any = {
                x: 0,
                get y() {
                    return Boolean(adressMask[idx - 1]) ?
                        ((adressMask[idx - 1].y + adressMask[idx - 1].height) + this.spacing) :
                        this.height;
                },
                height: ((end.altura * canvasH) / modulo.altura),
                width: ((end.largura * canvasW) / modulo.largura),
                deep: end.comprimento,
                percent: 0,
                spacing: ((end.espacamento * canvasH) / modulo.altura),
                idx: idx,
                get footer() {
                    return !!adressMask[idx + 1] ?
                        0 :
                        ((end.rodape * canvasH) / modulo.altura)
                }
            };
            adressMask.push(mask);
        }
        setAddress(adressMask);
        return adressMask;
    }

    function productsConvert() {
        let canvasW: number = (domFrontal.current.width);
        let canvasH: number = (domFrontal.current.height);
        let saveProductsMask: any = [];

        modulo.ends.map((end: any) => {
            if (!!end.products?.length) {
                end.products.map((product: any) => {
                    saveProductsMask.push(product);
                })
            }
        })

        if (!!saveProductsMask.length) {
            setProductsMask(saveProductsMask);
        }

        if (Object.values(products).length) {
            let initialX: number = 0,
                initialY: number = 0,
                newHeight: number = ((products.height * canvasH) / modulo.altura),
                newWidth: number = ((products.width * canvasW) / modulo.largura),
                adrsProduct: any = [];

            addressDraw().map((adrs: any) => {
                let addresTop: number = adrs.y - adrs.height,
                    addresBottom: number = adrs.y;
                adrsProduct.push(productsMask.filter((product: any) => {
                    let productTop: number = product.y;
                    if ((productTop >= addresTop && productTop <= addresBottom)) {
                        return product
                    }
                }))
            });

            adrsProduct.map((arrAdrs: any, idx: number) => {
                if (!!arrAdrs.length) {
                    if ((arrAdrs.map((e: any) => e.width).reduce((total: any, value: any) => total + value) + newWidth) < canvasW - newWidth) {
                        arrAdrs.map((product: any) => {
                            let selectLeft = initialX,
                                selectRight = initialX + newWidth;

                            let productsLeft: any = product.x,
                                productsRight: any = product.x + product.width;

                            if (
                                ((selectLeft < productsRight && selectLeft > productsLeft) || (selectRight > productsLeft && selectRight < productsRight))
                                ||
                                (selectLeft < productsLeft && selectRight > productsRight)
                                ||
                                (selectLeft < productsRight && selectRight > productsLeft)
                                ||
                                (selectLeft < productsLeft && selectRight > productsRight)
                            ) {
                                initialX = productsRight + 1;
                            } else {
                                return
                            }
                        })
                    } else {
                        initialY = addressDraw()[idx].y;
                    }
                }
            })

            setProductsMask([...productsMask, {
                ...products,
                x: initialX,
                y: initialY,
                height: newHeight,
                width: newWidth,
                deep: products.deep
            }])
        }
    }

    function insideAdress() {
        addressDraw().map((adrs: any) => {
            let top: any = (adrs.y - adrs.height),
                bottom: any = (adrs.y + adrs.spacing),
                productBottom: number = 0;

            //VERIFICAR EM QUAL NÍVEL O PRODUTO SE ENCONTRA
            productsMask.map((product: any) => {
                productBottom = product.y + (product.height);
                if (productBottom > top && productBottom < bottom) {
                    product.nivel = adrs.idx;
                    productsMask.map((e: any, idx: number) => {
                        if (e.blocoId == product.blocoId) {
                            e.idx = idx;
                            e.y = (adrs.y - e.height);
                        }
                    });
                }
            });
        })
    }

    function insideProduct(x: any, y: any) {
        let productPack: any = [];
        productsMask.map((product: any) => {
            let left = product.x,
                right = product.x + product.width,
                top = product.y,
                bottom = product.y + product.height;

            if (x > left && x < right && y > top && y < bottom) {
                productsMask.map((e: any) => {
                    if (e.blocoId == product.blocoId) {
                        productPack.push(e);
                    }
                })
            }
        })
        return productPack;
    }

    //USEEFFECT PARA CRIAÇÃO DE ITEMS ESTÁTICOS
    useEffect(() => {
        console.log('modulo', modulo)
        //ATUALIZAR LISTA DE PRODUTOS
        productsConvert();

        //CANVAS FRONTAL
        const cvFrontal: any = document.querySelector("#cvFrontal");
        const editor_visual: any = document.querySelector("#editor_visual");

        //TAMANHO DO MÓDULO
        cvFrontal.height = editor_visual.clientHeight;
        cvFrontal.width = ((cvFrontal.height * modulo.largura) / modulo.altura);

        //CANVAS CORREDOR
        const cvAdress = document.createElement("canvas");
        cvAdress.id = "cvAdress";
        cvAdress.width = cvFrontal.width;
        cvAdress.height = cvFrontal.height;
        const ctxAdress = cvAdress.getContext('2d');
        if (document.querySelector("#cvAdress")) editor_visual.removeChild(document.querySelector("#cvAdress"));
        editor_visual.appendChild(cvAdress);

        //CANVAS PRODUTOS 
        const cvProducts = document.createElement("canvas");
        cvProducts.id = "cvProducts";
        cvProducts.width = cvFrontal.width;
        cvProducts.height = cvFrontal.height;
        if (document.querySelector("#cvProducts")) editor_visual.removeChild(document.querySelector("#cvProducts"));
        editor_visual.appendChild(cvProducts);

        //CANVAS PRODUTOS SELECIONADOS
        const cvProductSelect = document.createElement("canvas");
        cvProductSelect.id = "cvProductSelect";
        cvProductSelect.width = cvFrontal.width;
        cvProductSelect.height = cvFrontal.height;
        if (document.querySelector("#cvProductSelect")) editor_visual.removeChild(document.querySelector("#cvProductSelect"));
        editor_visual.appendChild(cvProductSelect);

        //DESENHAR PRATELEIRAS
        if (!ctxAdress) throw 'ctx dont exist';
        ctxAdress.beginPath();
        addressDraw().map((adrs: any) => {
            ctxAdress.fillStyle = 'black';

            //NÍVEIS DO MÓDULO
            ctxAdress.fillRect(adrs.x, (adrs.y), adrs.width, adrs.spacing);

            //RODAPÉ DA ESTRUTURA
            if (adrs.footer) {
                ctxAdress.fillRect(adrs.x, adrs.y, adrs.width, adrs.footer);
            }
            ctxAdress.closePath();
        })
    }, [products]);

    //USEEFFECT PARA ATUALIZAÇÃO DE MOVIMENTOS
    useEffect(() => {
        let dragging: boolean = false,
            startMoveX: number = 0,
            startMoveY: number = 0,
            distanceX: number = 0,
            distanceY: number = 0,
            productSelectLocal: any = productSelect,
            ghostProduct: any = [],
            toggleSelect: boolean = true,
            intervalSelect: any;

        //CANVAS DE PRODUTOS
        const cvFrontal: any = document.querySelector('#cvFrontal');
        const cvProducts: any = document.querySelector('#cvProducts');
        const cvProductSelect: any = document.querySelector('#cvProductSelect');
        const ctxProducts = cvProducts?.getContext('2d');
        const ctxFrontal = cvFrontal?.getContext('2d');
        const ctxProductSelect = cvProductSelect?.getContext('2d');

        //IDENTIFICAR PRODUTOS SELECIONADOS
        clearInterval(intervalSelect);
        function strokeSelect() {
            if (!!productSelectLocal.length) {
                let newProductSelect = insideProduct(productSelectLocal[0].x + 1, productSelectLocal[0].y + 1);
                if (toggleSelect) {
                    //IDENTIFICAR BLOCO SELECIONADO
                    if (!ctxProductSelect) throw 'ctx dont exist';
                    ctxProductSelect.beginPath();

                    if (!!newProductSelect.length) {
                        let minX: number = Math.min(...newProductSelect.map((product: any) => product.x))
                        let minY: number = Math.min(...newProductSelect.map((product: any) => product.y))
                        let maxY: number = Math.max(...newProductSelect.map((product: any) => product.y))
                        let blockWidth: number = ((newProductSelect.map((product: any) => product.y === maxY ? product.width : 0)).reduce((total: any, value: any) => total + value, 0)) + newProductSelect[0].frente;
                        let blockHeight: number = (maxY + newProductSelect[0].height) - minY;

                        ctxProductSelect.strokeStyle = 'red';
                        ctxProductSelect.strokeRect(minX, minY, blockWidth, blockHeight);
                        ctxProductSelect.closePath();
                    }
                } else {
                    ctxProductSelect?.clearRect(0, 0, cvProducts.width, cvProducts.height);
                }
            }
            toggleSelect = !toggleSelect;
        }

        //DESENHAR PRODUTOS
        function drawProducts() {
            if (!ctxProducts) throw 'ctx dont exist';
            let productTemp: any = [];
            ctxFrontal?.clearRect(0, 0, cvFrontal.width, cvFrontal.height);
            ctxProducts?.clearRect(0, 0, cvProducts.width, cvProducts.height);
            ctxProductSelect?.clearRect(0, 0, cvProducts.width, cvProducts.height);

            //DESENHAR DESCRIÇÃO DOS PRODUTOS
            productsMask.map((product: any) => {
                let imgJSX: any = document.createElement('img');
                imgJSX.onload = () => {
                    product.imgJSX = imgJSX;
                    if (product.imgJSX) {
                        ctxProducts.beginPath();
                        ctxProducts.drawImage(product.imgJSX, product.x, product.y, product.width, product.height);

                        ctxProducts.closePath();
                    }
                    if (!(productTemp.find((e: any) => e.blocoId == product.blocoId))) {
                        ctxProducts.beginPath();
                        ctxProducts.fillStyle = `white`;
                        ctxProducts.strokeStyle = 'black';
                        ctxProducts.arc((product.x + ((product.width * product.frente) / 2)), (product.y + product.height), 10, 0, 2 * Math.PI);
                        ctxProducts.stroke();
                        ctxProducts.fill();

                        ctxProducts.font = "12px Arial";
                        ctxProducts.fillStyle = `black`;
                        ctxProducts.textBaseline = 'middle';
                        ctxProducts.textAlign = "center";
                        ctxProducts.fillText(product.fundo, product.x + ((product.width * product.frente) / 2), (product.y + product.height));

                        ctxProducts.closePath();
                        productTemp.push(product);
                    } else {
                        productTemp.find((e: any) => {
                            if (e.blocoId == product.blocoId) {
                                ctxProducts.beginPath();
                                ctxProducts.fillStyle = `white`;
                                ctxProducts.strokeStyle = 'black';
                                ctxProducts.arc((e.x + ((e.width * e.frente) / 2)), (e.y + e.height), 10, 0, 2 * Math.PI);
                                ctxProducts.stroke();
                                ctxProducts.fill();

                                ctxProducts.font = "12px Arial";
                                ctxProducts.fillStyle = `black`;
                                ctxProducts.textBaseline = 'middle';
                                ctxProducts.textAlign = "center";
                                ctxProducts.fillText(e.fundo * (productsMask.filter((e: any) => e.blocoId == product.blocoId).length), e.x + ((e.width * e.frente) / 2), (e.y + e.height));

                                ctxProducts.closePath();
                            }
                        })
                    }
                }
                imgJSX.src = product.img;
                ctxProducts.closePath();
            })
            intervalSelect = setInterval(strokeSelect, 500);
        }

        function checkColision() {
            if (productsMask.length) {
                addressDraw().map((adrs: any) => {
                    for (let product of productsMask) {
                        let arrAux: any = [];
                        productsMask.map((e: any) => {
                            if (e.blocoId == product.blocoId) {
                                arrAux.push(e);
                            }
                        });

                        //CÁLCULO DA QUANTIDA DE PRODUTOS DE FUNDO
                        product.fundo = Math.floor((adrs.deep / product.deep));

                        productsMask.map((productHall: any) => {
                            let selectLeft = product.x,
                                selectRight = product.x + product.width,
                                selectTop = product.y,
                                selectBottom = product.y + product.height;

                            let productsLeft = productHall.x,
                                productsRight = productHall.x + productHall.width,
                                productsTop = productHall.y,
                                productsBottom = productHall.y + productHall.height;


                            if (product.idx > productHall.idx) {
                                if (
                                    (((selectLeft <= productsRight && selectLeft >= productsLeft) || (selectRight >= productsLeft && selectRight <= productsRight))
                                        &&
                                        ((selectTop <= productsBottom && selectTop >= productsTop) || (selectBottom >= productsTop && selectBottom <= productsBottom)))
                                    ||
                                    ((selectLeft < productsLeft && selectRight > productsRight) && (selectTop < productsTop && selectBottom > productsBottom))
                                    ||
                                    ((selectLeft < productsRight && selectRight > productsLeft) && (selectTop < productsTop && selectBottom > productsBottom))
                                    ||
                                    ((selectLeft < productsLeft && selectRight > productsRight) && (selectTop < productsBottom && selectBottom > productsTop))
                                ) {
                                    //PERMITIR COLIÇÃO COM PRODUTOS DE MESMO SKU.
                                    if (product.base.sku == productHall.base.sku) {
                                        product.y = (productHall.y - product.height);
                                    } else {

                                        //EVITAR COLIÇÃO COM PRODUTOS DE DIFERENTE SKU.
                                        ghostProduct.map((e: any) => {
                                            productsMask.map((i: any) => {
                                                if (i.produtoId == e.produtoId) {
                                                    i.x = e.x;
                                                    i.y = e.y;
                                                }
                                            })
                                        })
                                    }
                                }
                            }
                        });
                    }
                });

                //CALCULAR PORCENTAGEM DOS PRODUTOS EM RELAÇÃO AO NÍVEL CORRESPONDENTE
                addressDraw().map((coord: any) => {
                    let total: number = 0
                    productsMask.map((product: any) => {
                        if (product.nivel == coord.idx) {
                            if ((coord.y) == (product.y + product.height)) {
                                total += product.width;
                                coord.percent = ((total * 100) / coord.width).toFixed(0);
                            }
                        }
                    })
                })
            }
        }

        //VERIFICAR CLICK NO PRODUTO
        const mousedown = (event: any) => {
            const rect = cvProducts.getBoundingClientRect();

            startMoveX = event.clientX;
            startMoveY = event.clientY;
            let x = event.clientX - rect.left,
                y = event.clientY - rect.top;

            if (Boolean(insideProduct(x, y).length)) {
                productSelectLocal = insideProduct(x, y);
                cvProducts.classList.add('grabbing');
                dragging = true;
                setProductSelect(productSelectLocal);
            } else {
                setProductSelect({});
                clearInterval(intervalSelect);
                ctxProductSelect?.clearRect(0, 0, cvProducts.width, cvProducts.height);
            }

            ghostProduct = [];
            insideProduct(x, y).map((e: any) => {
                ghostProduct.push({ ...e });
            })
        }

        //MOVER PRODUTO
        const mousemove = (event: any) => {
            if (dragging) {
                let mouseX = parseInt(event.clientX);
                let mouseY = parseInt(event.clientY);
                event.preventDefault();
                distanceX = mouseX - startMoveX;
                distanceY = mouseY - startMoveY;

                for (let [idx, product] of productsMask.entries()) {
                    if (ctxProducts) {
                        ctxProducts.beginPath();
                        ctxProducts.fillStyle = 'black';
                        if (productSelectLocal[0].blocoId != product.blocoId) {
                            // ctxProducts.strokeRect(product.x, product.y, product.width, product.height);
                            ctxProducts.drawImage(product.imgJSX, product.x, product.y, product.width, product.height);
                        }
                        else {
                            // ctxProducts.strokeRect(product.x + (distanceX), product.y + (distanceY), product.width, product.height);
                            ctxProducts.drawImage(product.imgJSX, product.x + (distanceX), product.y + (distanceY), product.width, product.height);
                        }
                        ctxProducts.closePath();
                    }
                }
                ctxFrontal?.clearRect(0, 0, cvFrontal.width, cvFrontal.height);
                ctxFrontal.drawImage(cvProducts, 0, 0);
                ctxProducts?.clearRect(0, 0, cvProducts.width, cvProducts.height);
                ctxProductSelect?.clearRect(0, 0, cvProducts.width, cvProducts.height);

            } else {
                const rect = cvProducts.getBoundingClientRect();
                let x = event.clientX - rect.left,
                    y = event.clientY - rect.top;
                if (Boolean(insideProduct(x, y).length)) {
                    cvProducts.classList.add('grab');
                } else {
                    cvProducts.classList.remove('grab');
                }
            }
        }

        //SOLTAR CLICK OU SAIR PARA FORA DO CANVAS
        const mouseUpAndOut = (event: any) => {
            if (!dragging) return;

            event.preventDefault();

            cvProducts.classList.remove('grabbing');
            dragging = false;

            //VERIFICAR PERMANÊNCIA DO PRODUTO NO CANVAS
            let minX = Math.min(...productsMask.filter((product: any) => productSelectLocal[0].blocoId === product.blocoId).
                map((a: any) => {
                    return a.x + distanceX;
                })),

                maxX = Math.max(...productsMask.filter((product: any) => productSelectLocal[0].blocoId === product.blocoId).
                    map((a: any) => {
                        return a.x + distanceX;
                    })) + (productSelectLocal[0].width + 1),


                minY = Math.min(...productsMask.filter((product: any) => productSelectLocal[0]?.blocoId === product.blocoId).
                    map((a: any) => {
                        return a.y + distanceY;
                    })),

                maxY = Math.max(...productsMask.filter((product: any) => productSelectLocal[0]?.blocoId === product.blocoId).
                    map((a: any) => {
                        return a.y + distanceY;
                    })) + (productSelectLocal[0]?.height),

                adrsMin = Math.min(...addressDraw().map((a: any) => { return a.y - a.height; })),
                adrsMax = addressDraw().find((adrs: any) => adrs.footer === Math.max(...addressDraw().map((a: any) => { return a.footer; }))).y;

            if ((distanceX + distanceY)) {
                for (let product of productsMask) {
                    if ((minX >= addressDraw()[productSelectLocal[0].nivel].x && maxX <= addressDraw()[productSelectLocal[0].nivel].width)
                        && (minY >= adrsMin && maxY <= adrsMax)) {
                        if (product.blocoId == productSelectLocal[0].blocoId) {
                            product.x = product.x + distanceX;
                            product.y = product.y + distanceY;
                        }
                    }
                }
                distanceX = 0;
                distanceY = 0;
            }
            clearInterval(intervalSelect);

            //ATUALIZAR PRODUTOS EM SEUS RESPECTIVOS NÍVEIS
            insideAdress()
            //VERIFICAR POSSÍVEIS COLISÕES
            checkColision()
            //REDESENHAR PRODUTOS COM POSIÇÕES ATUALIZADAS
            drawProducts()
        };

        cvProducts.addEventListener('mousedown', mousedown);
        cvProducts.addEventListener('mousemove', mousemove);
        cvProducts.addEventListener('mouseup', mouseUpAndOut);
        cvProducts.addEventListener('mouseout', mouseUpAndOut);

        //ATUALIZAR PRODUTOS EM SEUS RESPECTIVOS NÍVEIS
        insideAdress()
        //VERIFICAR POSSÍVEIS COLISÕES
        checkColision()
        //REDESENHAR PRODUTOS COM POSIÇÕES ATUALIZADAS
        drawProducts()

        return () => {
            clearInterval(intervalSelect);

            cvProducts.removeEventListener('mousedown', mousedown);
            cvProducts.removeEventListener('mousemove', mousemove);
            cvProducts.removeEventListener("mouseup", mouseUpAndOut)
            cvProducts.removeEventListener('mouseout', mouseUpAndOut);
        };
    }, [productsMask])

    // -------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------

    //ATALHOS
    const shortCut = useCallback((event: any) => {
        if (event.ctrlKey && event.key === 'ArrowUp') {
            let blockProducts: any = [];
            let newMask: any = [];

            //POSIÇÃO Y PARA VERIFICAR NOVO EMPILHAMENTO
            let adressY = Math.min(...productsMask.filter((product: any) => productSelect[0].blocoId === product.blocoId).
                map((a: any) => {
                    return a.y;
                }))

            //CAPTURAR BASE DO BLOCO DE PRODUTOS
            addressDraw().map((adrs: any) => {
                productsMask.map((product: any, idx: number) => {
                    if (!((adressY - product.height) < (adrs.y - adrs.height))) {
                        if (((adrs.y - product.height) === product.y)
                            && productSelect[0].blocoId === product.blocoId) {
                            blockProducts.push({
                                ...product,
                                produtoId: new Date().getTime() + idx,
                            })
                        }
                    }
                })
            });

            if (!!blockProducts.length) {

                //EMPILHAR A BASE DE PRODUTOS
                newMask = productsMask.concat(blockProducts);

                //QUANTIDADE DE EMPILHAMENTO
                newMask.map((nMask: any) => {
                    if (productSelect[0].blocoId == nMask.blocoId)
                        nMask.camada = blockProducts[0].camada + 1;
                })

                setProductsMask(newMask);
            }
        }

        if (event.ctrlKey && event.key === 'ArrowDown') {
            let newMask: any = [];

            let minY = Math.min(...productsMask.filter((product: any) => productSelect[0].blocoId === product.blocoId).
                map((a: any) => {
                    return a.y;
                }));


            productsMask.map((product: any) => {
                if (!(productSelect[0].blocoId === product.blocoId && minY === product.y)) {
                    newMask.push(product);
                }
            })

            //QUANTIDADE DE EMPILHAMENTO
            newMask.map((nMask: any) => {
                if (productSelect[0].blocoId === nMask.blocoId) {
                    nMask.camada -= 1;
                }
            })

            setProductsMask(newMask);
        }

        if (event.ctrlKey && event.key === 'ArrowLeft') {
            let newMask: any = [];

            //POSIÇÃO X PARA REMOVER NOVA FRENTE
            let maxX = Math.max(...productsMask.filter((product: any) => productSelect[0].blocoId === product.blocoId).
                map((a: any) => {
                    return a.x;
                }));


            productsMask.map((product: any) => {
                if (maxX != product.x) {
                    newMask.push(product);
                }
            })

            //QUANTIDADE DE FRENTES
            newMask.map((nMask: any) => {
                if (productSelect[0].blocoId === nMask.blocoId) {
                    nMask.frente -= 1;
                }
            })

            setProductsMask(newMask);
        }

        if (event.ctrlKey && event.key === 'ArrowRight') {
            let blockProducts: any = [];
            let newMask: any = [];

            //POSIÇÃO Y PARA ALOCAR NOVA FRENTE
            let adressY = Math.max(...productsMask.filter((product: any) => productSelect[0].blocoId === product.blocoId).
                map((a: any) => {
                    return a.y
                })),

                //POSIÇÃO X PARA ALOCAR NOVA FRENTE
                maxX = Math.max(...productsMask.filter((product: any) => productSelect[0].blocoId === product.blocoId).
                    map((a: any) => {
                        return a.x;
                    })) + (productSelect[0].width + 1),

                top: any = (addressDraw()[productSelect[0].nivel]?.y - addressDraw()[productSelect[0].nivel]?.height),
                bottom: any = (addressDraw()[productSelect[0].nivel]?.y + addressDraw()[productSelect[0].nivel]?.spacing);

            //VERIFICAR SE EXISTE ALGUM PRODUTO NO INTERVALO DE ESPAÇO DO NOVO PRODUTO
            if ((!productsMask.find((product: any) => product.x <= (maxX + (productSelect[0]?.width)) && product.x >= maxX && ((product.height + product.y) <= bottom && (product.height + product.y) >= top))) &&
                !!((maxX + productSelect[0]?.width + 1) <= addressDraw()[productSelect[0].nivel]?.width)) {

                if (productSelect[0].camada > 1) {
                    for (let i = 0; i < productSelect[0]?.camada; i++) {
                        blockProducts.push({
                            ...productSelect[0],
                            x: maxX,
                            y: adressY,
                            produtoId: new Date().getTime() + i,
                        });
                    }
                } else {
                    blockProducts.push({
                        ...productSelect[0],
                        x: maxX,
                        y: adressY,
                        produtoId: new Date().getTime() + 1,
                    });
                }

                //AUMENTAR FRENTE DE PRODUTOS
                newMask = productsMask.concat(blockProducts);

                //QUANTIDADE DE EMPILHAMENTO
                newMask.map((nMask: any) => {
                    if (productSelect[0].blocoId === nMask.blocoId) {
                        nMask.frente = blockProducts[0].frente + 1;
                    }
                })
                setProductsMask(newMask);
            }
        }

        if (event.ctrlKey && event.key === 'Backspace') {
            if (!!Object.values(productSelect[0]).length) {
                let newMask = productsMask.filter((product: any) => product.blocoId != productSelect[0].blocoId);

                setProductsMask(newMask);
            }
        }

    }, [productsMask, productSelect]);

    useEffect(() => {
        document.addEventListener('keydown', shortCut);
        document.addEventListener('click', shortCut);

        return () => {
            document.removeEventListener('keydown', shortCut);
            document.removeEventListener('click', shortCut);
        };

    }, [shortCut])

    //ATIVAR CONTEXTMENU
    const contextActive = useCallback((event: any) => {
        event.preventDefault();
        setCtxMenu({
            top: `${event.y}px`,
            left: `${event.x}px`,
            visibility: 'visible',
            posY: event.layerY,
            active: true
        });
    }, [productsMask]);

    //DESATIVAR CONTEXTMENU
    const contextDisable = useCallback((event: any) => {
        event.preventDefault();
        if (event.button === 0) {
            if (ctxMenu.active) {
                setCtxMenu({
                    top: `${event.y}px`,
                    left: `${event.x}px`,
                    visibility: 'hidden',
                    display: 'none',
                    posY: event.y,
                    active: false
                });
            }
        }
    }, [ctxMenu]);

    useEffect(() => {
        const cvProducts: any = document.querySelector("#cvProducts");
        cvProducts.addEventListener('contextmenu', contextActive);
        cvProducts.addEventListener('mousedown', contextDisable);

        return () => {
            cvProducts.removeEventListener('contextmenu', contextActive);
            cvProducts.removeEventListener('mousedown', contextDisable);
        };
    }, [contextActive, contextDisable])

    return (
        <>
            <canvas id='cvFrontal' ref={domFrontal}></canvas>
        </>
    )
}