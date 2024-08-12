import "./FractionBlock.css";

const FractionBlock = (props) => {
  const onDragStart = (e) => {
    const targetRect = e.target.getBoundingClientRect();
    const yOffset = e.clientY - targetRect.top;
    const xOffset = e.clientX - targetRect.left;
    e.dataTransfer.setData("text/plain", `${e.target.id},${xOffset},${yOffset}`);
  }

  return (
    <div id={`fraction-block-${props.denom}`} className={`fraction-block block-${props.denom}`} draggable="true" onDragStart={onDragStart}>
      {props.denom === 1 ? 1 : `1/${props.denom}`}
    </div>
  );
};

export default FractionBlock;
