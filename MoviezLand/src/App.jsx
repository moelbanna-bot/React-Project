import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import MovieDetails from './components/MovieDetails'
import MovieList from './components/MovieList'
import Navbar from "./components/Navbar/Navbar";


function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/movie/:id' element={<MovieDetails />} />
          <Route path="/search" element={<MovieList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;


