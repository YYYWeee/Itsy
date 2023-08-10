/** Action Type Constants: */
export const LOAD_USER_SHOP = "shops/LOAD_USER_SHOP";
export const GET_ALL_SHOPS = 'shops/GET_ALL_SHOPS';


/**  Action Creators: */
export const loadUserShopAction = (shop) => ({
  type: LOAD_USER_SHOP,
  shop,
});

export const fetchAllShops = (shops) => ({
  type: GET_ALL_SHOPS,
  payload: shops,
});

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

// export const fetchAllShopsThunk = () => async (dispatch) => {
//   const res = await fetch('/api/shop/');
//   console.log('res',res)
//   if (res.ok) {
//     const shops = await res.json();
//     dispatch(fetchAllShops(shops));
//     return shops;
//   } else {
//     const errors = await res.json();
//     console.log(errors);
//     return errors;
//   }
// };

// export const createNewShopThunk = (shop) => async (dispatch) => {
//   console.log('in the thunk!!!!!!!!!!!!!!!!!!')
//   const response = await fetch(`/api/shop`, {
//     method: "POST",
//     body: shop,
//   });
//   console.log("RESPONSE FROM SERVER", response);
//   if (response.ok) {
//     const newShop = await response.json();
//     console.log("NEW SHOP DATA", newShop);

//     dispatch(loadUserShopAction());
//     return newShop;
//   } else {
//     console.log("There was an error creating your shop!");
//   }

// }




const initialState = { allShops: {}, singleShop: {} };

const shopsReducer = (state = initialState, action) => {

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


    default:
      return state;
  }
};


export default shopsReducer;
