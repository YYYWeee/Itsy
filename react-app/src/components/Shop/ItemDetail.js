import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { fetchOneItemThunk } from "../../store/item";
import { saveItemToCartThunk } from "../../store/cart";
import { fetchAllItemsInCartThunk } from "../../store/cart"
import PageNotFound from "../PageNotFound/PageNotFound"


import "./ItemDetail.css";

function ItemDetail() {
  const { itemId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const targetItem = useSelector((state) =>
    state.items.singleItem ? state.items.singleItem : {}
  );
  let targetItemArray = Object.values(
    useSelector((state) =>
      state.items.singleItem ? state.items.singleItem : {}
    )
  );
  if (targetItemArray.length < 1) {
    console.log('no such item')

  }

  console.log('$$$$$$$$$$$$', targetItemArray)

  const [bigImg, setBigImg] = useState(targetItem.img_1)     //modify ?
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    console.log('Toggle modal clicked');
    setModal(!modal);

    setTimeout(() => {
      setModal(false)
    }, 5000)
  };

  useEffect(() => {
    dispatch(fetchOneItemThunk(itemId))
      .then(res => {
        setBigImg(targetItem.img_1)
      })

    dispatch(fetchAllItemsInCartThunk());
  }, [dispatch, itemId, targetItem.img_1]);


  const handleAddToCart = async (itemId) => {

    if (sessionUser) {

      console.log('Click on add to cart')
      await dispatch(saveItemToCartThunk(itemId))
      await dispatch(fetchAllItemsInCartThunk());
      toggleModal();

    } else {
      alert('Please sign in to add item to your cart.');
    }
  }

  const handleKeepShopping = async () => {
    toggleModal();
  }
  const handleViewCart = async () => {
    history.push("/cart");
  }




  return (
    <>
      {targetItemArray.length < 1 ? <PageNotFound /> :
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

            {/* <button className="addBtn" onClick={() => alert("Feature Coming Soon...")}>Add to cart</button> */}
            <button className="addBtn" onClick={() => handleAddToCart(targetItem.id)}>Add to cart</button>
            <div className="item-description">{targetItem.description}</div>
          </div>
          {modal && (
            <div className="modal-container right-aligned">
              <div onClick={toggleModal} className="overlay"></div>
              <div>
                <div className="item-detail-info">
                  <div className="cart-img-container">
                    <img className="cart-item-img" src={targetItem.img_1} />
                    <i className="fa-solid fa-circle-check"></i>
                  </div>
                  <div className="cart-item-text">1 item added to cart</div>
                  <div className="cart-button-container">
                    <div className="keep-shopping-btn" onClick={handleKeepShopping}>keep shopping</div>
                    <div className="viewBtn" onClick={handleViewCart}>View Cart & check out</div>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      }
    </>
  )
}


export default ItemDetail;
