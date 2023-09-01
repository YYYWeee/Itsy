
import {fetchAllItemsInCartThunk} from './cart'



/** Action Type Constants: **/
export const PLACE_ORDER = "orders/PLACE_ORDER";
export const LOAD_ALL_OLD_ORDERS = "orders/LOAD_ALL_OLD_ORDERS";
export const LOAD_ONE_OLD_ORDER = "orders/LOAD_ONE_OLD_ORDER";
export const LOAD_NEWEST_OLD_ORDER = "orders/LOAD_NEWEST_OLD_ORDER";

/**  Action Creators: **/
export const placeOrderAction = (items) => ({
  type: PLACE_ORDER,
  items,
});

export const loadAllOldOrdersAction = (payload) => ({
  type: LOAD_ALL_OLD_ORDERS,
  payload,
});

export const loadOneOldOrderAction = (payload) => ({
  type: LOAD_ONE_OLD_ORDER,
  payload,
});

export const loadNewestOldOrderAction = (payload) => ({
  type: LOAD_NEWEST_OLD_ORDER,
  payload,
});




/** Thunk  **/

export const placeOrderThunk = (address) => async (dispatch) => {
  console.log('in thunk')
  const response = await fetch(`/api/carts/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(address),
    // body: address,
  });

  if (response.ok) {
    const newOrder = await response.json()

    dispatch(fetchAllItemsInCartThunk())
    return newOrder
  } else {
    console.log("There was an error placing your order");
  }
};


//all_old_orders
export const loadAllOldOrdersThunk = () => async (dispatch) => {
  const res = await fetch("/api/orders/old");
  const data = await res.json();
  dispatch(loadAllOldOrdersAction(data));
  return data.old_orders;
};




/**  Reducer: */

const initialState = { all_old_orders: {}};
const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL_OLD_ORDERS:
      return { ...state, all_old_orders: { ...action.payload.old_orders } };

    default:
      return state;

  }
}
export default ordersReducer;
