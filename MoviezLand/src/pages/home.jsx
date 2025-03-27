import React from 'react';
import Pgination from "../components/pagination";
import Navbar from "../components/Navbar/Navbar";
import SearchBar from "../components/SearchBar/SearchBar";

const Home = ()=>{
    return(
        <>
        <Navbar />
        <SearchBar />
        <Pgination />
        </>
    );
};
export default Home ; 