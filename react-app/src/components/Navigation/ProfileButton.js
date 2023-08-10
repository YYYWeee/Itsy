// import React, { useState, useEffect, useRef } from "react";
// import { useDispatch } from "react-redux";
// import { logout } from "../../store/session";
// import OpenModalButton from "../OpenModalButton";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";

// function ProfileButton({ user }) {
//   const dispatch = useDispatch();
//   const [showMenu, setShowMenu] = useState(false);
//   const ulRef = useRef();

//   const openMenu = () => {
//     if (showMenu) return;
//     setShowMenu(true);
//   };

//   useEffect(() => {
//     if (!showMenu) return;

//     const closeMenu = (e) => {
//       if (!ulRef.current.contains(e.target)) {
//         setShowMenu(false);
//       }
//     };

//     document.addEventListener("click", closeMenu);

//     return () => document.removeEventListener("click", closeMenu);
//   }, [showMenu]);

//   const handleLogout = (e) => {
//     e.preventDefault();
//     dispatch(logout());
//   };

//   const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
//   const closeMenu = () => setShowMenu(false);

//   return (
//     <>
//       <button onClick={openMenu}>
//         <i className="fas fa-user-circle" />
//       </button>
//       <ul className={ulClassName} ref={ulRef}>
//         {user ? (
//           <>
//             <li>{user.username}</li>
//             <li>{user.email}</li>
//             <li>
//               <button onClick={handleLogout}>Log Out</button>
//             </li>
//           </>
//         ) : (
//           <>
//             <OpenModalButton
//               buttonText="Log In"
//               onItemClick={closeMenu}
//               modalComponent={<LoginFormModal />}
//             />

//             <OpenModalButton
//               buttonText="Sign Up"
//               onItemClick={closeMenu}
//               modalComponent={<SignupFormModal />}
//             />
//           </>
//         )}
//       </ul>
//     </>
//   );
// }

// export default ProfileButton;


import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [showMenu, setShowMenu] = useState(false);
  const ulRef1 = useRef();

  const openUserMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const handledPurchaseHistory = async (e) => {
    e.preventDefault();
    history.push(`/your/purchase/history`);
  }

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/");
    window.scrollTo(0, 0);
  };

  const handleMarket = async (e) => {
    history.push(`/shop`);
  }

  const handleClickUser = async (e) => {
    history.push(`/${user.username}`);
    window.scrollTo(0, 0);
  };

  const closeMenu = () => {
    setShowMenu(false);
    window.scrollTo(0, 0);
  };

  const profileArrowDirection = showMenu ? "up" : "down";
  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  useEffect(() => {
    if (!showMenu) return;
    // console.log(ulRef1.current);

    // const closeMenu = (e) => {
    //   if (!ulRef1.current.contains(e.target)) {
    //     setShowMenu(false);
    //   }
    // };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <>
      {user ? (
        <div className="header-right-container when-log-in">
          <div className='market' onClick={() => history.push(`/shop`)}>
            <i className="fa-solid fa-shop"></i>
          </div>
          <div className="shoppingcart" onClick={() => history.push('/cart')}>
            <i className="fa-solid fa-cart-shopping"></i>
          </div>
          <button
            // onClick={handleClickUser}
            className="user-icon-container cursor">
            {user.photo_url ? (
              <img
                src={user.photo_url}
                alt="No creator preview"
                className="sessionuser-img a85"
              ></img>
            ) : (
              <img
                className="nav-user-pic a85"
                src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg?w=1060"
              />
            )}
          </button>
          <button
            onClick={openUserMenu}
            className="menu-arrow cursor btn-animation"
          >
            <i
              className={`fa-solid fa-chevron-${profileArrowDirection} arrow`}
            ></i>
          </button>

          <ul className={ulClassName} ref={ulRef1}>
            <div className="current"></div>
            <div className="profile-user-card cursor" >
              <img
                src={
                  user.photo_url
                    ? user.photo_url
                    : "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg?w=1060"
                }
                alt="No creator preview"
                className="user-menu-img"
              ></img>
              <div>
                {user.first_name && user.last_name ? (
                  <p className="usermenu-username">
                    {user.first_name} {user.last_name}
                  </p>
                ) : (
                  <p className="usermenu-username">{user.username}</p>
                )}
                <p>{user.email}</p>
              </div>
              <i className="fa-solid fa-check"></i>
            </div>
            <div className="user-menu-options">
              {/* <button onClick={() => alert("Feature coming soon!")}>
                Settings
              </button> */}
              <button onClick={handledPurchaseHistory}>
                Purchase
              </button>
              <button onClick={handleLogout}>Log Out</button>
            </div>
          </ul>
        </div>
      ) : (
        <div className="header-right-container">
          <div className="nav-github cursor">
            <a href="https://github.com/YYYWeee/Capstone.git" className="git">
              Github
            </a>
          </div>
          <OpenModalButton
            buttonText="Log In"
            onItemClick={closeMenu}
            modalComponent={<LoginFormModal />}
          />

          <OpenModalButton
            buttonText="Sign Up"
            onItemClick={closeMenu}
            modalComponent={<SignupFormModal />}
          />
        </div>
      )}
    </>
  );
}

export default ProfileButton;
