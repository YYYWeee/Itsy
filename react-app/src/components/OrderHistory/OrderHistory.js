import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./OrderHistory.css";

function OrderHistory() {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <>
      <h1 className="order-history-page-title">order history</h1>

    </>
  )
}

export default OrderHistory;
