import { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import './Navigation.css';


function CategoriesBar() {

  const history = useHistory();





  return (
    <>
      <div className="navCategoryContainer">
        <ul className="categories">
          {/* <li className="category"  onClick={() => alert("Feature coming soon!")}>Home Favorites</li> */}
          <li className="category"  onClick={() => history.push(`/category/Jewelry`)}>Jewelry & Accessories</li>
          <li className="category"  onClick={() => history.push(`/category/Clothing`)}>Clothing & Shoes</li>
          <li className="category"  onClick={() => history.push(`/category/HomeLiving`)}>Home & Living</li>
          <li className="category"  onClick={() => history.push(`/category/Wedding`)}>Wedding & Party</li>
          <li className="category"  onClick={() => history.push(`/category/Toys`)}>Toys & Entertainment</li>
          <li className="category"  onClick={() => history.push(`/category/Art`)}>Art & Collectibles</li>
          {/* <li className="category"  onClick={() => alert("Feature coming soon!")}>Craft Supplies</li> */}
        </ul>
      </div>
    </>
  )

}
export default CategoriesBar;
