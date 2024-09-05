
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllItemsThunk } from "../../store/item";
import Spinner from "../Spinner/Spinner"

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
  const [isLoading, setIsLoading] = useState(true); //for spinner


  let items = Object.values(
    useSelector((state) => (state.items.allItems ? state.items.allItems : {}))
  );

  useEffect(() => {
    dispatch(fetchAllItemsThunk()).then(() => setIsLoading(false))
  }, [dispatch]);

  if (!items) return null;

  items.sort(() => Math.random() - 0.5);
  const shuffledItems = randomPick(items);
  const selectedItems = shuffledItems.slice(0, 6);  // recommended user  6 items




  return (
    <>
      {!isLoading && (
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
          <div className="sp-two">
            <div>
              <h1 style={{ fontSize: "40px", margin: "0px" }} >Itsy is supporting<br></br>
                independent creators</h1>
              <h2 style={{ fontSize: "20px" }} >A community doing good</h2>
              <p style={{ margin: "0px" }}>There's no Itsy warehouse - just millions of people selling the things they love.</p>

              <button className ='shopbutton'
                onClick={() => history.push(`/listings`)}
              >
                Shop
                <i className="fa fa-caret-right" aria-hidden="true"></i>
              </button>
            </div>
            <img src="https://i.etsystatic.com/inv/37f0ed/6194196042/inv_fullxfull.6194196042_hm1teyp7.jpg?version=0" width="850" height="450"></img>
          </div>
          <div className="sp-three" style={{ backgroundColor: "rgb(254, 241, 238)" }}>
            <img style={{ padding: "10px", }} src="https://i.etsystatic.com/6524482/r/il/dccc8a/6207250508/il_794xN.6207250508_ti2q.jpg" width="750" height="550"></img>
            <div>
              <h1 style={{ fontSize: "40px", margin: "0px" }} >Grab your Halloween <br></br>
                essentials</h1>
              <p style={{ fontSize: "16px" }} >Shop gifts perfect for the occasion!</p>

              <button className="shopbutton"
                onClick={() => history.push(`/listings`)}
              >
                Shop
                <i className="fa fa-caret-right" aria-hidden="true"></i>
              </button>
            </div>
          </div>

        </div>
      )}
      {isLoading && <Spinner />}
    </>
  )
}

export default LandingPage;
