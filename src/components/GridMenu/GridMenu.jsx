import "./GridMenu.css";

const GridMenu = (props) => {
  return (
    <div className="grid-menu">
      <button className={`grid-button`} onClick={() => props.setIsGridShown(true)}>
        Grid
      </button>
      <button className={`grid-button`} onClick={() => props.setIsGridShown(false)}>
        No Grid
      </button>
    </div>
  );
};

export default GridMenu;
