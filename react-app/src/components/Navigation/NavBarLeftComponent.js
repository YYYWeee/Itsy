import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { fetchSearchItemsThunk } from '../../store/item'

function NavBarLeftComponent({ user }) {
  const [keyword, setKeyword] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState({})
  const [mouseOverResults, setMouseOverResults] = useState(false);


  const history = useHistory();
  const dispatch = useDispatch();
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
    history.push(`/search/${keyword}`);
    setKeyword('')
  }


  useEffect(() => {
    console.log('keyword', keyword)

    // fetch(`/api/items/search/${keyword}`)
    //   .then(res => {
    //     if (res.ok) return res.json()
    //   })
    //   .then(res => setResult(res))

    // setShowResult(true)
    // console.log('@@@@@@@@', result)

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/items/search/${keyword}`);
        if (res.ok) {
          const data = await res.json();
          setResult(data);
          setShowResult(true);
          console.log('@@@@@@@@@', Object.values(result)[0])
          console.log('@@@@@@@@@', result)
          // console.log('@@@@@@@@@',Object.values(result)[0][0].id)  //第二個0 是iterate all the item

        } else {
          setShowResult(false);
          setResult({});
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setShowResult(false);
        setResult({});
      }

    };
    if (keyword) {
      fetchData();
    } else {
      setShowResult(false);
      setResult({});
    }

  }, [keyword])


  return (
    <>
      {/* {user ? ( */}
        <div className="header-left-container">
          <button onClick={handleClick} className="logo cursor">
            <img
              src="https://media.discordapp.net/attachments/1138525166754877607/1139564738385281105/logo.png?width=952&height=994"
              alt="Itsy"
              id="navigation-title-img1"
            />
          </button>

          <div className="nav-search-container">

            <form className='search-bar-container' onSubmit={handleSubmit}>
              <input
                className="search-input"
                type='text'
                placeholder="Search for anything"
                value={keyword}
                onChange={e => {
                  if (/^[a-zA-Z0-9]*$/.test(e.target.value))
                    setKeyword(e.target.value)
                }}
                // onClick={e=>{
                //   setShowResult(true)
                // }}
                // onMouseOver={() => setShowResult(true)}
                onFocus={() => {
                  setShowResult(!!keyword.length)
                  console.log('focus!!!!!')
                }}

              />
              <button type="submit" className="search-submit-btn">
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
            {(showResult) &&
              <ul className='resultUL'

              onMouseOver={() => setShowResult(true)}
              onMouseLeave={() => setShowResult(false)}
              >
                {
                  Object.values(result)[0].length > 0 ?
                    Object.values(result)[0].map((item) => (
                      <li
                        className="Yes-result"
                        key={item.id}
                        onClick={() => {
                          history.push(`/listings/${item.id}`)
                          setKeyword('')
                          setMouseOverResults(false)

                        }}
                      >{item.title}</li>

                    ))
                    : <li className="no-result">No item found</li>
                }
              </ul>
            }
          </div>
        </div>
      {/* )  */}
      {/* : (

        <div className="header-left-container">
          <button onClick={handleClickLanding} className="logo cursor">
            <img
              src="https://media.discordapp.net/attachments/1138525166754877607/1139564738385281105/logo.png?width=952&height=994"
              alt="Itsy"
              id="navigation-title-img1"
            />
          </button>

        </div>
      )} */}
    </>
  );
}

export default NavBarLeftComponent;
