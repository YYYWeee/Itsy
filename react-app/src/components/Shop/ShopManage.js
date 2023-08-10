import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CreateShop from './CreateShop'
import { fetchUserShopThunk } from "../../store/shop"
import ProductList from "./ProductList";
import EditShop from "./EditShop";
import "./ShopManage.css";


const ShopManage = () => {
  const dispatch = useDispatch();
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const user = useSelector(state => state.session.user)
  const shop = useSelector((state) => state.shops.singleShop);

  useEffect(() => {
    dispatch(fetchUserShopThunk());
  }, [dispatch]);

  if (!shop) return null;
  const handleUpdate = (pin) => {

    setShowUpdateForm(true);
  };

  return showUpdateForm === true ? (
    <EditShop shop={shop} setShowUpdateForm2={setShowUpdateForm} />
  ) : (
    <>
      <h1 className="title">Management shop</h1>
      <div className="img-container">
        <img
          src={shop.shop_img}
          alt="preview"
          className="shop-img"
        ></img>
      </div>
      <div className="shop-container">
        <div>
          <h1>{user.username}'s shop</h1>
        </div>
        <div>{shop?.name}</div>
        <div>{shop?.description}</div>
        <button
          className="update-btn"
          onClick={() => handleUpdate(shop)}
        >
          <i className="fa-solid fa-pen-to-square fa-lg"></i>
        </button>
      </div>
      <div className="items-container">
        {shop && <ProductList targetShop={shop} />}
      </div>
    </>
  )
}

export default ShopManage
