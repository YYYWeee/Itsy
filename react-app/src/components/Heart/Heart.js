import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { likeItem, removeLikeItem } from '../../store/likes'
import { fetchAllFavoriteItemsThunk } from "../../store/likes";

import styles from './Heart.css'
import "./Heart.css";

function Heart({ itemId }) {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  // const [heartStyle, setHeartStyle] = useState(styles.heart)
  const dispatch = useDispatch();
  const favItems = Object.keys(
    useSelector((state) => (state.likes.favItems ? state.likes.favItems : {}))
  );

  const favItems2 = useSelector((state) => state.likes.favItems);

  let allFavitems = Object.values(
    useSelector((state) => (state.likes.allfavItems ? state.likes.allfavItems : {}))
  );

  const isItemInFavItems = Object.values(allFavitems).some(item => item.id === itemId);
  console.log('NOWWWWWWW', isItemInFavItems)






  const handleHeart = async () => {
    // const res = favItems2[itemId] ? dispatch(removeLikeItem(itemId)) : dispatch(likeItem(itemId))
    const res = isItemInFavItems ? dispatch(removeLikeItem(itemId)) : dispatch(likeItem(itemId))
  }

  useEffect(() => {
    dispatch(fetchAllFavoriteItemsThunk())

  }, [dispatch, itemId]);

  return (
    <>{sessionUser && (
      <div className='heartIcon' onClick={handleHeart}>
        {(!!sessionUser && isItemInFavItems) ? <i style={{ color: 'red' }} className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}
        {/* {(!!sessionUser && favItems2[itemId]) ? <i style={{ color: 'red' }} className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>} */}
      </div>
    )}
    </>
  )

}

export default Heart;
