import React from "react";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteItemThunk } from "../../store/shop";
import { fetchUserShopThunk } from "../../store/shop"

import "./DeleteItemModal.css";



function DeleteItemModal({item}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  // const [showDeleteForm, setShowDeleteForm] = useState(true);



  const items = useSelector((state) =>
    state.shops.singleShop.products ? state.shops.singleShop.products : {}
  );

  const targetItem = useSelector((state) =>
    state.items.singleItem ? state.items.singleItem : {}
  );


  const handleDelete = async (e) => {
    const data = await dispatch(deleteItemThunk(item.id));
    // closeModal();
    if ( data == targetItem.id) {
      console.log('after confirm delete',data)
      closeModal();
      history.push(`/shop`);
    }

    // history.push(`/shop`);
  };



  return (
    <>
      <div className="delete-item">
        <div className="del-title">Delete this Item?</div>
        <div className="delete-content">
          Once you delete a Item, you can't undo it!
        </div>
        <div className="del-p-btn">
          <button className="cancel-btn" onClick={closeModal}>
            Cancel
          </button>
          <button className="del-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>



    </>
  )
}

export default DeleteItemModal;
