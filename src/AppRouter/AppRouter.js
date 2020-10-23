import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "../components/Header/Header";
import Home from "../components/Home/Home";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Cocktails from "../components/Cocktails/Cocktails";
import Signup from "../components/Signup/Signup";
import Login from "../components/Login/Login";
import CocktailSingle from "../components/CocktailSinglePage/CocktailSingle";

export default function AppRouter() {
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const data = await fetch(
        "https://morning-eyrie-35918.herokuapp.com/products"
      );
      const fetchedData = await data.json();
      setProducts(fetchedData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <BrowserRouter>
      {isLoading ? (
        <div className="loader">
          <Loader type="Oval" color="#add0ed" height={100} width={100} />
        </div>
      ) : null}
      <Header cartProducts={cartProducts} setCartProducts={setCartProducts} />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/cocktails">
          <Cocktails products={products} />
        </Route>
        <Route path="/products/product/:id">
          <CocktailSingle
            cartProducts={cartProducts}
            setCartProducts={setCartProducts}
          />
        </Route>
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}
