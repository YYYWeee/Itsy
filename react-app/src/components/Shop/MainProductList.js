import "./MainProductList.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllItemsThunk } from "../../store/item";

function randomPick(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}




function MainProductList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user)

  const [index, setIndex] = useState(1); //start from 1
  const [leftOpacities, setLeftOpacities] = useState(Array(3).fill(0));
  const [rightOpacities, setRightOpacities] = useState(Array(3).fill(0));



  //test
  const handleClickLeft = (itemIndex) => {
    setLeftOpacities((prevOpacities) =>
      prevOpacities.map((opacity, index) =>
        index === itemIndex ? 0.4 : opacity
      )
    );
  };

  const handleClickRight = (itemIndex) => {
    setRightOpacities((prevOpacities) =>
      prevOpacities.map((opacity, index) =>
        index === itemIndex ? 0.4 : opacity
      )
    );
  };

  const handleMouseEnter = (itemIndex) => {
    setLeftOpacities((prevOpacities) =>
      prevOpacities.map((opacity, index) =>
        index === itemIndex ? 0.4 : opacity
      )
    );
    setRightOpacities((prevOpacities) =>
      prevOpacities.map((opacity, index) =>
        index === itemIndex ? 0.4 : opacity
      )
    );
  };

  const handleMouseLeave = () => {
    setLeftOpacities(Array(3).fill(0));
    setRightOpacities(Array(3).fill(0));
  };

  //test

  let items = Object.values(
    useSelector((state) => (state.items.allItems ? state.items.allItems : {}))
  );
  useEffect(() => {
    dispatch(fetchAllItemsThunk())
  }, [dispatch]);

  // if (!items) return null;
  if (!items.length) return null;

  // items?.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  //sort the items randomly
  // items.sort(() => Math.random() - 0.5);
  // const shuffledItems = randomPick(items);

  const getPreviewImage = (item, index) => {
    switch (index) {
      case 1:
        return item.img_1;
      case 2:
        return item.img_2;
      case 3:
        return item.img_3;
      default:
        return item.img_1;
    }
  };

  return (
    <>
      {/* <h1 className="welcome">Welcome</h1> */}
      <div className="page-container">
        <div className="items-container">
          {items.map((item,itemIndex) => {
            return (
              <>
                <div className="single-product-container"
                  key={item.id}
                onMouseEnter={() => handleMouseEnter(itemIndex)}
                onMouseLeave={handleMouseLeave}
                >
                   <button
                  style={{ opacity: rightOpacities[itemIndex] }}
                  onClick={() => handleClickRight(itemIndex)}
                >
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
                <button
                  style={{ opacity: leftOpacities[itemIndex] }}
                  onClick={() => handleClickLeft(itemIndex)}
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                  <img
                    className="preview-image cursor"
                    // src={item.img_1}
                    src={getPreviewImage(item, itemIndex)}
                    alt={item.img_1}
                    onClick={() => history.push(`/listings/${item.id}`)}
                  />
                  {/* <div className="img-price-container"> */}
                  <div className="price"><span>${item.price}</span></div>
                  {/* </div> */}
                </div>
              </>
            );
          }
          )}
        </div>

      </div >

    </>
  )



}
export default MainProductList;
