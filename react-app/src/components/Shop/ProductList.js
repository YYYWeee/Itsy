import { useParams, NavLink, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import "./ProductList.css";


function ProductList({ targetPin }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(state => state.session.user)
  const shop = useSelector((state) => state.shops.singleShop.shop);
  const items = useSelector((state) => state.shops.singleShop.products); //array

  const [showUpdateForm, setShowUpdateForm] = useState(false);

  if (!items) return null;

  const handleAddProduct = () => {
    history.push(`/items/new`);
    window.scrollTo(0, 0);
  };

  const handleUpdate = (pin) => {
    // setShowUpdateForm(true);
  };

  return (
    <>
      <div className="page-container">
        <div className="top-container">
          <h1> Product list</h1>
          <div className="create-item-btn">
            <button onClick={handleAddProduct}>Add product</button>
          </div>
        </div>

        {items.length ?
          (<div className="items-container">
            {items.map((item) => {
              return (
                <>
                  <div className="single-product-container" key={item.id}
                    onClick={() => history.push(`/listings/${item.id}`)}>
                    {/* <Link to={`/listings/${item.id}`}> */}

                    <img
                      className="preview-image"
                      src={item.img_1}
                      alt={item.img_1}
                    />
                    {/* </Link> */}
                    <div className="price">${item.price}</div>
                    <div>
                      <button
                        className="update-btn"
                        onClick={() => handleUpdate(shop)}
                      >
                        <i className="fa-solid fa-pen-to-square fa-lg"></i>
                      </button>
                    </div>
                  </div>
                </>
              );
            }
            )}
          </div>) : (
            <div>
              <div><h2>Your don't have any items in your shop</h2></div>
              {/* <div className="create-item-btn-container">
                <button onClick={handleAddProduct} className="create-item-btn">Add product</button>
              </div> */}
            </div>
          )}
      </div>
    </>
  )
}

export default ProductList;
