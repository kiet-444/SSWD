import Footer from "components/footer/Footer";
import Navbar from "components/navbar/Navbar";
import React from "react";
import { Link } from "react-router-dom";

function Success() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="flex h-full flex-col items-center justify-center">
          <div className="max-w-md rounded-lg bg-white p-6 text-center shadow-lg">
            <h1 className="mb-4 text-2xl font-bold text-green-500">
              Order Placed Successfully!
            </h1>
            <p className="mb-6 text-lg">
              Thank you for your order. Your order has been successfully placed
              and will be processed shortly.
            </p>
            <Link
              to="/home"
              className="inline-block rounded-lg bg-bloom px-6 py-2 text-lg font-semibold text-white transition duration-300"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-end">
        <Footer />
      </div>
    </div>
  );
}

export default Success;
