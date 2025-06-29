import Canvas from "./components/Canvas/Canvas";
import Toolbar from "./components/Toolbar/Toolbar";
import { useState } from "react";

import "./App.css";

function App() {
  const [showGrid, setShowGrid] = useState(false);
  return (
    <div className="App">
      <Toolbar setShowGrid={setShowGrid} />
      <Canvas showGrid={showGrid} />
    </div>
  );
}

export default App;
