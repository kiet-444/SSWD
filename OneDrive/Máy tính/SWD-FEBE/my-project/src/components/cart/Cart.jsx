import { Button } from "@material-tailwind/react";
import Footer from "components/footer/Footer";
import Navbar from "components/navbar/Navbar";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Cart() {
  const [carts, setCarts] = useState([]);
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCarts(storedCart);
  }, []);

  const handleInc = (_id) => {
    const updatedCart = carts.map((item) => {
      if (item._id === _id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCarts(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDec = (_id) => {
    const updatedCart = carts.map((item) => {
      if (item._id === _id) {
        const newQuantity = Math.max(1, item.quantity - 1);
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    });
    setCarts(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeProduct = (_id) => {
    const updatedCart = carts.filter((item) => item._id !== _id);
    setCarts(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const displayPrice = (price) => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      trailingZeroDisplay: "stripIfInteger",
    });
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-10">
        <div className="my-10 flex-wrap shadow-md">
          <div className="bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="text-2xl font-semibold">Shopping Cart</h1>
              <h2 className="text-2xl font-semibold">{carts.length} Items</h2>
            </div>
            <div className="mb-5 mt-10 flex flex-wrap">
              <h3 className="w-2/5 text-xs font-semibold uppercase text-gray-600">
                Product Details
              </h3>
              <h3 className="w-1/5 text-center text-xs font-semibold uppercase text-gray-600">
                Quantity
              </h3>
              <h3 className="w-1/5 text-center text-xs font-semibold uppercase text-gray-600">
                Price
              </h3>
              <h3 className="w-1/5 text-center text-xs font-semibold uppercase text-gray-600">
                Total
              </h3>
            </div>
            {carts.length === 0 && (
              <h1 className="flex h-28 items-center text-gray-600 justify-center text-2xl">
                Cart is Empty
              </h1>
            )}
            {carts.length !== 0 &&
              carts.map((cart) => {
                return (
                  <div
                    className="-mx-8 flex items-center px-6 py-5 hover:bg-gray-100"
                    key={cart._id}
                  >
                    <div className="flex w-2/5">
                      <img
                        className="h-24"
                        src={cart.imageIDs[0].imageLink}
                        alt={cart.name}
                      />
                      <div className="ml-4 flex flex-grow flex-col justify-evenly">
                        <span className="font-bold">{cart.name}</span>
                        <div
                          className="cursor-pointer text-sm font-semibold text-gray-500 hover:text-red-500"
                          onClick={() => removeProduct(cart._id)}
                        >
                          Remove
                        </div>
                      </div>
                    </div>
                    <div className="flex w-1/5 justify-center">
                      <svg
                        className="fill-current w-3 cursor-pointer text-gray-600"
                        viewBox="0 0 448 512"
                        onClick={() => handleDec(cart._id)}
                      >
                        <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>
                      <input
                        className="mx-2 w-8 border text-center"
                        type="text"
                        value={cart.quantity}
                        readOnly
                      />
                      <svg
                        className="fill-current w-3 cursor-pointer text-gray-600"
                        onClick={() => handleInc(cart._id)}
                        viewBox="0 0 448 512"
                      >
                        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>
                    </div>
                    <span className="w-1/5 text-center text-sm font-semibold">
                      {displayPrice(cart.price)}
                    </span>
                    <span className="w-1/5 text-center text-sm font-semibold">
                      {displayPrice(cart.price * cart.quantity)}
                    </span>
                  </div>
                );
              })}

            <div className="mt-10 flex justify-between">
              <Button className="bg-bloom text-sm font-semibold text-hemp">
                <Link to={"/home"}>Continue Shopping</Link>
              </Button>

              {carts.length !== 0 && (
                <Button className="bg-bloom text-sm font-semibold text-hemp">
                  <Link
                    to="/checkout"
                    className="bg-bloom p-2 text-center text-sm font-semibold uppercase text-hemp"
                    style={{ width: "auto" }}
                  >
                    Checkout
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cart;
