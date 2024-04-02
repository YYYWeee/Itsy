/** Action Type Constants: */
const ADD_ITEM_TO_LIKES = 'items/ADD_ITEM_TO_LIKES'
const REMOVE_ITEM_FROM_LIKES = 'sesitemssion/REMOVE_ITEM_FROM_LIKES'



/**  Action Creators: */
const addItemToLikes = itemId => ({
  type: ADD_ITEM_TO_LIKES,
  itemId
})

const removeItemFromLikes = itemId => ({
  type: REMOVE_ITEM_FROM_LIKES,
  itemId
})


/** Thunk: */

export const likeItem = itemId => async dispatch => {
  const res = await fetch(`/api/likes/${itemId}`, { method: 'POST' })

  if (res.ok) {
    dispatch(addItemToLikes(itemId))
    return true
  }

  return false
}


export const removeLikeItem = itemId => async dispatch => {
  const res = await fetch(`/api/likes/${itemId}`, { method: 'DELETE' })

  if (res.ok) {
    dispatch(removeItemFromLikes(itemId))
    return true
  }

  return false
}


/** Reducer: */
const initialState = { favItems: {} };

const likesReducer = (state = initialState, action) => {
  switch (action.type) {

    case ADD_ITEM_TO_LIKES:
      const addLike = { ...state.favItems }
      addLike[action.itemId] = true
      return { ...state, favItems: { ...addLike } }

      case REMOVE_ITEM_FROM_LIKES:
      const removeLike = { ...state.favItems }
      delete removeLike[action.itemId]
      return { ...state, favItems: { ...removeLike } }


    default:
      return state;
  }


}

export default likesReducer;
