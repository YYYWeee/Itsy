/** Action Type Constants: */
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const LOAD_ALL_USERS = "session/LOAD_ALL_USERS"
const CREATE_SHOP = 'session/CREATE_SHOP'
const DELETE_SHOP = 'session/DELETE_SHOP'



/**  Action Creators: */
const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const loadAllUsers = (users) => ({
  type: LOAD_ALL_USERS,
  users
})

const setShop = (shopId) => ({
  type: CREATE_SHOP,
  shopId
})


const deleteShop = () => ({
  type: DELETE_SHOP
})


/** Thunk: */
// **********************************************************************
export const authenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
};
// **********************************************************************
export const login = (user) => async (dispatch) => {

  const { email, password } = user;
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {

      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

//**********************************************************************
export const googleLogin = () => async (dispatch) => {


  const response = await fetch("/googlelogin",
    { mode: 'no-cors' }
  );
  console.log('$$$$$$$$$$$')


  // if (response.ok) {
  //   const data = await response.json();
  //   dispatch(setUser(data));
  //   console.log('in googleLogin thunk', data)
  //   return null;
  // }
};


// **********************************************************************
export const logout = () => async (dispatch) => {
  // const response = await fetch("/api/auth/logout", {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  // if (response.ok) {
  //   dispatch(removeUser());
  // }
  const response = await fetch("/api/auth/logout")
  console.log('response')
};

// **********************************************************************
export const signUp = (user) => async (dispatch) => {
  const { email, username, first_name, last_name, password } = user;

  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      username,
      first_name,
      last_name,
      password,
    }),
  });

  if (response.ok) {

    const data = await response.json();
    dispatch(setUser(data));
    return null;
  } else if (response.status < 500) {

    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    const data = await response.json();
    // console.log(data.errors);
    return ["An error occurred. Please try again."];
  }
};
// **********************************************************************
export const fetchAllUsersThunk = () => async (dispatch) => {
  const res = await fetch('/api/users');
  if (res.ok) {
    const data = await res.json();
    dispatch(loadAllUsers(data));
    return data;
  } else {
    const errors = await res.json();
    return errors;
  }
}
// **********************************************************************
// create new shop
export const createNewShopThunk = (shop) => async dispatch => {

  const response = await fetch(`/api/shop`, {
    method: "POST",
    body: shop,
  });
  if (response.ok) {
    const newShop = await response.json()
    dispatch(setShop(newShop.id))
    return newShop
  } else {
    // console.log("There was an error creating your shop!");
    return 'invalidName'
  }
}
// **********************************************************************
export const updateShopThunk = (updateShop) => async (dispatch) => {
  const response = await fetch(`/api/shop`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateShop),
  });

  if (response.ok) {
    const updatedShop = await response.json()

    dispatch(setShop(updatedShop.id))
    return updatedShop
  } else {
    // console.log("There was an error updating your shop!");
    return 'invalidName'
  }

}
// **********************************************************************

export const deleteShopThunk = () => async (dispatch) => {
  const response = await fetch(`/api/shop`, {
    method: "DELETE",
  });
  if (response.ok) {
    const { id: deletedShopId } = await response.json();
    dispatch(deleteShop());
    return deletedShopId;
  }
}

// **********************************************************************
// export const createItemThunk = (item) => async (dispatch) => {
//   const response = await fetch(`/api/items`, {
//     method: "POST",
//     body: item,
//   });
//   if (response.ok) {
//     const newItem = await response.json()
//     dispatch(createItem(newItem))
//     return newItem
//   } else {
//     console.log("There was an error adding your new item!");

//   }
// }


// **********************************************************************
const initialState = { user: null, allUsers: [] };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    case REMOVE_USER:
      return { user: null };
    case LOAD_ALL_USERS:
      return { ...state, allUsers: action.users };

    case CREATE_SHOP:
      return { user: { ...state.user, shop: action.shopId } }

    case DELETE_SHOP:
      return { user: { ...state.user, shop: null } }

    default:
      return state;
  }
}
