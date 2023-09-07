import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSearchItemsThunk } from "../../store/item";


import "./Search.css";

function randomPick(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}




function Search() {
  const { keyword } = useParams();
  console.log('keyword in search component', keyword)
  const dispatch = useDispatch();
  const history = useHistory();


  useEffect(() => {
    dispatch(fetchSearchItemsThunk(keyword))
  }, [dispatch, keyword]);


  let items = Object.values(
    useSelector((state) => (state.items.allItems ? state.items.allItems : {}))
  );
  // if (!items.length) return null;
  //sort the items randomly
  items.sort(() => Math.random() - 0.5);
  const shuffledItems = randomPick(items);


  return (
    <>
      {items.length ?
        <div className="page-container">
          <div className="items-container">
            {items.map((item) => {

              return (
                <>
                  <div className="single-product-container" key={item.id}>

                    <img
                      className="preview-image cursor"
                      src={item.img_1}
                      alt={item.img_1}
                      onClick={() => history.push(`/listings/${item.id}`)}
                    />

                    <div className="price"><span>${item.price}</span></div>

                  </div>
                </>
              );
            }
            )}
          </div>

        </div >



        : <div className="pageNotFound-page">
          <div className="pageNotFound-container">
            <h1 className="error-page-title">Uh oh!</h1>
            <h2 className="error-page-subtitle">Looks like we don't have any match for '{keyword}'</h2>
            <h3>Check the spelling, or try a more general term.</h3>
            <div className="goBack" onClick={() => history.push(`/listings`)}> ← Go back to Itsy.com</div>
          </div>
        </div>


      }
    </>
  )
}


export default Search;
