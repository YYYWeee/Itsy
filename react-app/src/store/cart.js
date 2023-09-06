/** Action Type Constants: */
export const GET_ALL_ITEMS = 'carts/GET_ALL_ITEMS'
export const SAVE_ITEM_TO_CART = 'carts/SAVE_ITEM'
export const DELETE_ITEM_FROM_CART = 'carts/DELETE_ITEM'
export const MODIFY_ITEM_QTY_FROM_CART = 'carts/MODIFY_QTY_ITEM'


/**  Action Creators: */
export const getAllItemsAction = (items) => ({
  type: GET_ALL_ITEMS,
  items,
});

export const saveItemAction = (item) => ({
  type: SAVE_ITEM_TO_CART,
  payload: item
})

export const deleteItemAction = (itemId) => ({
  type: DELETE_ITEM_FROM_CART,
  payload: itemId,

})
// export const modifyItemQtyAction = (itemId) => ({
//   type: MODIFY_ITEM_QTY_FROM_CART,
//   payload: itemId,
// })


/** Thunk: */
// fetch all items in user's cart
export const fetchAllItemsInCartThunk = () => async (dispatch) => {
  const res = await fetch("/api/carts");
  if (res.ok) {
    // const { items,products } = await res.json();
    const data = await res.json();

    dispatch(getAllItemsAction(data));
  } else {
    const errors = await res.json();
    // console.log(errors);
    return errors;
  }
}


// Save one item to user's shopping cart (Add to cart)
export const saveItemToCartThunk = (itemId) => async (dispatch) => {
  const response = await fetch(`/api/carts/${itemId}`, {
    method: "POST",
    body: itemId,
  });
  if (response.ok) {
    const newItem = await response.json()
    dispatch(saveItemAction(newItem))
    return newItem
  }
  // else {
  //   console.log("There was an error saving the item to shopping cart!");
  // }

}

// Remove specific items from user's shopping cart
export const deleteItemFromCartThunk = (itemId) => async (dispatch) => {
  const response = await fetch(`/api/carts/${itemId}`, {
    method: "DELETE",
    body: JSON.stringify(itemId)
  });


  if (response.ok) {
    const { id: deletedItemId } = await response.json();
    dispatch(deleteItemAction(itemId));
    return deletedItemId;
  }
}

// Modify quantity
export const modifyItemQtyThunk = (itemId,qty) => async (dispatch) => {
  const response = await fetch(`/api/carts/${itemId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({qty})
  });
  if (response.ok) {
    const { id: updatedItemId } = await response.json();
    // dispatch(modifyItemQtyAction(itemId));
    dispatch(fetchAllItemsInCartThunk());
    return updatedItemId;
  }

}




/** Reducer: */

const initialState = { shoppingcart: {} };
const cartsReducer = (state = initialState, action) => {

  switch (action.type) {
    case GET_ALL_ITEMS:
      // console.log('in the reducer,action',action)
      // return {...action.items}
      return { ...state, shoppingcart: { ...action.items } };

    case DELETE_ITEM_FROM_CART:
      const newState = { ...state };
      delete newState[action.itemId];
      return newState;

    case SAVE_ITEM_TO_CART:
      // return {...state, [action.item.id]:action.item};
      return { ...state, shoppingcart: { ...action.item } }

    // case MODIFY_ITEM_QTY_FROM_CART:
    //   return { ...state, shoppingcart: { ...action.item } }

    default:
      return state;
  }
}
export default cartsReducer;
