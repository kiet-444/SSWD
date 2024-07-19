import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import Footer from "components/footer/FooterAuthDefault";
import Navbar from "components/navbar/Navbar";

function OrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("accessToken"));

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrder(response.data.order);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrder();
  }, [orderId, token]);

  const displayPrice = (price) => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      trailingZeroDisplay: "stripIfInteger",
    });
  };

  if (!order) return <p className="mt-8 text-center text-lg">Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 mb-5">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 text-3xl font-bold text-gray-800">
            Order Details
          </h2>
          <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
            <p className="mb-2">
              <strong className="text-gray-700">Order ID:</strong> {order._id}
            </p>
            <p className="mb-2">
              <strong className="text-gray-700">Total Price:</strong>{" "}
              {displayPrice(order.totalPrice)}
            </p>
            <p className="mb-2">
              <strong className="text-gray-700">Quantity:</strong>{" "}
              {order.quantity}
            </p>
            <h3 className="mb-2 mt-4 text-2xl font-bold text-gray-800">
              Products
            </h3>
            <ul>
              {order.orderDetails.map((detail) => (
                <li
                  key={detail._id}
                  className="mb-4 flex gap-3 rounded-lg bg-gray-100 p-4"
                >
                  <img
                    src={detail.productID.imageIDs[0].imageLink}
                    alt={detail.productID.name}
                    className="mt-2 h-24 w-24 rounded object-cover"
                  />
                  <div>
                    <p className="mb-2">
                      <strong className="text-gray-700">Name:</strong>{" "}
                      {detail.productID.name}
                    </p>
                    <p className="mb-2">
                      <strong className="text-gray-700">Price:</strong>{" "}
                      {displayPrice(detail.productID.price)}
                    </p>
                    <p className="mb-2">
                      <strong className="text-gray-700">Quantity:</strong>{" "}
                      {detail.quantity}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="w-full rounded-lg bg-bloom py-2 text-lg font-semibold text-white transition duration-300"
          >
            Back
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default OrderDetail;
