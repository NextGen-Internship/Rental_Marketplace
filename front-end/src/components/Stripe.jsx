import { Elements } from "@stripe/react-stripe-js";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("pk_test_51OcpzgGAUVgXgq0OFvPvZ89UhGB4Wo7C3iQqY9kIGCrFlFI0Qd4muHxWGDVXhQ9TZKjWUDdsvh069kypWpIBJZad00r3guE4OV");


export default function StripeApp(item) {
    const [clientSecret, setClientSecret] = useState("");

  
    useEffect(() => {
      // Create PaymentIntent as soon as the page loads
      fetch("/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({item}),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }, []);
  
    const appearance = {
      theme: 'stripe',
    };
    const options = {
      clientSecret,
      appearance,
    };
  
    return (
      <div className="Stripe">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    );
  }