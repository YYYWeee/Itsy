import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { updateItemThunk } from "../../store/shop";
import { deleteItemThunk } from "../../store/shop";
import { fetchUserShopThunk } from "../../store/shop"
import { useParams } from "react-router-dom";
import { fetchOneItemThunk } from "../../store/item";
import OpenModalButton from "../OpenModalButton";
import DeleteItemModal from "./DeleteItemModal";
import "./EditItem.css";

function EditItem() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState(false);

  const [lengthError, setLengthError] = useState(false)
  const [descriptionError, setDescriptionError] = useState(false)


  const [modal, setModal] = useState(false);
  const toggleModal = () => {

    setModal(!modal);
  };


  const { itemId } = useParams();


  useEffect(() => {
    const res = dispatch(fetchOneItemThunk(itemId));
    // window.scroll(0, 0);
  }, []);

  const sessionUser = useSelector((state) => state.session.user);
  const targetShop = useSelector((state) =>
    state.shops.singleShop.shop ? state.shops.singleShop.shop : {}
  );

  const items = useSelector((state) =>
    state.shops.singleShop.products ? state.shops.singleShop.products : {}
  );

  const targetItem = useSelector((state) =>
    state.items.singleItem ? state.items.singleItem : {}
  );

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);

  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [photo, setPhoto] = useState(null);
  const [photo2, setPhoto2] = useState(null);
  const [photo3, setPhoto3] = useState(null);

  const [photoUrl, setPhotoUrl] = useState(null);
  const [photoUrl2, setPhotoUrl2] = useState(null);
  const [photoUrl3, setPhotoUrl3] = useState(null);

  const [noPicture, setNoPicture] = useState(false);
  const [noPicture2, setNoPicture2] = useState(false);
  const [noPicture3, setNoPicture3] = useState(false);

  const uploadInput = useRef();
  const uploadInput2 = useRef();
  const uploadInput3 = useRef();

  useEffect(() => {
    setTitle(targetItem.title)
    setPrice(targetItem.price)
    setDescription(targetItem.description)

    setImage(targetItem.img_1)
    setImage2(targetItem.img_2)
    setImage3(targetItem.img_3)

    setPhoto(targetItem.img_1)
    setPhoto2(targetItem.img_2)
    setPhoto3(targetItem.img_3)

    setPhotoUrl(targetItem.img_1)
    setPhotoUrl2(targetItem.img_2)
    setPhotoUrl3(targetItem.img_3)

    setNoPicture(false)
    setNoPicture2(false)
    setNoPicture3(false)

  }, [targetItem]);

  useEffect(() => {
    setLengthError(title?.length < 4)
  }, [title])

  useEffect(() => {
    setDescriptionError(description?.length < 20)
  }, [description])


  const handleTitle = e => {
    if (e.target.value.length <= 20) setTitle(e.target.value)
  }

  const handleDescription = e => {
    if (e.target.value.length <= 1000) setDescription(e.target.value)
  }
  const handlePrice = e => {
    if (e.target.value < 100000 && /^[0-9]*$/.test(e.target.value)) setPrice(e.target.value)
  }

  const handlePhoto = async ({ currentTarget }) => {
    if (currentTarget.files[0]) {
      setImage(currentTarget.files[0]);
      setPhoto(currentTarget.files[0]);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(currentTarget.files[0]);
      fileReader.onload = () => setPhotoUrl(fileReader.result);
      setNoPicture(false);
    }
  };

  const handlePhoto2 = async ({ currentTarget }) => {
    if (currentTarget.files[0]) {
      setImage2(currentTarget.files[0]);
      setPhoto2(currentTarget.files[0]);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(currentTarget.files[0]);
      fileReader.onload = () => setPhotoUrl2(fileReader.result);
      setNoPicture2(false);
    }
  };

  const handlePhoto3 = async ({ currentTarget }) => {
    if (currentTarget.files[0]) {
      setImage3(currentTarget.files[0]);
      setPhoto3(currentTarget.files[0]);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(currentTarget.files[0]);
      fileReader.onload = () => setPhotoUrl3(fileReader.result);
      setNoPicture3(false);
    }
  };


  let preview = null;
  if (photoUrl) preview = <img src={photoUrl} id="preview-product-img" alt="" />;

  let preview2 = null;
  if (photoUrl2) preview2 = <img src={photoUrl2} id="preview-product2-img" alt="" />;

  let preview3 = null;
  if (photoUrl3) preview3 = <img src={photoUrl3} id="preview-product3-img" alt="" />;

  useEffect(() => {
    const errorsArray = [];
    // console.log('!!!!!!!!', isNaN(price))
    if (!price) {
      errorsArray.push("Price is required")
    } else if (isNaN(price)) {
      errorsArray.push("Invalid price")
    } else if (price * 1 <= 0) {
      errorsArray.push('Price should be greater than 0')
    }
    setErrors(errorsArray);
  }, [price])


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!lengthError && !descriptionError) {
      setHasSubmitted(true);
      if (image == null && image2 == null && image3 == null) {
        setNoPicture(true);
        setNoPicture2(true);
        setNoPicture3(true);
        return;
      } else if (image == null && image2 == null) {
        setNoPicture(true);
        setNoPicture2(true);
        return
      } else if (image == null && image3 == null) {
        setNoPicture(true);
        setNoPicture3(true);
        return
      } else if (image2 == null && image3 == null) {
        setNoPicture2(true);
        setNoPicture3(true);
        return
      } else if (image == null) {
        setNoPicture(true);
        return
      } else if (image2 == null) {
        setNoPicture2(true);
        return
      } else if (image3 == null) {
        setNoPicture3(true);
        return
      }

      let formData = new FormData();
      formData.append("image", image);
      formData.append("image2", image2);
      formData.append("image3", image3);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);


      const formDataObject = {};
      for (let [key, value] of formData.entries()) {
        formDataObject[key] = value;
      }
      // console.log("formData in update item form ~~~~~~~~~~~~~", formDataObject);  //collect correct info

      const data = await dispatch(updateItemThunk(formData, itemId))
      // console.log('here!!!!!!!!!!!!!!', data)
      // if (data.id) {
      //   history.push(`/shop`);
      // }

      history.push(`/shop`);
    }

  }

  const handleCancel = async (e) => {
    history.push(`/shop`);
  };

  const handleBack = async (e) => {
    history.push(`/shop`);
  };


  const handleDelete = async (e) => {
    // console.log('in handle Delete')
    const data = await dispatch(deleteItemThunk(itemId));
    toggleModal();
    history.push(`/shop`);
  };


  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      {targetItem.shop_id == sessionUser.shop &&
        (<div className="form-page">
          {/* <form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data"> */}
          {/* <form onSubmit={handleSubmit} encType="multipart/form-data"> */}
          <form encType="multipart/form-data" onSubmit={(e) => e.preventDefault()}>
            <div className="form-container">
              <div className="image-container">

                {/* first image */}
                <div
                  id="first-image-Container"
                  className={noPicture ? "no-picture cursor" : "cursor"}
                  onClick={() => uploadInput.current.click()}
                >
                  <input
                    className="uploadButton"
                    id="image"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/gif"
                    onChange={handlePhoto}
                    ref={uploadInput}
                    style={{ display: "none" }}
                  />
                  {preview || (
                    <div
                      id="upload-sign-box-text"
                      className={noPicture ? "no-picture" : ""}
                    >
                      <i className="fa-solid fa-upload"></i>
                      <div>
                        {!noPicture
                          ? "Click to upload."
                          : "Product image is required."}
                      </div>
                    </div>
                  )}
                </div>
                {/* first image end */}

                {/* second image */}

                <div
                  id="second-image-Container"
                  className={noPicture2 ? "no-picture2 cursor" : "cursor"}
                  onClick={() => uploadInput2.current.click()}
                >
                  <input
                    className="uploadButton"
                    id="image2"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/gif"
                    onChange={handlePhoto2}
                    ref={uploadInput2}
                    style={{ display: "none" }}
                  />
                  {preview2 || (
                    <div
                      id="upload-sign-box-text"
                      className={noPicture2 ? "no-picture2" : ""}
                    >
                      <i className="fa-solid fa-upload"></i>
                      <div>
                        {!noPicture2
                          ? "Click to upload."
                          : "Product image is required."}
                      </div>
                    </div>
                  )}
                </div>

                {/* second image end */}

                {/* third image  */}
                <div
                  id="third-image-Container"
                  className={noPicture3 ? "no-picture3 cursor" : "cursor"}
                  onClick={() => uploadInput3.current.click()}
                >
                  <input
                    className="uploadButton"
                    id="image"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/gif"
                    onChange={handlePhoto3}
                    ref={uploadInput3}
                    style={{ display: "none" }}
                  />
                  {preview3 || (
                    <div
                      id="upload-sign-box-text"
                      className={noPicture3 ? "no-picture3" : ""}
                    >
                      <i className="fa-solid fa-upload"></i>
                      <div>
                        {!noPicture3
                          ? "Click to upload."
                          : "Product image is required."}
                      </div>
                    </div>
                  )}
                </div>
                {/* third image end */}
              </div>
              <div className="product-detail-Container">
                <div>
                  <h1>Update your listing</h1>
                  <div>Add some photos and details about your item. </div>
                  <div>Fill out what you can for now—you'll be able to edit this later.</div>
                </div>

                <input
                  className="name"
                  type="text"
                  value={title}
                  placeholder="Title"
                  // onChange={(e) => setTitle(e.target.value)}
                  onChange={handleTitle}
                  required
                ></input>
                {lengthError && <div className='error-section'><i className="fa-solid fa-triangle-exclamation fa-xl"></i>Name should be between 4-200 characters</div>}
                <textarea
                  className="description"
                  value={description}
                  placeholder="Description"
                  // onChange={(e) => setDescription(e.target.value)}
                  onChange={handleDescription}
                />
                {descriptionError && <div className='error-section'><i className="fa-solid fa-triangle-exclamation fa-xl"></i>Description should be between 20-1000 characters</div>}
                <input
                  className="price-update-form"
                  value={price}
                  placeholder="Price"
                  style={{ textAlign: 'right' }}
                  // onChange={(e) => setPrice(e.target.value)}
                  onChange={handlePrice}

                ></input>
                <p className='errors'>{errors && errors.filter((validation) =>
                  validation.includes("required"))}</p>
                <p className='errors'>{errors && errors.filter((validation) =>
                  validation.includes("Invalid"))}</p>
                <p className='errors'>{errors && errors.filter((validation) =>
                  validation.includes("greater"))}</p>
              </div>



              <div className="button-container">

                <button onClick={() => { toggleModal();  }} className="deleteButton">
                  Delete
                </button>


                {modal && (
                  <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                      <h2>Are you sure you want to delete?</h2>
                      {/* <p>
                      Once you delete a Item, you can't undo it!
                      </p> */}
                      <button className="cancel-btn" onClick={toggleModal}>
                        cancel
                      </button>
                      <button className="del-btn" onClick={() => {  handleDelete(); }}>
                        delete
                      </button>
                    </div>
                  </div>
                )}
                {/* delete button end */}

                <div className="right-btn">
                  <button
                    className="cancel-button"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="saveButton" disabled={errors.length > 0} onClick={handleSubmit} >
                    Save
                  </button>

                </div>
              </div>
            </div>
          </form>

        </div>)}


    </>
  )

}
export default EditItem;
