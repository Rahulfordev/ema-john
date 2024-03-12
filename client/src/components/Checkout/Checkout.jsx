import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../providers/AuthProvider";
import { deleteShoppingCart, getShoppingCart } from "../../utilities/fakedb";
import axios from "axios";

const Checkout = () => {
  const { user, logOut } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const storedCart = getShoppingCart();
    const orderDetails = {
      ...user,
      products: storedCart,
      shipment: data,
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <h2>Checkout your order!!! page </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          width: "300px",
        }}
      >
        <input defaultValue={user.displayName} {...register("name")} />
        {errors.name && <p>This field is required</p>}

        <input
          defaultValue={user.email}
          {...register("email", { required: true })}
        />
        {errors.email && <p>This field is required</p>}

        <input {...register("address", { required: true })} />
        {errors.address && <p>This field is required</p>}

        <input {...register("number", { required: true })} />
        {errors.number && <p>This field is required</p>}

        <input type="submit" />
      </form>
    </div>
  );
};

export default Checkout;
