import React from "react";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteItemThunk } from "../../store/shop";
import { fetchUserShopThunk } from "../../store/shop"

import "./DeleteItemModal.css";


function DeleteItemModal({ item, setModalOpen2 }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [modalOpen, setModalOpen] = useState(false);


  const items = useSelector((state) =>
    state.shops.singleShop.products ? state.shops.singleShop.products : {}
  );

  const targetItem = useSelector((state) =>
    state.items.singleItem ? state.items.singleItem : {}
  );


  const handleDelete = async (e) => {

    const data = await dispatch(deleteItemThunk(item.id));
    setModalOpen2(false)

  };



  return (
    <>


<div className="modalBackground">

      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setModalOpen2(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Are You Sure You Want to Continue?</h1>
        </div>
        <div className="body">
          <p>The next page looks amazing. Hope you want to go there!</p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setModalOpen2(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button>Continue</button>
        </div>
      </div>
    </div>

    </>
  )
}

export default DeleteItemModal;
