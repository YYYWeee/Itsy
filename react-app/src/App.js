import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";


import Shop from './components/Shop';
import CreateShopForm from "./components/Shop/CreateShopForm";
import CreateProductForm from "./components/Shop/CreateProductForm";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import ItemDetail from "./components/Shop/ItemDetail";
import EditItem from "./components/Shop/EditItem";
import MainProductList from "./components/Shop/MainProductList";
import CartItem from "./components/Cart/CartItem/CartItem";
import OrderHistory from "./components/OrderHistory/OrderHistory";
import Checkout from "./components/Checkout/Checkout";
import OrderConfirmation from "./components/OrderConfirmation/OrderConfirmation"
import PageNotFound from "./components/PageNotFound/PageNotFound"
import Category from "./components/Category/Category"
import Search from "./components/Search/Search"

import Footer from "./components/Footer";

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

          <Route exact path="/listings">
            <MainProductList />
          </Route>
          <Route exact path="/item/:itemId/edit">
            <EditItem />
          </Route>
          <Route exact path="/listings/:itemId">
            <ItemDetail />
          </Route>




          <Route exact path="/category/:category_name">
            <Category />
          </Route>

          <Route exact path="/search/:keyword">
            <Search />
          </Route>


          <Route exact path="/items/new">
            <CreateProductForm />
          </Route>
          <Route exact path="/cart">
            <CartItem />
          </Route>


          <Route exact path="/order/confirm">
            <OrderConfirmation />
          </Route>


          <Route exact path="/orders">
            <OrderHistory />
          </Route>
          {/* <Route exact path="/checkout/completed">
            <NewestOrderInfo />
          </Route> */}
          <Route exact path="/checkout">
            <Checkout />
          </Route>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      )}
      {/* <Footer /> */}
    </>
  );
}

export default App;
