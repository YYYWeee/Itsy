
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllItemsThunk } from "../../store/item";

import "./LandingPage.css";
function randomPick(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}




function LandingPage() {
  const dispatch = useDispatch();
  const history = useHistory();


  let items = Object.values(
    useSelector((state) => (state.items.allItems ? state.items.allItems : {}))
  );
  useEffect(() => {
    dispatch(fetchAllItemsThunk())
  }, [dispatch]);

  if (!items) return null;

  items.sort(() => Math.random() - 0.5);
  const shuffledItems = randomPick(items);
  const selectedItems = shuffledItems.slice(0, 6);  // recommended user  6 items




  return (
    <>
      <div className="home-page-container">
        {/* <h1 className="landing-title">Fresh finds fit for cozy season.</h1> */}
        <div className="homepage-banner">
          <h1>Fresh finds fit for cozy season</h1>
          <button
            onClick={() => history.push(`/listings`)}
          >
            Shop
            <i className="fa fa-caret-right" aria-hidden="true"></i>
          </button>
        </div>
        <div className="recommend-section">
          <h3>You might be interested in</h3>
          <ul className="category-conteiner">
                        <li >
                            <div id="art" onClick={() => history.push(`/category/Art`)}></div>
                            <h4>Art</h4>
                        </li>
                        <li >
                            <div id="toys" onClick={() => history.push(`/category/Toys`)}></div>
                            <h4>Toys</h4>
                        </li>
                        <li >
                            <div id="clothings" onClick={() => history.push(`/category/Clothing`)}></div>
                            <h4>Clothing</h4>
                        </li>
                        <li >
                            <div id="jewelry" onClick={() => history.push(`/category/Jewelry`)}></div>
                            <h4>Jewelry</h4>
                        </li>
                        <li >
                            <div id="wedding" onClick={() => history.push(`/category/Wedding`)}></div>
                            <h4>Wedding</h4>
                        </li>

                    </ul>


        </div>
      </div>
    </>
  )
}

export default LandingPage;
