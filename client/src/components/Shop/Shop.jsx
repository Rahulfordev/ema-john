import React, { useContext, useEffect, useState } from "react";
import {
  addToDb,
  deleteShoppingCart,
  getShoppingCart,
} from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
import { Link } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import SearchHotel from "../SearchHotel/SearchHotel";
import Booking from "../Booking/Booking";
const Shop = () => {
  const { data } = useFetch("http://localhost:3000/products");
  const [products, setProducts] = useState(data);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setProducts(data);
  }, [data]);

  useEffect(() => {
    const storedCart = getShoppingCart();
    const savedCart = [];
    // step 1: get id of the addedProduct
    for (const id in storedCart) {
      // step 2: get product from products state by using id
      const addedProduct = products.find((product) => product.id === id);
      if (addedProduct) {
        // step 3: add quantity
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        // step 4: add the added product to the saved cart
        savedCart.push(addedProduct);
      }
      // console.log('added Product', addedProduct)
    }
    // step 5: set the cart
    setCart(savedCart);
  }, [products]);

  const handleAddToCart = (product) => {
    // cart.push(product); '
    let newCart = [];
    // const newCart = [...cart, product];
    // if product doesn't exist in the cart, then set quantity = 1
    // if exist update quantity by 1
    const exists = cart.find((pd) => pd.id === product.id);
    if (!exists) {
      product.quantity = 1;
      newCart = [...cart, product];
    } else {
      exists.quantity = exists.quantity + 1;
      const remaining = cart.filter((pd) => pd.id !== product.id);
      newCart = [...remaining, exists];
    }

    setCart(newCart);
    addToDb(product.id);
  };

  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  const handleAlert = () => {
    alert("Please Add to Cart");
  };

  return (
    <div>
      <SearchHotel />
      <Booking />
      <div className="shop-container">
        <div className="products-container">
          {products ? (
            products?.map((product) => (
              <Product
                key={product.id}
                product={product}
                handleAddToCart={handleAddToCart}
              ></Product>
            ))
          ) : (
            <h1 style={{ fontSize: "5rem" }}>Loading</h1>
          )}
        </div>
        <div className="cart-container">
          <Cart cart={cart} handleClearCart={handleClearCart}>
            {cart.length > 0 ? (
              <Link className="proceed-link" to="/orders">
                <button className="btn-proceed">Review Order</button>
              </Link>
            ) : (
              <Link className="proceed-link">
                <button className="btn-proceed" onClick={handleAlert}>
                  Review Order
                </button>
              </Link>
            )}
          </Cart>
        </div>
      </div>
    </div>
  );
};

export default Shop;
