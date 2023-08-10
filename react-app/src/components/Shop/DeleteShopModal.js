import React from "react";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteShopThunk } from "../../store/session"
import { fetchUserShopThunk } from "../../store/shop"
import "./DeleteShopModal.css";



function DeleteShopModal({ shop }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const targetShop = useSelector((state) =>
    state.shops.singleShop ? state.shops.singleShop : {}
  );

  const handleDelete = async (e) => {
    await dispatch(deleteShopThunk());
    // await dispatch(fetchUserShopThunk());
    closeModal();
    history.push(`/shop`);
  };
  return (
    <>
      <div className="delete-shop">
        <div className="del-title">Delete this Shop?</div>
        <div className="delete-content">
          Once you delete a Shop, you can't undo it!
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


export default DeleteShopModal;
