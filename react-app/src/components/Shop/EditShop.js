import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { updateShopThunk } from "../../store/session";
import { deleteShopThunk } from "../../store/session"
import { fetchUserShopThunk } from "../../store/shop"
import OpenModalButton from "../OpenModalButton";
import DeleteShopModal from "./DeleteShopModal";
import "./EditShop.css";

function EditShop({ shop, setShowUpdateForm2 }) {


  const history = useHistory();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState(false);

  const [showMenu, setShowMenu] = useState(false);
  const ulRef1 = useRef();
  const closeMenu = () => setShowMenu(false);

  const sessionUser = useSelector((state) => state.session.user);
  const targetShop = useSelector((state) =>
    state.shops.singleShop.shop ? state.shops.singleShop.shop : {}
  );


  useEffect(() => {
    setName(targetShop.name);
    setDescription(targetShop.description);

  }, [targetShop]);

  const [showUpdateForm, setShowUpdateForm] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);


  const [modal, setModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    let payload = {
      name: name,
      description: description,
    };
    // await dispatch(updateShopThunk(payload))
    // await dispatch(fetchUserShopThunk())
    // -----------------------------test
    const data = await dispatch(updateShopThunk(payload))
      .then(res => {
        if (res) {
          setErrors(true)
          setHasSubmitted(false);
          setShowUpdateForm(true);
          setShowUpdateForm2(true);
        }
      })
    await dispatch(fetchUserShopThunk())

    setName("");
    setHasSubmitted(true);


    // -----------------------------test
    if (hasSubmitted) {
      setShowUpdateForm(false);
      setShowUpdateForm2(false);
      history.push(`/shop`);
    }

  }
  const handleCancel = async (e) => {
    setShowUpdateForm2(false);
  };


  const handleDelete = async (e) => {
    await dispatch(deleteShopThunk());
    await dispatch(fetchUserShopThunk());
    history.push(`/shop`);
  };

  return (
    <>
      {showUpdateForm && (
        <div>
          <div className="form-page">
            {errors && <div className='error-section'>Looks like this name is already taken.</div>}
            <div className="update-form-container-including-title">
              <h1 className="edit-this-pin">Edit this Shop</h1>
              <div className="update-form-container">
                <form className="edit-pin" onSubmit={handleSubmit}>
                  <div className="big-container">
                    <div className="left-container">
                      <div className="title-area error">
                        <label>Name</label>
                        <input
                          type="text"
                          name="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="description-area">
                        <label>Description </label>
                        <textarea
                          type="text"
                          className="text-input-box"
                          name="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Description "
                        />
                      </div>
                    </div>
                    <div className="right-container">
                      <div className="pic-container">
                        <img
                          src={
                            shop?.shop_img ? shop.shop_img : "no preview img"
                          }
                          alt="No pin preview"
                          className="pic"
                        />
                      </div>
                    </div>
                  </div>
                </form>
                <div className="button-container">
                  {/* delete button */}
                  <div className="left-btn" ref={ulRef1}>
                    <OpenModalButton
                      buttonText="Delete"
                      onItemClick={closeMenu}
                      modalComponent={<DeleteShopModal shop={targetShop} />}
                    />
                  </div>
                  {/* delete button */}

                  <div className="right-btn">
                    <button
                      className="cancel-button cursor a90"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button
                      className="save-button cursor a90"
                      type="submit"
                      onClick={handleSubmit}
                    // disabled={errors.length > 0}
                    >
                      Save
                    </button>
                  </div>




                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default EditShop;
