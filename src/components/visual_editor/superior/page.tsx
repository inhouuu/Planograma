'use client'

import './style.scss'
import { useEffect, useRef, useContext, useCallback } from 'react'
import { GlobalContext } from '@/context/contextGlobals';
import Paper from 'paper';
export default function Superior() {

    //VÁRIAVEIS GLOBAIS
    const { form, color, supCoords, setSupCoords, formSelect, setFormSelect, action, setCtxMenu, ctxMenu }: any = useContext(GlobalContext);

    //DOM CANVAS 
    const domSuperior: any = useRef();

    function mouseInside(x: number, y: number) {
        if (supCoords.length)
            return supCoords.map((coord: any) => {
                if (coord.r) {
                    const distance =
                        Math.sqrt(
                            ((x - coord.x) * (x - coord.x))
                            +
                            ((y - coord.y) * (y - coord.y))
                        )

                    if (distance < coord.r) {
                        setFormSelect(coord);
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    let left = coord.x,
                        right = coord.x + coord.w,
                        top = coord.y,
                        bottom = coord.y + coord.h;

                    if (x > left && x < right && y > top && y < bottom) {
                        setFormSelect(coord);
                        return true;
                    } else {
                        return false;
                    }
                }
            })
    }

    //PAPER JS
    // useEffect(() => {
    //     // Paper.setup(domSuperior.current);
    //     //ADD POINT (X,Y)
    //     // var myPoint = new Paper.Point(100, 210);

    //     //ADD SIZE (WIDTH, HEIGHT)
    //     // var mySize = new Paper.Size(100, 210);


    //     // domSuperior.current.addEventListener('mousedown', (event: any) => {
    //     //     const rect: any = new Paper.Path.Rectangle({
    //     //         x: 50,
    //     //         y: 100,
    //     //         width: 100,
    //     //         height: 100,
    //     //         fillColor: 'red'
    //     //     });
    //     // })


    //     // var circ = new Paper.Path.Circle({
    //     //     x: 100,
    //     //     y: 100,
    //     //     // center: 500,
    //     //     radius: 40,
    //     //     strokeColor: 'black'
    //     // });


    //     // var myPath: any = new Paper.Path();
    //     // myPath.strokeColor = 'yellow';

    //     //CRIA PONTOS
    //     // myPath.add(new Paper.Point(0, 0));
    //     // myPath.add(new Paper.Point(100, 50));

    //     //CRIA UMA INTERSECÇÃO DA RETA SELECIONADA
    //     // myPath.insert(1, new Paper.Point(30, 50));

    //     //CLONAR ITEM COMPLETO
    //     // var copy = myPath.clone();

    //     //ADICIONAR PONTOS DE INTERSECÇÃO (VISUALMENTE)
    //     // myPath.fullySelected = true;

    //     //SUAVIZAR BORDAS
    //     // myPath.smooth();

    //     //ENCONTRA O MENOR CAMINHO E FECHA OS PONTOS
    //     // myPath.closed = true;

    //     //SELECIONAR FORMA
    //     // myPath.selected = true;

    //     //REMOVER INTERSECÇÃO
    //     // myPath.removeSegment(1);

    //     //REMOVER ITEM COMPLETO
    //     // myPath.remove();

    //     //ADICIONAR PONTO
    //     // rect.add(myPoint);
    // })

    //CANVAS VANILA
    useEffect(() => {
        //CANVAS SUPERIOR
        console.log('att')
        const editor_visual: any = document.querySelector("#editor_visual");
        Paper.setup(domSuperior.current);

        //CANVAS TEMPORARIO
        const cvTemp = document.createElement("canvas");
        cvTemp.id = "cvTemp";
        cvTemp.width = domSuperior.current.width;
        cvTemp.height = domSuperior.current.height;
        let ctxTemp = cvTemp.getContext('2d');
        if (document.querySelector("#cvTemp")) editor_visual.removeChild(document.querySelector("#cvTemp"));
        editor_visual.appendChild(cvTemp);

        //ATUALIZAR CANVAS
        if (!!supCoords.length) {
            for (let coord of supCoords) {
                if (coord.r) {
                    new Paper.Path.Circle({
                        x: coord.x,
                        y: coord.y,
                        radius: coord.r,
                        fillColor: 'yellow'
                    });
                } else {
                    let rect = new Paper.Path.Rectangle({
                        x: coord.x,
                        y: coord.y,
                        width: coord.w,
                        height: coord.h,
                        fillColor: 'red'
                    }).selected = false;

                    //NOME DOS MÓDULOS
                    let styleFont = {
                        fontSize: '20px',
                        fontFamily: 'Arial',
                        fontWeight: 'Bold'
                    }

                    let ctxName: any = domSuperior.current.getContext("2d");
                    ctxName.font = `${styleFont.fontWeight} ${styleFont.fontSize} ${styleFont.fontFamily}`;
                    let measureText: any = ctxName.measureText(coord.name);

                    let text: any = new Paper.PointText({
                        point: [coord.x + ((coord.w - measureText.width) / 2), coord.y + coord.h / 2],
                        content: coord.name,
                        fillColor: 'black',
                        ...styleFont 
                    });
                }
            }
        }

        //MOVER E DESENHAR FORMAS
        let started: boolean = false;
        let dragging: boolean = false;
        let tempCoords: any = new Object();
        let startMoveX: number;
        let startMoveY: number;
        let distanceX: number = 0;
        let distanceY: number = 0;

        function drawMove(dx: any, dy: any) {
            Paper.setup(domSuperior.current);
            for (let coord of supCoords) {
                if (coord.r) {
                    if (formSelect.id !== coord.id) {
                        new Paper.Path.Circle({
                            x: coord.x,
                            y: coord.y,
                            radius: coord.r,
                            fillColor: 'yellow'
                        });
                    }
                    else {
                        new Paper.Path.Circle({
                            x: coord.x + (dx),
                            y: coord.y + (dy),
                            radius: coord.r,
                            fillColor: 'yellow'
                        });
                    }
                } else {
                    if (formSelect.id !== coord.id) {
                        new Paper.Path.Rectangle({
                            x: coord.x,
                            y: coord.y,
                            width: coord.w,
                            height: coord.h,
                            fillColor: 'red'
                        });
                    }
                    else {
                        new Paper.Path.Rectangle({
                            x: coord.x + (dx),
                            y: coord.y + (dy),
                            width: coord.w,
                            height: coord.h,
                            fillColor: 'red'
                        });
                    }
                }
            }
        }

        cvTemp.addEventListener("mousedown", (event: any) => {
            if (action === 'form') {
                started = true;
                tempCoords.x0 = event.layerX;
                tempCoords.y0 = event.layerY;
                tempCoords.color = `${color}`
                tempCoords.id = new Date().getTime();
                tempCoords.type = 'form';
                console.log('form', form);
            }

            if (action === 'move') {
                const rect = cvTemp.getBoundingClientRect();
                startMoveX = event.clientX;
                startMoveY = event.clientY;

                let x = event.clientX - rect.left,
                    y = event.clientY - rect.top;

                if (mouseInside(x, y)?.find((e: any) => e === true)) {
                    console.log('teste')
                    cvTemp.classList.add('grabbing');
                    dragging = true;
                }
            }
        });

        cvTemp.addEventListener("mousemove", (event: any) => {
            if (action === 'form') {
                if (started) {
                    //QUADRADO
                    if (form === 'square') {
                        tempCoords.x = Math.min(event.layerX, tempCoords.x0);
                        tempCoords.y = Math.min(event.layerY, tempCoords.y0);
                        tempCoords.w = Math.abs(event.layerX - tempCoords.x0);
                        tempCoords.h = Math.abs(event.layerY - tempCoords.y0);
                        Paper.setup(cvTemp);

                        if (!tempCoords.w || !tempCoords.h) {
                            return;
                        }
                        new Paper.Path.Rectangle({
                            x: tempCoords.x,
                            y: tempCoords.y,
                            width: tempCoords.w,
                            height: tempCoords.h,
                            fillColor: 'red'
                        }).selected = true;
                    }

                    //CIRCULO
                    if (form === 'circle') {
                        tempCoords.x = Math.min(event.layerX, tempCoords.x0);
                        tempCoords.y = Math.min(event.layerY, tempCoords.y0);
                        tempCoords.w = Math.abs(event.layerX - tempCoords.x0);
                        tempCoords.h = Math.abs(event.layerY - tempCoords.y0);
                        tempCoords.r = Math.max(tempCoords.w, tempCoords.h);
                        ctxTemp?.clearRect(0, 0, cvTemp.width, cvTemp.height);
                        Paper.setup(cvTemp);

                        if (!tempCoords.r) {
                            return;
                        }

                        if (!ctxTemp) throw 'ctx dont exist';
                        ctxTemp.beginPath();
                        ctxTemp.arc(tempCoords.x, tempCoords.y, tempCoords.r, 0, 2 * Math.PI);
                        ctxTemp.fillStyle = tempCoords.color;
                        ctxTemp.fill();
                        ctxTemp.closePath();

                        new Paper.Path.Circle({
                            x: tempCoords.x,
                            y: tempCoords.y,
                            radius: tempCoords.r,
                            fillColor: 'yellow'
                        });
                    }
                }
            }

            if (action === 'move') {
                if (dragging) {
                    event.preventDefault();
                    let mouseX = parseInt(event.clientX);
                    let mouseY = parseInt(event.clientY);
                    distanceX = mouseX - startMoveX;
                    distanceY = mouseY - startMoveY;
                    drawMove(distanceX, distanceY);
                } else {
                    const rect = cvTemp.getBoundingClientRect();
                    startMoveX = event.clientX;
                    startMoveY = event.clientY;

                    let x = event.clientX - rect.left,
                        y = event.clientY - rect.top;

                    if (mouseInside(x, y)?.find((e: any) => e === true)) {
                        cvTemp.classList.add('grab');
                    } else {
                        cvTemp.classList.remove('grab');
                    }
                }
            }
        });

        cvTemp.addEventListener("mouseup", (event: any) => {
            if (action === 'form') {
                if (started) {
                    started = false;
                    if (tempCoords.w > 20 || tempCoords.h > 20 || tempCoords.r > 10) {
                        setSupCoords([...supCoords, tempCoords]);
                    }
                }
            }

            if (action === 'move') {
                if (!dragging) return;
                event.preventDefault();
                cvTemp.classList.remove('grabbing');
                dragging = false;
                drawMove(distanceX, distanceY);

                if ((distanceX + distanceY)) {
                    formSelect.x = formSelect.x + (distanceX);
                    formSelect.y = formSelect.y + (distanceY);
                    setFormSelect({ ...formSelect, x: formSelect.x + (distanceX) })
                    setFormSelect({ ...formSelect, y: formSelect.y + (distanceY) })
                    distanceX = 0;
                    distanceY = 0;
                }

                const rect = cvTemp.getBoundingClientRect();
                let x = event.clientX - rect.left,
                    y = event.clientY - rect.top;
                if (mouseInside(x, y)?.find((e: any) => e === true)) {
                    cvTemp.classList.add('grab');
                } else {
                    cvTemp.classList.remove('grab');
                }
                // drawAtt();
            }

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
        });

        const menuActive: any = (event: any) => {
            event.preventDefault();
            console.log('mouse', event.layerX)
            if (mouseInside(event.layerX, event.layerY)?.find((e: any) => e === true)) {
                setCtxMenu({
                    top: `${event.y}px`,
                    left: `${event.x}px`,
                    visibility: 'visible',
                    posY: event.layerY,
                    active: true
                });
            }
        };

        //ADD CTXMENU
        cvTemp.addEventListener('contextmenu', menuActive);

        return () => {
            cvTemp.removeEventListener('contextmenu', menuActive);
        };

        // GRID CANVAS
        // var drawGridLines = function (num_rectangles_wide: any, num_rectangles_tall: any, boundingRect: any) {
        //     var width_per_rectangle = boundingRect.width / num_rectangles_wide;
        //     var height_per_rectangle = boundingRect.height / num_rectangles_tall;
        //     for (var i = 0; i <= num_rectangles_wide; i++) {
        //         var xPos = boundingRect.left + i * width_per_rectangle;
        //         var topPoint = new Paper.Point(xPos, boundingRect.top);
        //         var bottomPoint = new Paper.Point(xPos, boundingRect.bottom);
        //         var aLine: any = new Paper.Path.Line(topPoint, bottomPoint);
        //         aLine.strokeColor = 'black';
        //     }
        //     for (var i = 0; i <= num_rectangles_tall; i++) {
        //         var yPos = boundingRect.top + i * height_per_rectangle;
        //         var leftPoint = new Paper.Point(boundingRect.left, yPos);
        //         var rightPoint = new Paper.Point(boundingRect.right, yPos);
        //         var aLine: any = new Paper.Path.Line(leftPoint, rightPoint);
        //         aLine.strokeColor = 'black';
        //     }
        // }
        // drawGridLines(80, 40, Paper.view.bounds);
    })

    return (
        <>
            <canvas id='cvSuperior' ref={domSuperior}></canvas>
        </>
    )
}