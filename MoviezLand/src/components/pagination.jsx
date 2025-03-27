import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa"; 
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../store/slices/wishlist";
import { Loading } from "./loading";
import FavHart from "./components/favHart.jsx"; 
import PersantageCycle from "./components/persantageCycle.jsx"; 

const Pgination = ()=>{
    const dispatch = useDispatch();
    const wishlist = useSelector((state) => state.wishlist.wishlist);
    console.log(wishlist)
    const [data, setData] = useState([]); 
    const [limit, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [totalPages,setTotalPages] = useState(1);
    const API_KEY = "e2edbfd087d07f1651e7d9622dc3b0c6";
   
  useEffect(() => {
    const fetchData = async (limit) => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${limit}`
        )
        setData(response.data.results);
        setTotalPages(response.data.total_pages)
        console.log(response)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(limit);
  }, [limit]);

  const toggleWishlist = (movie) => {
        if (wishlist.some((item) => item.id === movie.id)) {
            dispatch(removeFromWishlist(movie));
        } else {
            dispatch(addToWishlist(movie));
        }
    };
    return(
    <div className="text-center">
        <h2 className="fw-bold" style={{color:"#2c3e50 "}}> Movies List </h2>
        <hr />
        {loading && <Loading />}
        <div className="row">
            {data.map((movie) => (
            <div key={movie.id} className="col-lg-2 col-md-3 col-sm-6 p-2" style={{maxHeight:"500px"}}>
                <div className="card h-100 border-0">
                  <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} className="card-img-top rounded-4 img-fluid shadow" style={{ height: "400px", objectFit: "cover" }}  alt={movie.title}/>
                  <div className="d-flex justify-content-between mt-4 p-2">
                      <div>
                        <h5 className="card-title">{movie.title}</h5>
                        <p className="card-text"> <strong>Release Date:</strong> {movie.release_date} </p>
                      </div>
                      <span onClick={() => toggleWishlist(movie)} style={{ cursor: "pointer", fontSize: "1.5rem", color: wishlist.some((m) => m.id === movie.id) ? "#f4d03f" : "gray" }} className="align-self-end">
                          {wishlist.some((m) => m.id === movie.id) ? <FaHeart /> : <FaRegHeart />}
                      </span>
                  </div>
                </div>
            </div>
            ))}
        </div>
        <hr />
        <div className="text-center  d-flex justify-content-around align-items-center">
            <button className="btn btn-sm fw-bold " onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={limit === 1} style={{color:"white" , background:"#2c3e50"}}>
             <ChevronLeft size={50} /> Previous
            </button>
            <span className="fw-bold" style={{letterSpacing:"3px"}}> Page Number : {limit} / From : {totalPages} </span>
            <button className="btn btn-sm fw-bold" onClick={() => setPage((prev) => prev + 1)} style={{color:"white" , background:"#2c3e50"}}>
            Next  <ChevronRight size={50} />
            </button>
      </div>
    </div>

    );
};

export default Pgination ;