import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../providers/AuthProvider";
import { deleteShoppingCart, getShoppingCart } from "../../utilities/fakedb";
import axios from "axios";
import "./checkout.css";
import PaymentProcess from "../PaymentProcess/PaymentProcess";
import InjectedCheckoutForm from "../PaymentProcess/PaymentProcess";

const Checkout = () => {
  const { user, logOut } = useContext(AuthContext);
  const [shippingData, setShippingData] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    setShippingData(data);
  };

  const handlePaymentCuccess = (paymentId) => {
    const storedCart = getShoppingCart();
    const orderDetails = {
      ...user,
      products: storedCart,
      shipment: shippingData,
      paymentId,
      orderTime: new Date(),
    };

    axios
      .post("http://localhost:3000/addOrder", orderDetails)
      .then(function (response) {
        console.log(response);
        deleteShoppingCart();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="checkout">
      <div style={{ display: shippingData ? "none" : "block" }}>
        <h2>Checkout your order!!! page </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <input {...register("name", { required: true })} />
          {errors.name && <p>This field is required</p>}

          <input {...register("email", { required: true })} />
          {errors.email && <p>This field is required</p>}

          <input {...register("address", { required: true })} />
          {errors.address && <p>This field is required</p>}

          <input {...register("number", { required: true })} />
          {errors.number && <p>This field is required</p>}

          <input type="submit" />
        </form>
      </div>
      <div style={{ display: shippingData ? "block" : "none" }}>
        <PaymentProcess handlePayment={handlePaymentCuccess} />
      </div>
    </div>
  );
};

export default Checkout;
