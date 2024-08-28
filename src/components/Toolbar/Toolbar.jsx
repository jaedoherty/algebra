import ToolbarButton from "../ToolbarButton/ToolbarButton";
import FractionBlocks from "../FractionBlocks/FractionBlocks";
import GridMenu from "../GridMenu/GridMenu";
import { useState } from "react";

import "./Toolbar.css";

const Toolbar = (props) => {
  const [isFractionBlocksOpen, setIsFractionBlocksOpen] = useState(false);
  const [isToggleGridOpen, setIsToggleGridOpen] = useState(false);
  const [isAlgebraBlocksOpen, setIsAlgebraBlocksOpen] = useState(false);
  const [isCardsOpen, setIsCardsOpen] = useState(false);

  const handleFractionBlocksClick = () => {
    setIsFractionBlocksOpen(!isFractionBlocksOpen);
    setIsToggleGridOpen(false);
    setIsAlgebraBlocksOpen(false);
    setIsCardsOpen(false);
  };

  const handleToggleGridClick = () => {
    setIsToggleGridOpen(!isToggleGridOpen);
    setIsFractionBlocksOpen(false);
    setIsAlgebraBlocksOpen(false);
    setIsCardsOpen(false);
  };

  const handleAlgebraBlocksClick = () => {
    setIsAlgebraBlocksOpen(!isAlgebraBlocksOpen);
    setIsFractionBlocksOpen(false);
    setIsToggleGridOpen(false);
    setIsCardsOpen(false);
  };

  const handleCardsClick = () => {
    setIsCardsOpen(!isCardsOpen);
    setIsFractionBlocksOpen(false);
    setIsToggleGridOpen(false);
    setIsAlgebraBlocksOpen(false);
  };

  return (
    <menu className="toolbar">
      <li className="toolbar-item">
        <ToolbarButton
          name="Fraction Blocks"
          color="blue"
          onClick={handleFractionBlocksClick}
          isActive={isFractionBlocksOpen}
        />
        {isFractionBlocksOpen && <FractionBlocks />}
      </li>
      <li className="toolbar-item">
        <ToolbarButton
          name="Toggle Grid"
          color="green"
          onClick={handleToggleGridClick}
          isActive={isToggleGridOpen}
        />
        {isToggleGridOpen && <GridMenu setIsGridShown={props.setIsGridShown}/>}
      </li>
      <li className="toolbar-item">
        <ToolbarButton
          name="Algebra Blocks"
          color="red"
          onClick={handleAlgebraBlocksClick}
          isActive={isAlgebraBlocksOpen}
        />
      </li>
      <li className="toolbar-item">
        <ToolbarButton
          name="Cards"
          color="yellow"
          onClick={handleCardsClick}
          isActive={isCardsOpen}
        />
      </li>
    </menu>
  );
};

export default Toolbar;
