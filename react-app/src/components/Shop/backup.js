import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ShopManage from './ShopManage'
import CreateShop from './CreateShop'
import { fetchUserShopThunk } from "../../store/shop"
import { getAllShopsThunk } from "../../store/shop"

import ProductList from "./ProductList";

import "./shop.css";


const Shop = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user)
  const shop = useSelector((state) => state.shops.singleShop);
  const shopArray = Object.values(shop)

  const user_shop = useSelector(state => state.session.user.shop)
  console.log('user_shop!!!!!!',user_shop)
  console.log('shopArray', shopArray)
  const [loaded, setLoaded] = useState(false);


  useEffect(() => {
    dispatch(fetchUserShopThunk()).then(() => setLoaded(true));
  }, [dispatch]);

  if (!loaded) return null
  if (!shop) return null;
  // if (!user_shop) return null;

  return (
    <>
      {loaded && shopArray.length > 1 && (
        < div className="shop-container" >
          <img
            src={shop.shop_img}
            alt="preview"
            className="shop-img"
          ></img>
          <div className="shop-info">
            <div>
              <h1>{user.username}'s shop</h1>
            </div>
            <div>{shop?.name}</div>
            <div>{shop?.description}</div>
          </div>
          <div className="items-container">
            {/* {shop && <ProductList targetShop={shop} />} */}
          </div>
        </div>
      )}

      {!user_shop && (
        < div className="no-shop-container" >
          <div>
            {user.username}, you have no Shop now...
          </div>
          <div
            className="create-shop-button-no-shop"
            onClick={() => history.push('/create-shop-form')}
          >
            Create a Shop
          </div>

        </div>
      )
      }
    </>
  )

}

export default Shop
