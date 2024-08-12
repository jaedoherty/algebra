import "./FractionBlock.css";

const FractionBlock = (props) => {
  return (
    <div className={`fraction-block block-${props.denom}`}>
      {props.denom === 1 ? 1 : `1/${props.denom}`}
    </div>
  );
};

export default FractionBlock;
