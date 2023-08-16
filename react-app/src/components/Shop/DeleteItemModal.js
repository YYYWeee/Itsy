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
  // const [showDeleteForm, setShowDeleteForm] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);


  const items = useSelector((state) =>
    state.shops.singleShop.products ? state.shops.singleShop.products : {}
  );

  const targetItem = useSelector((state) =>
    state.items.singleItem ? state.items.singleItem : {}
  );


  const handleDelete = async (e) => {
    console.log('in handle Delete')
    const data = await dispatch(deleteItemThunk(item.id));
    setModalOpen2(false)
    // setModalOpen(false);

  };



  return (
    <>
      {/* <div className="delete-item">
        <div className="del-title">Delete this Item?</div>
        <div className="delete-content">
          Once you delete a Item, you can't undo it!
        </div>
        <div className="del-p-btn">
          <button className="cancel-btn"
          onClick={() => {
            setOpenModal(false);
          }}>
            Cancel
          </button>
          <button className="del-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div> */}

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
