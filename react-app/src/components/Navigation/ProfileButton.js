
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { fetchAllItemsInCartThunk } from "../../store/cart"

// import "./ProfileButton.css";
import "./Navigation.css";

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
    history.push(`/orders`);
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

  const handleGithubClick = () => {
    // window.location.href = "https://github.com/YYYWeee/Itsy";
    window.open("https://github.com/YYYWeee/Itsy", "_blank");
  };
  const handleLinkedinClick = () => {
    // window.location.href = "https://www.linkedin.com/in/wendy-kuo-32093773/";
    window.open("https://www.linkedin.com/in/wendy-kuo-32093773/", "_blank");
  };


  useEffect(() => {
    dispatch(fetchAllItemsInCartThunk());
    window.scroll(0, 0);
  }, [dispatch])

  const items = Object.values(
    useSelector((state) => (state.carts.shoppingcart.items ? state.carts.shoppingcart.items : {}))
  );


  return (
    <>
      {user ? (
        <div className="header-right-container when-log-in">
          <div className="github" onClick={handleGithubClick}>
            <i className="fa-brands fa-github fa-xl" ></i>
          </div>
          <div className="linkedin" onClick={handleLinkedinClick}>
            <i className="fa-brands fa-linkedin fa-xl"></i>
          </div>
          {/* <div className="favorite hover-text" onClick={() => alert("Feature coming soon!")}>
            <i classNamse="fa-regular fa-heart"><span className="tooltip-text" id="bottom">Favorites</span></i>
          </div> */}
          <div className='market hover-text' onClick={() => history.push(`/shop`)}>
            <i className="fa-solid fa-shop"><span className="tooltip-text" id="bottom">Shop Manager</span></i>
          </div>
          {/* <div className="shoppingcart" onClick={() => alert("Feature coming soon!")}> */}
          <div className="shoppingcart hover-text" onClick={() => history.push(`/cart`)}>
            <i className="fa-solid fa-cart-shopping badge" value={items.length}><span className="tooltip-text" id="bottom">Shopping Cart</span></i>
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
              {/* <button onClick={() => alert("Feature coming soon!")}> */}
              <button onClick={handledPurchaseHistory}>
              <i className="fa-regular fa-clipboard fa-xl icon-indropdown"></i>
                Purchase
              </button>
              <button onClick={handleLogout}><i className="fa-solid fa-left-long fa-xl icon-indropdown"></i>Log Out</button>
            </div>
          </ul>
        </div>
      ) : (
        <div className="header-right-container when-log-out">
          <div className="github cursor" onClick={handleGithubClick}>
            <i className="fa-brands fa-github fa-xl" ></i>
          </div>
          <div className="linkedin" onClick={handleLinkedinClick}>
            <i className="fa-brands fa-linkedin fa-xl"></i>
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
