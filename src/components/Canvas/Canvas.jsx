import { useCallback, useEffect, useRef, useState } from "react";

import {
  blockBorderColors,
  blockBackgroundColors,
} from "../FractionBlock/constants";
import Rectangle from "../../classes/Rectangle";

import "./Canvas.css";

const Canvas = (props) => {
  const canvasRef = useRef(null);
  const [shapes, setShapes] = useState([]);

  const clearCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current
        .getContext("2d")
        .clearRect(
          0,
          0,
          canvasRef.current.clientWidth,
          canvasRef.current.clientHeight
        );
    }
  };

  const drawSelection = useCallback(() => {
    shapes.forEach((shape) => {
      if (shape.isSelected) {
        shape.drawSelection();
      }
    });
  }, [shapes]);

  const drawGrid = () => {
    const context = canvasRef.current.getContext("2d");
    let squareSize = 35;
    context.beginPath();
    context.strokeStyle = "lightgrey";
    for (let x = 0; x < canvasRef.current.clientWidth; x += squareSize) {
      context.moveTo(x, 0);
      context.lineTo(x, canvasRef.current.clientHeight);
    }
    for (let y = 0; y < canvasRef.current.clientHeight; y += squareSize) {
      context.moveTo(0, y);
      context.lineTo(canvasRef.current.clientWidth, y);
    }
    context.stroke();
  };

  const drawShapes = useCallback(() => {
    if (canvasRef.current) {
      // // Draw all the shapes
      shapes.forEach((shape) => {
        shape.draw();
      });
    }
  }, [shapes]);

  const drawCanvas = useCallback(() => {
    if (canvasRef.current) {
      clearCanvas();
      if (props.isGridShown) drawGrid();
      // Draw all the shapes
      drawShapes();
      // draw selection after drawing all the shapes so that it is drawn on top of everything
      drawSelection();
    }
  }, [drawSelection, drawShapes, props.isGridShown]);

  const resizeCanvas = useCallback(() => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }
    drawCanvas();
  }, [drawCanvas]);

  const initialize = () => {
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
  };

  initialize();

  const onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const onDrop = (e) => {
    const data = e.dataTransfer.getData("text/plain")?.split(",");
    const [id, xOffset, yOffset] = data;
    const dropX = e.clientX - xOffset;
    const dropY = e.clientY - yOffset;
    const idParts = id.split("-");
    const denom = idParts[idParts.length - 1];
    const width = 200 / denom;
    const text = denom === "1" ? "1" : `1/${denom}`;
    const rectangle = new Rectangle(
      canvasRef.current.getContext("2d"),
      dropX,
      dropY,
      width,
      35,
      blockBorderColors[id],
      blockBackgroundColors[id],
      text,
      "center"
    );
    const newShapes = [...shapes, rectangle];
    setShapes(newShapes);
  };

  useEffect(() => {
    // Set up canvas
    resizeCanvas();
  }, [resizeCanvas]);

  useEffect(() => {
    drawCanvas()
  }, [props.isGridShown, drawSelection, drawShapes, drawCanvas]);

  const onClick = (e) => {
    let hasSelected = false;
    for (const shape of shapes.toReversed()) {
      if (shape.containsCoordinate(e.clientX, e.clientY)) {
        if (!hasSelected) {
          shape.onClick(true);
          hasSelected = true;
        } else {
          shape.onClick(false);
        }
      } else {
        shape.onClick(false);
      }
      drawCanvas();
    }
  };

  const deleteShape = (e) => {
    if (e.key === "Backspace") {
      const newShapes = shapes.filter((shape) => !shape.isSelected);
      setShapes(newShapes);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={onClick}
      onKeyDown={deleteShape}
      tabIndex={0}
    ></canvas>
  );
};

export default Canvas;
