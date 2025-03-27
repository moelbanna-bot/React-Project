import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FavHart from "./components/favHart.jsx"; 
import PersantageCycle from "./components/persantageCycle.jsx"; 



function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <FavHart isfav={false}/>
      <PersantageCycle percentage={40}/>
    </>
  );
}

export default App;
