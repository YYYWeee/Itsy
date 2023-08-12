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
  const [lengthError, setLengthError] = useState(false)
  const [descriptionError, setDescriptionError] = useState(false)

  useEffect(() => {
    setLengthError(name.length < 4)
  }, [name])
  useEffect(() => {
    setDescriptionError(description.length < 20)
  }, [description])


  if (user_shop) return <Redirect to="/shop" />;

  const handleName = e => {
    if (e.target.value.length <= 20 && /^[a-zA-Z0-9]*$/.test(e.target.value)) setName(e.target.value)
  }

  const handleDescription = e => {
    if (e.target.value.length <= 500) setDescription(e.target.value)
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

  let preview = null;
  if (photoUrl) preview = <img src={photoUrl} id="preview-shop-img" alt="" />;


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!lengthError && !descriptionError) {
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
      // console.log('data!!!!!', data)

      if (data['errors']) {
        console.log('here')
        setErrors(true)
      } else {
        setName("");
        setHasSubmitted(false);
        history.push(`/shop`);
      }
    }
  }

  return (
    <>
      <div className="form-page">
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
                      ? "Click to upload. The recommended size for shop icons is 500 x 500px"
                      : "Shop Profile image is required."}
                  </div>
                </div>
              )}
            </div>


            <div className="rightContainer">
              <div className="saveButton-container">
                <button type="submit" className="saveButton" disabled={descriptionError}>
                  Save
                </button>
              </div>
              <div>
                <div><h1>Name your shop</h1></div>
                <div>Don't sweat it! You can just draft a name now and change it later. We find sellers often draw inspiration from what they sell, their style, pretty much anything goes</div>
              </div>
              <input
                className="name"
                type="text"
                value={name}
                placeholder="Enter your shop name"
                // onChange={(e) => setName(e.target.value)}
                onChange={handleName}
                required
              ></input>
              {errors && <div className='error-section'>Looks like this name is already taken.</div>}
              {lengthError && <div className='error-section'><i className="fa-solid fa-triangle-exclamation fa-xl"></i>Name should be between 4-20 characters</div>}
              <textarea
                className="description"
                value={description}
                placeholder="Description"
                // onChange={(e) => setDescription(e.target.value)}
                onChange={handleDescription}
              />

              {/* </input> */}
              {descriptionError && <div className='error-section'><i className="fa-solid fa-triangle-exclamation fa-xl"></i>Description should be between 20-500 characters</div>}
            </div>
          </div>
        </form>
      </div>
    </>
  )






}


export default CreateShopForm;
