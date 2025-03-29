import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../store/slices/wishlist";

const WishlistButton = ({ movie }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  const isInWishlist = wishlist.some((item) => item.id === movie.id);

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
      style={{ cursor: "pointer", fontSize: "1.5rem", color: isInWishlist ? "#f4d03f" : "gray" }}
      className="col-2"
    >
      {isInWishlist ? <FaHeart /> : <FaRegHeart />}
    </span>
  );
};

export default WishlistButton;
