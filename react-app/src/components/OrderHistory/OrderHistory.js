import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadAllOldOrdersThunk } from "../../store/orders";
import { loadNewestOldOrderThunk } from "../../store/orders";

import "./OrderHistory.css";

function OrderHistory() {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllOldOrdersThunk());

  }, [dispatch]);
  // dispatch(loadNewestOldOrderThunk())
  // dispatch(fetchAllItemsInCartThunk())
  return (
    <>
      <h1 className="order-history-page-title">order history</h1>

    </>
  )
}

export default OrderHistory;
