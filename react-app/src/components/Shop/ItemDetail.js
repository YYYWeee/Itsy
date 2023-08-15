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
  // const [bigImg, setBigImg] = useState('')
  const sessionUser = useSelector((state) => state.session.user);
  const targetItem = useSelector((state) =>
    state.items.singleItem ? state.items.singleItem : {}
  );
  // const mainpic = targetItem.img_1
  const [bigImg, setBigImg] = useState(targetItem.img_1)

  useEffect(() => {
    // const res = dispatch(fetchOneItemThunk(itemId));
    dispatch(fetchOneItemThunk(itemId))
      .then(res => {
        setBigImg(targetItem.img_1)
      })
  }, [dispatch, itemId, targetItem.img_1]);




  return (
    <>

      <div className="item-container">
        <div className="image-container-item-detail-page">
          <div className="item-sub-images">
            <div className="small-img-container">
              <img className='small-img' src={targetItem.img_1} alt='product image' onClick={() => setBigImg(targetItem.img_1)} />
            </div>
            <div className="small-img-container">
              <img className='small-img' src={targetItem.img_2} alt='product image' onClick={() => setBigImg(targetItem.img_2)} />
            </div>
            <div className="small-img-container">
              <img className='small-img' src={targetItem.img_3} alt='product image' onClick={() => setBigImg(targetItem.img_3)} />
            </div>
          </div>
          <div className="item-main-image">
            {/* <img className='main-img' id='imageBox' src={targetItem.img_1} alt='product image' /> */}
            <img className='main-img' id='imageBox' src={bigImg} alt='product image' />
          </div>
        </div>

        <div className="detailContainer">
          <div className="item-price">${targetItem.price}</div>
          <div className="item-title">{targetItem.title}</div>
          <div className="shop-name">{targetItem.shop}</div>
          <div className="product-rating" onClick={() => alert("Feature Coming Soon...")}>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star-half-alt"></i>
            <span>4.6(281)</span>
          </div>

          <button className="addBtn" onClick={() => alert("Feature Coming Soon...")}>Add to cart</button>
          <div className="item-description">{targetItem.description}</div>
        </div>
      </div>

    </>
  )
}



export default ItemDetail;
