import React from "react";
import axios from "axios";

const Inventory = () => {
  const handleSubmitData = () => {
    const product = {};
    axios
      .post("http://localhost:3000/addProduct", product)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div>
      <h3>Inventory Page</h3>
      <form action="">
        <p>
          <span>Name: </span>
          <input type="text" />
        </p>
        <p>
          <span>Price: </span>
          <input type="text" />
        </p>
        <p>
          <span>Quantity: </span>
          <input type="text" />
        </p>
        <p>
          <span>Product Image: </span>
          <input type="file" />
        </p>
        <button onClick={handleSubmitData}>submit data</button>
      </form>
    </div>
  );
};

export default Inventory;
