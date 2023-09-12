import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./Preview.css";

function Preview({ item }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [leftOpacity, setLeftOpacity] = useState(0);
  const [rightOpacity, setRightOpacity] = useState(0);

  const showButtons = () => {
    setLeftOpacity(0.8);
    setRightOpacity(0.8);
  };
  const hideButtons = () => {
    setLeftOpacity(0);
    setRightOpacity(0);
  };

  const pageLeft = (e) => {
    e.stopPropagation();
    if (page == 1) {
      setPage(3);
    } else {
      setPage(page - 1);
    }
  };

  const pageRight = (e) => {
    e.stopPropagation();
    if (page === 3) {
      setPage(1);
    } else {
      setPage(page + 1);
    }
  };

  return (
    <div
      id="preview"
      onMouseEnter={showButtons}
      onMouseLeave={hideButtons}
    >
      <button
        onClick={pageLeft}
        className="page-button left"
        style={{ opacity: rightOpacity }}
      >
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      <button
        onClick={pageRight}
        className="page-button right"
        style={{ opacity: leftOpacity }}
      >
        <i class="fa-solid fa-chevron-right"></i>
      </button>
      <img
        className="preview-image"
        src={item[`img_${page}`]}
        onClick={() => history.push(`/listings/${item.id}`)}
      />
    </div>
  );
}

export default Preview;
