import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar/Navbar";
import SearchBar from "./components/SearchBar/SearchBar";
import FavHart from "./components/favHart.jsx"; 
import PersantageCycle from "./components/persantageCycle.jsx"; 


function App() {
  const [count, setCount] = useState(0);

  return (
    <>

      <Navbar />
      <SearchBar />
      <FavHart isfav={false}/>
      <PersantageCycle percentage={40}/>
    </>
  );
}

export default App;
