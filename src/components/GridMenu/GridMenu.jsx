import "./GridMenu.css";

const GridMenu = (props) => {
  return (
    <div className="grid-menu">
      <button className={`grid-button`} onClick={() => props.setShowGrid(true)}>
        Grid
      </button>
      <button className={`grid-button`} onClick={() => props.setShowGrid(false)}>
        No Grid
      </button>
    </div>
  );
};

export default GridMenu;
