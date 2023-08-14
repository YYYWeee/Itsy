import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ShopManage from './ShopManage'
import { fetchUserShopThunk } from "../../store/shop"
import "./CreateShop.css";


const CreateShop = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user)

  const handleCreateShop = () => {
    history.push("/shop/new");
    window.scrollTo(0, 0);
  };

  return (
    <>

      <div className="btn-container">
        <h1>You don't have a shop yet...</h1>
        <button onClick={handleCreateShop}>Create Shop</button>
      </div>

    </>
  )
}

export default CreateShop
