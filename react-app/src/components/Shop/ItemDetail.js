import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { fetchOneItemThunk } from "../../store/item";

import "./ItemDetail.css";

function ItemDetail() {
  const { itemId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);
  const targetItem = useSelector((state) =>
    state.items.singleItem ? state.items.singleItem : {}
  );
  useEffect(() => {
    const res = dispatch(fetchOneItemThunk(itemId));
    window.scroll(0, 0);
  }, []);

  return (
    <>

      <div className="item-container">
        <div className="image-container-item-detail-page">
          <div className="item-sub-images">
            <div className="small-img-container">
              <img className='small-img' src={targetItem.img_2} alt='product image' />
            </div>
            <div className="small-img-container">
              <img className='small-img' src={targetItem.img_3} alt='product image' />
            </div>
          </div>
          <div className="item-main-image">
            <img className='main-img' src={targetItem.img_1} alt='product image' />
          </div>
        </div>

        <div className="detailContainer">
          <div className="item-title">{targetItem.title}</div>
          <div className="shop-name">{targetItem.shop}</div>
          <div className="item-price">{targetItem.price}</div>

          <button className="addBtn">Add to cart</button>
          <div className="item-description">{targetItem.description}</div>
        </div>
      </div>
    </>
  )
}



export default ItemDetail;
