import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

import "./CreateProductForm.css";

function CreateProductForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);




}


export default CreateProductForm;
