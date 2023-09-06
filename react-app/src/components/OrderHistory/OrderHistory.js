import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadAllOldOrdersThunk } from "../../store/orders";
import { loadNewestOldOrderThunk } from "../../store/orders";
import SingleOrder from "./SingleOrder";

import "./OrderHistory.css";

function OrderHistory() {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();

  let allOldOrders = Object.values(
    useSelector((state) =>
      state.orders.all_old_orders ? state.orders.all_old_orders : {}
    )
  );
  // console.log('##########', allOldOrders)


  useEffect(() => {
    dispatch(loadAllOldOrdersThunk());
  }, [dispatch]);

  allOldOrders.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
//  console.log('##########', allOldOrders)

  return (
    <>
      <div className="history-order-container">
        <h1 className="order-history-page-title">Purchase history</h1>
        {allOldOrders.map((order, index) => (

          <SingleOrder key={index} index={index} order={order} />
        ))}
      </div >
    </>
  )
}

export default OrderHistory;
