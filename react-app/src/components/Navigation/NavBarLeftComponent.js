import { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";

function NavBarLeftComponent({ user }) {
  const history = useHistory();
  const ulRef = useRef();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const closeMenu = () => setShowMenu(false);

  const profileArrowDirection = showMenu ? "up" : "down";
  const ulClassName = "create-dropdown" + (showMenu ? "" : " hidden");

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleClick = () => {
    history.push("/listings");
    window.scrollTo(0, 0);
  };

  const handleClickLanding = () => {
    history.push("/");
    window.scrollTo(0, 0);
  };

  const handleCreatePin = () => {
    history.push("/pin-builder");
    closeMenu();
    window.scrollTo(0, 0);
  };

  const handleCreateBoard = () => {
    history.push(`/${user.username}/board-builder`);
    closeMenu();
    window.scrollTo(0, 0);
  };

  return (
    <>
      {user ? (
        <div className="header-left-container">
          <button onClick={handleClick} className="logo cursor">
            <img
              src="https://cdn.discordapp.com/attachments/1138525166754877607/1138525262473089156/apple-touch-icon.png"
              alt="Itsy"
              id="navigation-title-img1"
            />
          </button>
          {/* <NavLink exact to="/pins" className="nav-home cursor">
            Home
          </NavLink> */}
          {/* <div className="create-container"> */}
            {/* <button onClick={openMenu} className="nav-create cursor">
              <span className="create">Create</span>
              <i
                className={`fa-solid fa-chevron-${profileArrowDirection} arrow`}
              ></i>
            </button> */}
            {/* <div className={ulClassName} ref={ulRef}>
              <div className="create-item">
                <button onClick={handleCreatePin}>Create Pin</button>
              </div>
              <div className="create-item">
                <button onClick={handleCreateBoard}>Create Board</button>
              </div>
            </div> */}
          {/* </div> */}
          <div
            className="nav-search"
            onClick={() => alert("Feature coming soon!")}
          >
            <i className="fas fa-search"></i>
            <input className="search-input" placeholder="Search for anything"/>
          </div>
        </div>
      ) : (
        <div className="header-left-container">
          <button onClick={handleClickLanding} className="logo cursor">
            <img
              src="https://cdn.discordapp.com/attachments/1138525166754877607/1138525262473089156/apple-touch-icon.png"
              alt="Itsy"
              id="navigation-title-img1"
            />
          </button>

        </div>
      )}
    </>
  );
}

export default NavBarLeftComponent;
