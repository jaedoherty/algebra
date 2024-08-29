import "./FractionBlock.css";
import { useEffect } from "react";

const FractionBlock = (props) => {
  useEffect(() => {
    if (typeof window?.MathJax !== "undefined") {
      window.MathJax.typeset();
    }
  }, []);

  const onDragStart = (e) => {
    const targetRect = e.target.getBoundingClientRect();
    const yOffset = e.clientY - targetRect.top;
    const xOffset = e.clientX - targetRect.left;
    e.dataTransfer.setData(
      "text/plain",
      `${e.target.id},${xOffset},${yOffset}`
    );
  };

  return (
    <div
      id={`fraction-block-${props.denom}`}
      className={`fraction-block block-${props.denom}`}
      draggable="true"
      onDragStart={onDragStart}
    >
      {props.denom === 1 ? (
        <math>
            <mn>1</mn>
        </math>
      ) : (
        <math>
          <mfrac>
            <mn>1</mn>
            <mn>{props.denom}</mn>
          </mfrac>
        </math>
      )}
    </div>
  );
};

export default FractionBlock;
