import React from "react";
import CartModal from "../Modal/CartModal";
import "./Magazine.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Magazine({ props }) {
  const [show, setShow] = React.useState(false);
  let amenaTotal = 0;

  if (props.cartProducts) {
    props.cartProducts.map((elem) => {
      return (amenaTotal += elem.totalPrice);
    });
  }

  const handleDelete = (id) => {
    props.setCartProducts((prev) => {
      return prev.filter((elem) => elem.id !== id);
    });
  };

  const handleOpen = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  const body = (
    <div className="modal_main_div">
      <h1 className="modal_mycart_title">My Cart</h1>
      <table className="ui celled table">
        <thead>
          <tr>
            <th>Cocktail</th>
            <th>Count</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {props.cartProducts
            ? props.cartProducts.map((elem) => {
                return (
                  <tr key={elem.id}>
                    <td data-label="Name">{elem.title}</td>
                    <td data-label="Age">{elem.count}</td>
                    <td data-label="Job">
                      <div className="verjin_syun">
                        <div>{elem.totalPrice} AMD</div>
                        <div
                          className="trash"
                          onClick={() => handleDelete(elem.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
      <div className="total_div">
        <span className="baraci_total">Totat Price : </span> {amenaTotal} AMD
      </div>
      <div className="add_to_cart_modal">Order Now </div>
    </div>
  );

  return (
    <div>
      <li onClick={handleOpen}>
        <FontAwesomeIcon icon={faShoppingCart} />
      </li>
      <CartModal open={show} handleClose={handleClose} body={body} />
    </div>
  );
}
