import React from "react";
import "./Cocktails.css";
import AOS from "aos";

import "aos/dist/aos.css";
import CocktailCard from "./CocktailCard";

export default function Cocktails({ products }) {
  console.log(localStorage.token);
  
  AOS.init();
  return (
    <div>
     
      <div className="main_cocktail_div">
        <div
          className="cocktails_section"
          data-aos="fade-right"
          data-aos-duration="1400"
        >
          {products
            ? products.map((product, index) => (
                <CocktailCard product={product} key={index} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
