import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./Product.css";
import { Link } from "react-router-dom";

const Product = (props) => {
  const { id, img, name, seller, ratings, price } = props.product;
  const handleAddToCart = props.handleAddToCart;

  return (
    <div>
      <div className="product">
        <img src={img} alt="" />
        <div className="product-info">
          <h6 className="product-name">
            <Link to={"/product/" + id}>{name}</Link>
          </h6>
          <p>Price: ${price}</p>
          <p>Manufacturer: {seller}</p>
          <p>Rating: {ratings} Stars</p>
        </div>
        <button
          onClick={() => handleAddToCart(props.product)}
          className="btn-cart"
        >
          Add to Cart
          <FontAwesomeIcon icon={faShoppingCart} />
        </button>
      </div>
    </div>
  );
};

export default Product;
