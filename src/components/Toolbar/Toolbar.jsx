import ToolbarButton from "../ToolbarButton/ToolbarButton";
import FractionBlocks from "../FractionBlocks/FractionBlocks";
import { useState } from "react";

import "./Toolbar.css";

const Toolbar = (props) => {
  const [isFractionBlocksOpen, setIsFractionBlocksOpen] = useState(false);
  return (
    <menu className="toolbar">
      <li className="toolbar-item">
        <ToolbarButton
          name="Fraction Blocks"
          color="blue"
          onClick={() => setIsFractionBlocksOpen(!isFractionBlocksOpen)}
          isActive={isFractionBlocksOpen}
        />
        {isFractionBlocksOpen && <FractionBlocks />}
      </li>
      <li className="toolbar-item">
        <ToolbarButton name="Toggle Grid" color="green" />
      </li>
      <li className="toolbar-item">
        <ToolbarButton name="Algebra Blocks" color="red" />
      </li>
      <li className="toolbar-item">
        <ToolbarButton name="Test Button" color="yellow" />
      </li>
    </menu>
  );
};

export default Toolbar;
