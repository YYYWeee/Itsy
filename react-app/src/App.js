import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";


import Shop from './components/Shop';
import CreateShopForm from "./components/Shop/CreateShopForm";
import CreateProductForm from  "./components/Shop/CreateProductForm";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import ItemDetail from "./components/Shop/ItemDetail";
// import MainProductList from "./components/MainProductList";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/shop">
            <Shop />
          </Route>
          <Route exact path="/shop/new">
            <CreateShopForm />
          </Route>
          {/* <Route exact path="/listiings">
            <MainProductList />
          </Route> */}


          <Route exact path="/listings/:itemId">
            <ItemDetail />
          </Route>
          <Route exact path="/items/new">
            <CreateProductForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
