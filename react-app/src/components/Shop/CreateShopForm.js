import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { createNewShopThunk } from "../../store/session";
import { Redirect } from "react-router-dom";

import "./CreateShopForm.css";

function CreateShopForm({ setShowCreateForm2 }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState(false);

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [noPicture, setNoPicture] = useState(false);
  const uploadInput = useRef();
  const user_shop = useSelector(state => state.session.user.shop)

  if (user_shop) return <Redirect to="/shop" />;


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

  let preview = null;
  if (photoUrl) preview = <img src={photoUrl} id="preview-shop-img" alt="" />;


  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (image == null) {
      setNoPicture(true);
      return;
    }
    let formData = new FormData();

    formData.append("image", image);
    formData.append("name", name);
    formData.append("description", description);

    const formDataObject = {};
    for (let [key, value] of formData.entries()) {
      formDataObject[key] = value;
    }
    console.log("formData in create shop form", formDataObject);


    const data = await dispatch(createNewShopThunk(formData))
      .then(res => {
        if (res) {
          setErrors(true)
          console.log('data@@@@@@@@', res)
          console.log('errors@@@@@@', errors)
          setHasSubmitted(false);
        }
      })


    setName("");
    // setDescription("");
    // setImage("");
    setHasSubmitted(false);

    // history.push(`/`)
    // if (errors == false) {
    //   history.push(`/shop`);
    // }
  }


  return (
    <>
      <div className="form-page">
        {errors && <div className='error-section'>Looks like this name is already taken.</div>}


        <form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">
          <div className="form-container">
            <div
              id="leftContainer"
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
                      : "Shop image is required."}
                  </div>
                </div>
              )}
            </div>


            <div className="rightContainer">
              <div className="saveButton-container">
                <button type="submit" className="saveButton">
                  Save
                </button>
              </div>
              <div>
                <div>Name your shop</div>
                <div>Don't sweat it! You can just draft a name now and change it later. We find sellers often draw inspiration from what they sell, their style, pretty much anything goes</div>
              </div>
              <input
                className="name"
                type="text"
                value={name}
                placeholder="Enter your shop name"
                onChange={(e) => setName(e.target.value)}
                required
              ></input>
              <input
                className="description"
                value={description}
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              ></input>
              {/* {isInUseName && <div className='error-section'>Looks like this name is already taken.</div>} */}
            </div>
          </div>
        </form>
      </div>
    </>
  )






}


export default CreateShopForm;
