/** Action Type Constants: */

export const LOAD_ONE_ITEM = "items/LOAD_ONE_ITEM";
const LOAD_ALL_ITEMS = 'items/LOAD_ALL_ITEMS';


/**  Action Creators: */

export const loadOneItemAction = (item) => ({
  type: LOAD_ONE_ITEM,
  item,
});


export const loadAllItemsAction = (items) => ({
  type: LOAD_ALL_ITEMS,
  items,
});



/** Thunk: */
export const fetchOneItemThunk = (itemId) => async (dispatch) => {
  const res = await fetch(`/api/items/${itemId}`);
  if (res.ok) {
    const data = await res.json();
    // console.log('@@@@@@@@  Target Product @@@@@@@@@@@@@@@@@@@@@', data)
    dispatch(loadOneItemAction(data));
    return data
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const fetchAllItemsThunk = () => async (dispatch) => {
  const res = await fetch("/api/items");
  if (res.ok) {
    const { items } = await res.json();
    dispatch(loadAllItemsAction(items));
  } else {
    const errors = await res.json();
    // console.log(errors);
    return errors;
  }
};

// Fetch all items belong to  specific category
export const fetchCategoryItemsThunk = (category_name) => async (dispatch) => {

  const res = await fetch(`/api/categories/${category_name}`);

  if (res.ok) {
    const { items } = await res.json();
    dispatch(loadAllItemsAction(items));
  } else {
    const errors = await res.json();
    return errors;
  }
}

// Fetch all items based on the search filter
export const fetchSearchItemsThunk = (itemName) => async (dispatch) => {
  const res = await fetch(`/api/items/search/${itemName}`);
  if (res.ok) {
    const { items } = await res.json();
    dispatch(loadAllItemsAction(items));
  } else {
    const errors = await res.json();
    return errors;
  }

}


/** Reducer: */
const initialState = { allItems: {}, singleItem: {} };

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {

    case LOAD_ONE_ITEM:
      return { ...state, singleItem: { ...action.item } };



    case LOAD_ALL_ITEMS:
      const itemsState = {};
      action.items.forEach((item) => {
        itemsState[item.id] = item;
      });
      return {
        ...state,
        allItems: itemsState,
        singleItem: {},
      };




    default:
      return state;
  }


}

export default itemsReducer;
