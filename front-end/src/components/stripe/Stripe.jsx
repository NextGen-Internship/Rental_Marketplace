import {useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

function StripePay() {
  const [stripePromise, setStripePromise] = useState<StripePay | null>(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const fetchStripeKeys = async () => {
      try {
        
        const prom = await loadStripe("pk_test_51OcpzgGAUVgXgq0OFvPvZ89UhGB4Wo7C3iQqY9kIGCrFlFI0Qd4muHxWGDVXhQ9TZKjWUDdsvh069kypWpIBJZad00r3guE4OV");
        setStripePromise(prom);
      } catch (error) {
        console.error("Error fetching Stripe keys:", error);
      }
    };

    fetchStripeKeys();
  }, []);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await fetch("http://localhost:8080/stripe/checkout", {
          method: "POST",
          body: JSON.stringify({}),
        });
        const { clientSecret } = await response.json();
        
        setClientSecret(clientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    };

    fetchClientSecret();
  }, []);

  return (
    <>
      {stripePromise && clientSecret &&(
      <Elements stripe={stripePromise}  options={ {clientSecret} }>
        <CheckoutForm />
      </Elements>
      )}
    </>
  );
}

export default StripePay;