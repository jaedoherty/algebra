import Canvas from "./components/Canvas/Canvas";
import Toolbar from "./components/Toolbar/Toolbar";
import { useState } from "react";

import "./App.css";

function App() {
  const [isGridShown, setIsGridShown] = useState(false);
  return (
    <div className="App">
      <Toolbar setIsGridShown={setIsGridShown} />
      <Canvas isGridShown={isGridShown} />
    </div>
  );
}

export default App;
