import { useParams, NavLink, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import EditItem from "./EditItem";
import "./ProductList.css";


function ProductList() {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(state => state.session.user)
  const shop = useSelector((state) => state.shops.singleShop.shop);
  const items = useSelector((state) => state.shops.singleShop.products); //array
  const [targetId, setTargetId] = useState('');


  // const [showUpdateForm, setShowUpdateForm] = useState(false);

  if (!items) return null;

  const handleAddProduct = () => {
    history.push(`/items/new`);
    window.scrollTo(0, 0);
  };

  const handleUpdate = (itemId) => {
    // setShowUpdateForm(true);
    // setTargetId(itemId)
    history.push(`/item/${itemId}/edit`);
  };

  // return showUpdateForm === true ?
  //   (<EditItem itemId={targetId} setShowUpdateForm3={showUpdateForm} />
  //   ) : (
  //     <div className="page-container">
  //       <div className="top-container">
  //         <h1> Product list</h1 >
  //         <div className="create-item-btn">
  //           <button onClick={handleAddProduct}>Add product</button>
  //         </div>
  //       </div >

  //       {items.length ?
  //           (<div className="items-container">
  //             {items.map((item) => {
  //               return (
  //                 <>
  //                   <div className="single-product-container" key={item.id}>
  //                     <img
  //                       className="preview-image"
  //                       src={item.img_1}
  //                       alt={item.img_1}
  //                       onClick={() => history.push(`/listings/${item.id}`)}
  //                     />

  //                     <div className="price">${item.price}</div>
  //                     <div>
  //                       <button
  //                         className="update-btn"
  //                         onClick={() => handleUpdate(item.id)}
  //                       >
  //                         <i className="fa-solid fa-pen-to-square fa-lg"></i>
  //                       </button>
  //                     </div>
  //                   </div>
  //                 </>
  //               );
  //             }
  //             )}
  //           </div>) : (
  //             <div>
  //               <div><h2>Your don't have any items in your shop</h2></div>
  //             </div>
  //           )
  //       }
  //     </div >
  //   )
  return (
    <>
      <div className="page-container">
        <div className="top-container">
          <h1> Product list</h1 >
          <div className="create-item-btn">
            <button onClick={handleAddProduct}>Add product</button>
          </div>
        </div >

        {items.length ?
          (<div className="items-container">
            {items.map((item) => {
              return (
                <>
                  <div className="single-product-container" key={item.id}>
                    <img
                      className="preview-image"
                      src={item.img_1}
                      alt={item.img_1}
                      onClick={() => history.push(`/listings/${item.id}`)}
                    />

                    <div className="price">${item.price}</div>
                    <div>
                      <button
                        className="update-btn"
                        onClick={() => handleUpdate(item.id)}
                      >
                        <i className="fa-solid fa-pen-to-square fa-lg"></i>
                      </button>
                    </div>
                  </div>
                </>
              );
            }
            )}
          </div>) : (
            <div>
              <div><h2>Your don't have any items in your shop</h2></div>
            </div>
          )
        }
      </div >
    </>
  )
}

export default ProductList;
