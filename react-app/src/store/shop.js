/** Action Type Constants: */
export const LOAD_USER_SHOP = "shops/LOAD_USER_SHOP";
export const GET_ALL_SHOPS = 'shops/GET_ALL_SHOPS';
const CREATE_ITEM = 'shops/CREATE_ITEM';

/**  Action Creators: */
export const loadUserShopAction = (shop) => ({
  type: LOAD_USER_SHOP,
  shop,
});

export const fetchAllShops = (shops) => ({
  type: GET_ALL_SHOPS,
  payload: shops,
});

export const createItem = (item) => ({
  type: CREATE_ITEM,
  payload: item,
});





// **********************************************************************
/** Thunk: */
export const fetchUserShopThunk = () => async (dispatch) => {
  const res = await fetch("/api/shop");
  console.log('res!!!',res)
  if (res.ok) {
    const data = await res.json();
    console.log('shop!!!',data)
    dispatch(loadUserShopAction(data));
  } else {
    const errors = await res.json();
    console.log(errors);
    return errors;
  }
};

export const createItemThunk = (item) => async (dispatch) => {
  const response = await fetch(`/api/items`, {
    method: "POST",
    body: item,
  });
  if (response.ok) {
    const newItem = await response.json()
    dispatch(createItem(newItem))
    return newItem
  } else {
    console.log("There was an error adding your new item!");
  }
}

// ************************Reducer**********************************************
const initialState = { allShops: {}, singleShop: {} };

const shopsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_USER_SHOP:
      return { ...state, singleShop: { ...action.shop } };


    case GET_ALL_SHOPS:
      const shopsState = {};
      action.shops.forEach((shop) => {
        shopsState[shop.id] = shop;
      });
      return {
        ...state,
        allShops: shopsState,
        singleShop: {},
      };

    case CREATE_ITEM:
      const newProduct = action.payload;
      return {
        ...state,
        singleShop: {
          ...state.singleShop,
          // products: [...state.singleShop.products, newProduct],
        },
      };


    default:
      return state;
  }
};


export default shopsReducer;
