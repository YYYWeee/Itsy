import {useHistory } from "react-router-dom";

import "./PageNotFound.css"


function PageNotFound() {
  const history = useHistory();
  return (
    <>
      <div className="pageNotFound-page">
        <div className="pageNotFound-container">
          <h1 className="error-page-title">Uh oh!</h1>
          <h2 className="error-page-subtitle">Sorry, the page you were looking for was not found.</h2>
          <div className="goBack" onClick={() => history.push(`/listings`)}> ← Go back to Itsy.com</div>
        </div>
      </div>
    </>
  )
}


export default PageNotFound;
