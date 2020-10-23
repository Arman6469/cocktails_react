import React, { useState, useEffect } from "react";
import "./CocktailSingle.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

export default function CocktailSingle({ cartProducts, setCartProducts }) {
  const [cocktail, setCocktail] = useState({});
  const [count, setCount] = useState(1);
  const [Loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);

  const productId = useParams().id;

  const fetchSingleCocktail = async (productId) => {
    setLoading(true);
    try {
      const data = await fetch(
        `https://morning-eyrie-35918.herokuapp.com/products/product/${productId}`
      );
      const fetchedData = await data.json();
      setCocktail(fetchedData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const totalPrice = cocktail.price * count;

  const showDone = () => {
    if (clicked) {
      return <div className="done"></div>;
    }
  };

  const addToCart = () => {
    const productExists = cartProducts.find((elem) => elem.id === productId);
    setClicked(true);

    if (productExists === undefined) {
      setCartProducts((prev) => {
        return [
          {
            title: cocktail.title,
            id: productId,
            price: cocktail.price,
            image: cocktail.image,
            count: count,
            totalPrice: totalPrice,
          },
          ...prev,
        ];
      });
    } else {
      setCartProducts((prev) => {
        return prev.filter((elem) => elem.id !== productId);
      });
      setCartProducts((prev) => {
        return [
          {
            title: cocktail.title,
            price: cocktail.price,
            id: productId,
            image: cocktail.image,
            count: count + productExists.count,
            totalPrice: totalPrice + productExists.totalPrice,
          },
          ...prev,
        ];
      });
    }
  };

  const changeCount = (number) => {
    setCount(count + number);
  };

  useEffect(() => {
    fetchSingleCocktail(productId);
  }, [productId]);

  return (
    <div>
      {Loading ? (
        <div className="loader">
          <Loader type="Oval" color="#add0ed" height={100} width={100} />
        </div>
      ) : null}
      <section className="single_cocktail_main_section">
        <div className="info_about_cocktail">
          <h1 className="cocktail_single_title">{cocktail.title}</h1>
          <p className="cocktail_single_price">{cocktail.price} AMD</p>
          <p className="cocktail_single_description">{cocktail.description}</p>
          <div className="buying">
            <div className="single_buy_part">
              <div
                className={
                  count === 1
                    ? "single_minus_button disabled"
                    : "single_minus_button"
                }
                onClick={() => changeCount(-1)}
              >
                -
              </div>
              <div className="single_cocktail_count">{count}</div>
              <div
                className="single_minus_button"
                onClick={() => changeCount(1)}
                id="plus"
              >
                +
              </div>
            </div>
            <NavLink to="/cocktails" className='add_link' >
              <div
                className={
                  localStorage.token
                    ? "add_to_cart_div"
                    : "add_to_cart_div disabled"
                }
                onClick={addToCart}
              >
                Add to cart{" "}
                <span className="arrow">
                  <FontAwesomeIcon icon={faSortUp} rotation={90} />
                </span>
              </div>
            </NavLink>
          </div>
          {!localStorage.token ? (
            <p className="need_signup">
              Please{" "}
              <NavLink to="/signup">
                <span className="signup_link"> sign up </span>
              </NavLink>{" "}
              to order the cocktail
            </p>
          ) : null}
        </div>
        <div className="image_single_cocktail_div">
          <div className="final_image">
            <img
              src={cocktail.image}
              alt="cocktail"
              className="single_cocktail_image"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
