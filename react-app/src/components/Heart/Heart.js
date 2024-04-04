import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { likeItem, removeLikeItem } from '../../store/likes'


import styles from './Heart.css'
import "./Heart.css";

function Heart({ itemId }) {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const [heartStyle, setHeartStyle] = useState(styles.heart)
  const dispatch = useDispatch();
  const favItems = Object.keys(
    useSelector((state) => (state.likes.favItems ? state.likes.favItems : {}))
  );
  // console.log('NOW!!!!!!', favItems[24]) // [25,169,194.246]
  const favItems2 = useSelector((state) => state.likes.favItems);
  // console.log('NOW22!!!!!!', favItems2) // [25,169,194.246]




  const handleHeart = async () => {
    const res = favItems2[itemId] ? dispatch(removeLikeItem(itemId)) : dispatch(likeItem(itemId))
  }

  return (
    <>{sessionUser && (
      <div className='heartIcon' onClick={handleHeart}>
        {(!!sessionUser && favItems2[itemId]) ? <i style={{ color: 'red' }} className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}
      </div>
    )}
    </>
  )

}

export default Heart;
