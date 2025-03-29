import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../store/slices/wishlist";

const WishlistButton = ({ movie}) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlistIds || []);
  console.log(wishlist);
  const isInWishlist =  movie && wishlist.some((item) => item.id === movie.id);
  console.log(isInWishlist)

  const toggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(movie));
    } else {
      dispatch(addToWishlist(movie));
    }
  };
 
  return (
    <span
      onClick={toggleWishlist}
      style={{ cursor: "pointer", fontSize: "1.5rem", color: isInWishlist ? "#f4d03f" : "black" }}
      className="col-2"
    >
      {isInWishlist ? <FaHeart /> : <FaRegHeart />}
    </span>
  );
};

export default WishlistButton;
