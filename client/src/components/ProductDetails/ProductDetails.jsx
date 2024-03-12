import React from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";

const ProductDetails = () => {
  const { data, error, loading, setData } = useFetch(
    "http://localhost:3000/products"
  );
  const { productKey } = useParams();
  const product = data.find((pd) => pd.id === productKey);

  return (
    <div>
      <h1>Your Product Details.</h1>
      {product && (
        <>
          <div className="product">
            <img src={product.img} alt="" />
            <div className="product-info">
              <h6 className="product-name">{product.name}</h6>
              <p>Price: ${product.price}</p>
              <p>Manufacturer: {product.seller}</p>
              <p>Rating: {product.ratings} Stars</p>
            </div>
            <button
              onClick={() => handleAddToCart(props.product)}
              className="btn-cart"
            >
              Add to Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
