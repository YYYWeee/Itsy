import "./MainProductList.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


function MainProductList() {
  const dispatch = useDispatch();
  const history = useHistory();


  return (
    <>
    <h1 className="welcome">Welcome</h1>
    </>
  )



}
export default MainProductList;
