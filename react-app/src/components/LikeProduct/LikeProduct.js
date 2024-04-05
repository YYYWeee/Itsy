import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Preview from "../Shop/Preview";

import { fetchAllFavoriteItemsThunk } from "../../store/likes";
import Spinner from "../Spinner/Spinner"
import "./LikeProduct.css";



function LikeProduct() {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true); //for spinner
  let items = Object.values(
    useSelector((state) => (state.likes.allfavItems ? state.likes.allfavItems : {}))
  );


  useEffect(() => {
    dispatch(fetchAllFavoriteItemsThunk()).then(() => setIsLoading(false))
  }, [dispatch]);

  if (!items.length) return null;




  return (
    <>
      {!isLoading && (
        <div className="page-container">
          <h1 className="Favorited-container-title">Favorite items</h1>
          <div className="items-container">
            {items.map((item) => {
              return (
                <>
                  <div className="single-product-container" key={item.id}>
                    <Preview item={item} />
                    <div className="price"><span>${item.price}</span></div>
                  </div>
                </>
              );
            }
            )}
          </div>

        </div >
      )}
      {isLoading && <Spinner />}

    </>
  )




}

export default LikeProduct;
