import React from "react";
import "./CocktailCard.css";
import { Link } from "react-router-dom";

export default function CocktailCard({ product }) {
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="image image_div flip-card-front">
          <img src={product.image} alt="nkar" width="100%" />
        </div>
        <div className="flip-card-back">
          <div className="flip_card_back_inner">
            <h1 className="flip_card_title">{product.title}</h1>
            <p className="flip_card_price">{product.price} AMD</p>
           
            <Link to={`/products/product/${product._id}`}>
              <div className="ui vertical animated button ban " tabIndex="0">
                <div className="hidden content">Shop</div>
                <div className="visible content">
                  <i className="shop icon"></i>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
