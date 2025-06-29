import { useCallback, useEffect, useRef, useState } from "react";

import {
  blockBorderColors,
  blockBackgroundColors,
} from "../FractionBlock/constants";
import Rectangle from "../../classes/Rectangle";

import "./Canvas.css";
import { containsCoordinate, getShapesAtCoord } from "./utils";

const Canvas = (props) => {
  const canvasRef = useRef(null);
  const [shapes, setShapes] = useState([]);
  const [draggingShape, setDraggingShape] = useState(null);

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

  const drawTrashCan = useCallback(() => {
    if (draggingShape) {
      const context = canvasRef.current.getContext("2d");
      const trashCanX = canvasRef.current.clientWidth - 55;
      const trashCanY = canvasRef.current.clientHeight - 20;
      context.font = "64px Arial";
      context.fillStyle = "white";
      // TODO: improve collision detection
      if (containsCoordinate(draggingShape, trashCanX, trashCanY)) {
        context.fillText("❌", trashCanX, trashCanY);
      } else {
        context.fillText("🗑️", trashCanX, trashCanY);
      }
    }
  }, [draggingShape])

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
      if (props.showGrid) drawGrid();
      // Draw all the shapes
      drawShapes();
      // draw selection after drawing all the shapes so that it is drawn on top of everything
      drawSelection();
      // draw the delete trash can
      drawTrashCan();
    }
  }, [drawSelection, drawShapes, drawTrashCan, props.showGrid]);

  const resizeCanvas = useCallback(() => {
    if (canvasRef.current) {
      console.log("Resizing canvas to full window size", window);
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight - 9; // don't know why 9 is needed here but it removes the vertical scroll bar
    }
    drawCanvas();
  }, [drawCanvas]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleMouseDown = (e) => {
    const matchingShapes = getShapesAtCoord(shapes, e.clientX, e.clientY);
    console.log(
      `Found ${matchingShapes.length} shapes at (${e.clientX}, ${e.clientY})`
    )
    if (matchingShapes.length === 0) return;

    const shapeToDrag = matchingShapes[0];
    shapeToDrag.dragXOffset = e.clientX - shapeToDrag.x;
    shapeToDrag.dragYOffset = e.clientY - shapeToDrag.y;

    setDraggingShape(matchingShapes[0] || null);
    // Promote the dragged shape to the top layer
    setShapes([...shapes.filter(shape => shape.id !== matchingShapes[0].id), matchingShapes[0]]);
  }

  const handleMouseMove = (e) => {
    if (draggingShape) {
      setShapes((prevShapes) => {
        return prevShapes.map((shape) => {
          if (shape === draggingShape) {
            shape.x = e.clientX - shape.dragXOffset;
            shape.y = e.clientY - shape.dragYOffset;
          }
          return shape;
        });
      })
    }
  }

  const handleMouseUp = () => {
    if (draggingShape) {
      if (containsCoordinate(draggingShape, canvasRef.current.clientWidth - 55, canvasRef.current.clientHeight - 20)) {
        // If the shape is dropped on the trash can, remove it
        setShapes((prevShapes) => prevShapes.filter(shape => shape.id !== draggingShape.id));
      }
      draggingShape.dragXOffset = 0;
      draggingShape.dragYOffset = 0;
      setDraggingShape(null)
    }
  }

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
  }, [props.showGrid, drawSelection, drawShapes, drawCanvas]);

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
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onClick={onClick}
      onKeyDown={deleteShape}
      tabIndex={0}
    />
  );
};

export default Canvas;
