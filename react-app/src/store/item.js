/** Action Type Constants: */

// const CREATE_ITEM = 'item/CREATE_ITEM';


/**  Action Creators: */

// export const createItem = (item) => ({
//   type: CREATE_ITEM,
//   payload: item,
// });


/** Thunk: */
// export const createItemThunk = (item) => async (dispatch) => {
//   const response = await fetch(`/api/items`, {
//     method: "POST",
//     body: item,
//   });
//   if (response.ok) {
//     const newShop = await response.json()
//     // dispatch(setShop(newShop.id))
//     return newShop
//   } else {
//     // console.log("There was an error creating your shop!");
//     return 'invalidName'
//   }
// }



const initialState = { allItems: {}, singleItem: {} };

const itemsReducer = (state = initialState, action) => {



}

export default itemsReducer;
