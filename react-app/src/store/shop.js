/** Action Type Constants: */
export const LOAD_USER_SHOP = "shops/LOAD_USER_SHOP";
export const GET_ALL_SHOPS = 'shops/GET_ALL_SHOPS';
export const CREATE_ITEM = 'shops/CREATE_ITEM';
export const UPDATE_ITEM = 'shops/UPDATE_ITEM';
export const DELETE_ITEM = 'shops/DELETE_ITEM';

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


export const editItem = (item) => ({
  type: UPDATE_ITEM,
  payload: item,
})

export const deleteItem = (itemId) => ({
  type: DELETE_ITEM,
  payload: itemId,
})


// **********************************************************************
/** Thunk: */
export const fetchUserShopThunk = () => async (dispatch) => {
  const res = await fetch("/api/shop");
  console.log('res!!!', res)
  if (res.ok) {
    const data = await res.json();
    console.log('shop!!!', data)
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



export const updateItemThunk = (updateItem, id) => async (dispatch) => {
  const response = await fetch(`/api/items/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateItem),

  });
  let updatedItem = await response.json();
  console.log("updated Item", updatedItem);
  dispatch(loadUserShopAction());
  return updatedItem;
};



export const deleteItemThunk = (itemId) => async (dispatch) => {
  const response = await fetch(`/api/items/${itemId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const { id: deletedItemId } = await response.json();
    dispatch(deleteItem(itemId));
    return deletedItemId;
  }
};



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

    case UPDATE_ITEM:
      // return { ...state, singleShop: { ...action.item } };
      return {
        ...state,
        singleShop: {
          ...state.singleShop,
        }
      };

    case DELETE_ITEM:
      const newState = {
        ...state,
        allShops: { ...state.allShops },
        singleShop: { ...state.singleShop },
      };
      delete newState.singleShop[action.itemId];
      return newState;



    default:
      return state;
  }
};


export default shopsReducer;
