import { useParams, useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";

import { fetchAllItemsInCartThunk } from "../../../store/cart"
import { deleteItemFromCartThunk } from "../../../store/cart"
import { modifyItemQtyThunk } from "../../../store/cart"

import "./CartItem.css";

function CartItem() {
  let unit;

  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const items = Object.values(
    useSelector((state) => (state.carts.shoppingcart.items ? state.carts.shoppingcart.items : {}))
  );
  const products = Object.values(
    useSelector((state) => (state.carts.shoppingcart.products ? state.carts.shoppingcart.products : {}))
  );
  useEffect(() => {
    const res = dispatch(fetchAllItemsInCartThunk());
    window.scroll(0, 0);
  }, [dispatch])

  if (products.length === 1) {
    unit = 'item'
  } else if (products.length > 1) {
    unit = 'items'
  }

  const calculateTotalQuantity = (productId) => {
    const result = items.find((ele) => ele.product_id == productId)
    return result.quantity
  };
  const handleRemove = async (itemId) => {
    console.log('Click on remove')
    await dispatch(deleteItemFromCartThunk(itemId))
    await dispatch(fetchAllItemsInCartThunk())
  }

  const handleChangeQty = async (itemId, qty) => {
    console.log('Change quantityy')
    await dispatch(modifyItemQtyThunk(itemId, qty))
    // await dispatch(fetchAllItemsInCartThunk())
  }
  return (
    <>

      {products.length > 0 ?
        (<div className="page-title"><h2> {products.length} {unit} in your cart </h2></div>) : (<div className="page-title"><h2>Your cart is empty.</h2></div>)
      }
      <div className="cart-page-container">
        <div className="cart-items-container">
          {products.map((product) => {
            const productQuantity = calculateTotalQuantity(product.id);
            return (
              <>
                <div className="single-cart-item-container" key={product.id}>
                  <div className="top-row">
                    {product.shop}
                  </div>
                  <div className="second-row">
                    <div className="item-img">
                      <img
                        className="preview-image-cart cursor"
                        src={product.img_1}
                        alt={product.img_1}
                        onClick={() => history.push(`/listings/${product.id}`)}
                      />
                    </div>
                    <div className="title-and-qty">
                      <div className="cart-item-title">
                        {product.title}
                      </div>
                      <div className="cart-item-qty">
                        {/* Quantity:
                        {productQuantity} */}
                        <select
                          defaultValue={productQuantity}
                          onChange={(e) => handleChangeQty(product.id, e.target.value)}
                        >
                          {[...Array(30).keys()].map((num) => (
                            <option key={num + 1} value={num + 1}>
                              {num + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="price-container">
                      <div className="total-price"> ${productQuantity * product.price}</div>
                      {productQuantity > 1 && (
                        <div className="ecah-price"> (${product.price} each)</div>
                      )}
                    </div>
                  </div>
                  <div className="remove-btn" onClick={() => handleRemove(product.id)}>
                    <i class="fa-solid fa-trash"></i> Remove
                  </div>
                </div>

              </>
            )
          })}

        </div>
      </div>
    </>
  )
}


export default CartItem;
