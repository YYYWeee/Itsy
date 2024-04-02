import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import styles from './Heart.css'
import "./Heart.css";

function Heart({ itemId }) {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const [heartStyle, setHeartStyle] = useState(styles.heart)
  const dispatch = useDispatch();

  const handleHeart = async () => {
    if (!sessionUser) {


    } else {

    }

  }

  return (
    <>
      <div className={heartStyle} onClick={handleHeart}>
        {/* {(!!sessionUser && sessionUser.likes[itemId]) ? <i style={{ color: 'red' }} className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>} */}
      </div>

    </>
  )

}

export default Heart;
