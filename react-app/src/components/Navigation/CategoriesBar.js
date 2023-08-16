import { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import './Navigation.css';


function CategoriesBar() {

  return (
    <>
      <div className="navCategoryContainer">
        <ul className="categories">
          <li className="category"  onClick={() => alert("Feature coming soon!")}>Home Favorites</li>
          <li className="category"  onClick={() => alert("Feature coming soon!")}>Jewelry & Accessories</li>
          <li className="category"  onClick={() => alert("Feature coming soon!")}>Clothing & Shoes</li>
          <li className="category"  onClick={() => alert("Feature coming soon!")}>Home & Living</li>
          <li className="category"  onClick={() => alert("Feature coming soon!")}>Wedding & Party</li>
          <li className="category"  onClick={() => alert("Feature coming soon!")}>Toys & Entertainment</li>
          <li className="category"  onClick={() => alert("Feature coming soon!")}>Art & Collectibles</li>
          <li className="category"  onClick={() => alert("Feature coming soon!")}>Craft Supplies</li>
        </ul>
      </div>
    </>
  )

}
export default CategoriesBar;
