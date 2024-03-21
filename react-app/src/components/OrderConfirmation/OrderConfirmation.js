import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadNewestOldOrderThunk } from "../../store/orders"
import SingleOrder from "../OrderHistory/SingleOrder";


import "./OrderConfirmation.css";

function OrderConfirmation() {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();
  let lastestOldOrders = useSelector((state) => state.orders.newest_old_order ? state.orders.newest_old_order : {})
  let latestOrderitems = Object.values(
    useSelector((state) =>
      state.orders.newest_old_order.order_items
        ? state.orders.newest_old_order.order_items
        : {}
    )
  );   //array
  // console.log('!@@@@@@@@@', latestOrderitems)

  useEffect(() => {
    const res = dispatch(loadNewestOldOrderThunk());
    window.scroll(0, 0);
  }, [dispatch])

  return (
    <>
      <div className="order-confirmation-page">

        <img className="greenCheckMark" src='https://projectpin.s3.amazonaws.com/91145f6c556d48f9893b3aa5151a7df2.png' />
        <h1 className="title-order-confirm">Thank you! Your order is confirmed.</h1>
        <div className="sub-title-order-confirm">You'll receive a confirmation email with your order number shortly.</div>
        <div className="order-info-box">
          <div className="customer-info">
            <h2 className="customer-info-title">Customer Information</h2>
            <div>
              {sessionUser.username}
            </div>
            <div>
              {sessionUser.email}
            </div>
            <div>
              Shipping address: {lastestOldOrders.shipping_address}
            </div>
          </div>
          <div className="order-info">
            <div className="item-list">
              {latestOrderitems.map((item, index) => (
                <>
                  <div className="single-item">
                    <img className="preview-image-cart" src={item.product_img} onClick={() => history.push(`/listings/${item.product_id}`)} />
                    {/* <div>{item.product_name}</div> */}
                  </div>
                  <div className="order-right-container">
                    <div>{item.product_name}</div>
                    <div>Quantity: {item.quantity}</div>
                    <div>$: {item.product_price * item.quantity}</div>
                  </div>
                </>
              ))}

            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default OrderConfirmation;
