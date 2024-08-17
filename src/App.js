import Canvas from './components/Canvas/Canvas';
import Toolbar from './components/Toolbar/Toolbar'
import { useState } from 'react';

import "./App.css";
import { MathJaxContext } from "better-react-mathjax";

function App() {
  const [isGridShown, setIsGridShown] = useState(false)
  return (
    <MathJaxContext>
      <div className="App">
      <Toolbar setIsGridShown={setIsGridShown}/>
      <Canvas isGridShown={isGridShown}/>
      </div>
    </MathJaxContext>
  );
}

export default App;
