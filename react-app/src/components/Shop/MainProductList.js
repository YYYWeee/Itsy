import "./MainProductList.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllItemsThunk } from "../../store/item";

function randomPick(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}



function MainProductList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user)

  let items = Object.values(
    useSelector((state) => (state.items.allItems ? state.items.allItems : {}))
  );
  useEffect(() => {
    dispatch(fetchAllItemsThunk())
  }, [dispatch]);

  // if (!items) return null;
  if (!items.length) return null;

  // items?.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  //sort the items randomly
  items.sort(() => Math.random() - 0.5);
  const shuffledItems = randomPick(items);
  const selectedItems = shuffledItems.slice(0, 6);  // recommended user  6 items

  return (
    <>
      {/* <h1 className="welcome">Welcome</h1> */}
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
                  {/* <div className="img-price-container"> */}
                    <div className="price"><span>${item.price}</span></div>
                  {/* </div> */}
                </div>
              </>
            );
          }
          )}
        </div>

      </div >

    </>
  )



}
export default MainProductList;
