/** Action Type Constants: */

export const LOAD_ONE_ITEM = "items/LOAD_ONE_ITEM";

/**  Action Creators: */

export const loadOneItemAction = (item) => ({
  type: LOAD_ONE_ITEM,
  item,
});

/** Thunk: */


export const fetchOneItemThunk = (itemId) => async (dispatch) => {
  console.log('in the thunk !!!!!!!')
  const res = await fetch(`/api/items/${itemId}`);
  if (res.ok) {
    const data = await res.json();
    console.log('@@@@@@@@  Target Product @@@@@@@@@@@@@@@@@@@@@', data)
    dispatch(loadOneItemAction(data));
    return data
  } else {
    const errors = await res.json();
    return errors;
  }
};


/** Reducer: */
const initialState = { allItems: {}, singleItem: {} };

const itemsReducer = (state = initialState, action) => {
  console.log('in reducer')

  switch (action.type) {
    case LOAD_ONE_ITEM:
      return { ...state, singleItem: { ...action.item } };


    default:
      return state;
  }


}

export default itemsReducer;
