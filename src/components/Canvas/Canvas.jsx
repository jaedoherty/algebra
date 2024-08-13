import { useEffect, useRef, useState } from "react";

import {
  blockBorderColors,
  blockBackgroundColors,
} from "../FractionBlock/constants";
import Rectangle from "../../classes/Rectangle";

import "./Canvas.css";

const Canvas = () => {
  const canvasRef = useRef(null);
  const [shapes, setShapes] = useState([]);

  const onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const onDrop = (e) => {
    const data = e.dataTransfer.getData("text/plain")?.split(",");
    const [id, xOffset, yOffset] = data;
    const dropX = e.clientX - xOffset;
    const dropY = e.clientY - yOffset;
    const idParts = id.split('-')
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
    if (canvasRef.current) {
      canvasRef.current.height = canvasRef.current.clientHeight;
      canvasRef.current.width = canvasRef.current.clientWidth;
    }
  }, []);

  useEffect(() => {
    canvasRef.current
      .getContext("2d")
      .clearRect(
        0,
        0,
        canvasRef.current.clientWidth,
        canvasRef.current.clientHeight
      );
    shapes.forEach((shape) => {
      shape.draw();
    });
  }, [shapes]);

  const onClick = (e) => {
    let hasSelected = false
    for (const shape of shapes.toReversed()) {
      if (shape.containsCoordinate(e.clientX, e.clientY)) {
        if (!hasSelected) {
          shape.onClick(true);
          hasSelected = true
        } else {
          shape.onClick(false);
        }
      } else {
        shape.onClick(false);
      }
      const newShapes = [...shapes];
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
    ></canvas>
  );
};

export default Canvas;
