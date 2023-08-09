// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const LOAD_ALL_USERS = "session/LOAD_ALL_USERS"

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const loadAllUsers = (users) =>({
  type: LOAD_ALL_USERS,
  users
})

const initialState = { user: null,allUsers:[] };

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

export const login = (user) => async (dispatch) => {
  console.log("inside login thunk");
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
      console.log("store set user failed", data.errors);
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};


export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};


export const signUp = (user) => async (dispatch) => {
  const { email, username, first_name, last_name, password } = user;
  console.log("i am in signup thunk");
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
    console.log("I signed up!");
    const data = await response.json();
    dispatch(setUser(data));
    return null;
  } else if (response.status < 500) {
    console.log("booo");
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    const data = await response.json();
    console.log(data.errors);
    return ["An error occurred. Please try again."];
  }
};

export const fetchAllUsersThunk = () => async (dispatch) => {
  const res = await fetch('/api/users');
  if(res.ok){
    const data = await res.json();
    dispatch(loadAllUsers(data));
    return data;
  }else{
    const errors = await res.json();
    return errors;
  }
}




export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		case LOAD_ALL_USERS:
			return {...state,allUsers:action.users};
		default:
			return state;
	}
}
