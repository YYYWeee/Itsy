import { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";

function NavBarLeftComponent({ user }) {
  const [keyword, setKeyword] = useState('')
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
    history.push("/listings");
    window.scrollTo(0, 0);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // pending

  }

  return (
    <>
      {user ? (
        <div className="header-left-container">
          <button onClick={handleClick} className="logo cursor">
            <img
              src="https://media.discordapp.net/attachments/1138525166754877607/1139564738385281105/logo.png?width=952&height=994"
              alt="Itsy"
              id="navigation-title-img1"
            />
          </button>

          <div
            className="nav-search"
          // onClick={() => alert("Feature coming soon!")}
          >
            <i className="fas fa-search"></i>
            <form onSubmit={handleSubmit}>
              <input
                className="search-input"
                placeholder="Search for anything"
                value={keyword}
                onChange={e => {
                  if (/^[a-zA-Z0-9]*$/.test(e.target.value))
                    setKeyword(e.target.value)
                }}
              />
              <button type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>


            </form>
          </div>
        </div>
      ) : (
        <div className="header-left-container">
          <button onClick={handleClickLanding} className="logo cursor">
            <img
              src="https://media.discordapp.net/attachments/1138525166754877607/1139564738385281105/logo.png?width=952&height=994"
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
