import React from "react";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import "./payment.css";
import SplitForm from "./ElementDemos";

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

const PaymentProcess = ({handlePayment}) => {
  return (
    <Elements stripe={stripePromise}>
      <SplitForm handlePayment={handlePayment} />
    </Elements>
  );
};

export default PaymentProcess;
