import { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import './Navigation.css';


function CategoriesBar() {

  return (
    <>
      <div className="navCategoryContainer">
        <ul className="categories">
          <li className="category">Home Favorites</li>
          <li className="category">Jewelry & Accessories</li>
          <li className="category">Clothing & Shoes</li>
          <li className="category">Home & Living</li>
          <li className="category">Wedding & Party</li>
          <li className="category">Toys & Entertainment</li>
          <li className="category">Art & Collectibles</li>
          <li className="category">Craft Supplies</li>
        </ul>
      </div>
    </>
  )

}
export default CategoriesBar;
