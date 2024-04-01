import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { fetchOneItemThunk } from "../../store/item";
import { saveItemToCartThunk } from "../../store/cart";
import { fetchAllItemsInCartThunk } from "../../store/cart"
import PageNotFound from "../PageNotFound/PageNotFound"
import Spinner from "../Spinner/Spinner"

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

  const [isLoading, setIsLoading] = useState(true); //for spinner


  const [bigImg, setBigImg] = useState(targetItem.img_1)     //modify ?
  const [modal, setModal] = useState(false);

  const [showMore, setShowMore] = useState(false);

  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const magnifierHeight = 100;
  const magnifieWidth = 100;
  const zoomLevel = 1.5;


  const toggleModal = () => {
    // console.log('Toggle modal clicked');
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
      .then(() => setIsLoading(false))

    dispatch(fetchAllItemsInCartThunk());
  }, [dispatch, itemId, targetItem.img_1]);


  const handleAddToCart = async (itemId) => {

    if (sessionUser) {


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

  if (targetItemArray.length < 1 && !isLoading) {
    return <PageNotFound />
  }

  const handleMouseMove = (e) => {
    const elem = e.currentTarget;
    const { top, left } = elem.getBoundingClientRect();

    // calculate cursor position on the image
    const x = e.pageX - left - window.scrollX;
    const y = e.pageY - top - window.scrollY;
    console.log('x,y', [x, y])

    setXY([x, y]);


  };

  const handleMouseEnter = (e) => {
    const elem = e.currentTarget;
    const { width, height } = elem.getBoundingClientRect();
    setSize([width, height]);
    setShowMagnifier(true);

  };

  const handleMouseLeave = (e) => {
    // close magnifier
    setShowMagnifier(false);

  };

  return (
    <>
      {/* {isLoading && <Spinner />} */}
      {/* {targetItemArray.length < 1 ? <PageNotFound /> : */}
      {!isLoading && (
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
            <div className="item-main-image"  style={{
        position: "relative"}}>
              {/* <img className='main-img' id='imageBox' src={targetItem.img_1} alt='product image' /> */}
              <img className='main-img' id='imageBox' src={bigImg} alt='product image'
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave} />


              <div
                style={{
                  display: showMagnifier ? "" : "none",
                  position: "absolute",

                  // prevent maginier blocks the mousemove event of img
                  pointerEvents: "none",
                  // set size of magnifier
                  height: `${magnifierHeight}px`,
                  width: `${magnifieWidth}px`,
                  // move element center to cursor pos
                  top: `${y - magnifierHeight / 2}px`,
                  left: `${x - magnifieWidth / 2}px`,


                  opacity: "1", // reduce opacity so you can verify position
                  border: "1px solid lightgray",
                  backgroundColor: "white",
                  backgroundImage: `url('${bigImg}')`,   // src={bigImg}
                  backgroundRepeat: "no-repeat",

                  //calculate zoomed image size
                  backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,

                  //calculete position of zoomed image.
                  backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`, // `-${(offsetX - paddingX) * ratioX}px`
                  backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`
                  // imageMagnifyContainer.style.backgroundPosition = `-${(offsetX - paddingX) * ratioX}px -${(offsetY - paddingY) * ratioY}px`;
                }}
              ></div>


            </div>
          </div>

          <div className="detailContainer">
            <div className="item-price">${targetItem.price}</div>
            <div className="item-title">{targetItem.title}</div>
            <div className="shop-name">{targetItem.shop}</div>
            {/* <div className="product-rating" onClick={() => alert("Feature Coming Soon...")}>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star-half-alt"></i>
              <span>4.6(281)</span>
            </div> */}

            {/* <button className="addBtn" onClick={() => alert("Feature Coming Soon...")}>Add to cart</button> */}
            <button className="addBtn" onClick={() => handleAddToCart(targetItem.id)}>Add to cart</button>
            {/* <div className="item-description">{targetItem.description}</div> */}
            <div className={`item-description ${showMore}`}>
              {showMore ? targetItem.description : <span>{targetItem.description.substring(0, 100)}</span>}
            </div>
            <button className="description-btn" onClick={() => setShowMore(!showMore)}>{showMore ? "Less" : "Learn more about this item"}</button>



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
      )}
      {isLoading && <Spinner />}
      {/* } */}
    </>
  )
}


export default ItemDetail;
