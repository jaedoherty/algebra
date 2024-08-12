import { useEffect, useRef } from 'react'

import drawRect from '../../utils/canvas/drawRect'
import { blockBorderColors, blockBackgroundColors } from '../FractionBlock/constants'

import "./Canvas.css"

const Canvas = () => {
    const canvasRef = useRef(null)

    const onDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    }

    const onDrop = (e) => {
        const data = e.dataTransfer.getData("text/plain")?.split(',');
        const [id, xOffset, yOffset] = data;
        const dropX = e.clientX - xOffset;
        const dropY = e.clientY - yOffset;
        const denom = id[id.length - 1]
        const width = 200 / denom
        const text = denom === '1' ? '1' : `1/${denom}`
        drawRect(canvasRef.current, dropX, dropY, width, 35, blockBorderColors[id], blockBackgroundColors[id], text)
    }

    useEffect(() => {
        // Set up canvas
        if (canvasRef.current) {
            canvasRef.current.height = canvasRef.current.clientHeight;
            canvasRef.current.width = canvasRef.current.clientWidth;
        }
    }, [])

    return (
        <canvas ref={canvasRef} id="canvas" onDragOver={onDragOver} onDrop={onDrop}></canvas>
    )
}

export default Canvas;