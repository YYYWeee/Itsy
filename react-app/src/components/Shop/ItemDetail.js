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
      <h1>Product detail page</h1>
    </>
  )
}



export default ItemDetail;
