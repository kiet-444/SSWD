import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "api/axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Footer from "components/footer/FooterAuthDefault";
import Navbar from "components/navbar/Navbar";

function Checkout() {
  const [carts, setCarts] = useState([]);
  const [token, setToken] = useState(() => localStorage.getItem("accessToken"));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [stores, setStores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCarts(storedCart);
  }, []);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("/customers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (Array.isArray(response.data.customers)) {
          setCustomers(response.data.customers);
        } else {
          console.error("Unexpected response data format:", response.data);
          setCustomers([]);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
        setCustomers([]);
      }
    };

    const fetchPaymentMethods = async () => {
      try {
        const response = await axios.get("/payments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPaymentMethods(response.data);
      } catch (error) {
        console.error("Error fetching payment methods:", error);
      }
    };

    const fetchStores = async () => {
      try {
        const response = await axios.get("/stores", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStores(response.data.stores);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };

    fetchCustomers();
    fetchPaymentMethods();
    fetchStores();
  }, [token]);

  const handleSelectCustomer = (customer) => {
    formik.setValues({
      name: customer.name,
      age: customer.age,
      address: customer.address,
      phone: customer.phone,
    });
    formik.setFieldValue("_id", customer._id);
    setIsModalOpen(false);
  };

  const checkExistingCustomer = async (phone) => {
    try {
      const response = await axios.get(`/customers?phone=${phone}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.customers.length > 0
        ? response.data.customers[0]
        : null;
    } catch (error) {
      console.error("Error checking customer:", error);
      return null;
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      address: "",
      phone: "",
      _id: "",
      paymentMethod: {},
      store: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      age: Yup.number().required("Required").min(0, "Age must be positive"),
      address: Yup.string().required("Required"),
      phone: Yup.string().required("Required"),
      store: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        let customer = await checkExistingCustomer(values.phone);
        if (!customer) {
          const customerResponse = await axios.post(
            "/customers",
            values,
            config
          );
          customer = customerResponse.data.customer;
        }

        const orderResponse = await axios.post(
          "/orders",
          {
            customerID: customer._id,
            payments: [values.paymentMethod],
            storeID: values.store,
          },
          config
        );

        const orderID = orderResponse.data.order._id;

        await axios.post(
          "/orderDetails",
          {
            products: carts.map((cart) => ({
              productID: cart._id,
              quantity: cart.quantity,
            })),
            orderID: orderID,
          },
          config
        );

        alert("Order created successfully!");
        localStorage.setItem("cart", JSON.stringify([]));
        navigate("/success");
      } catch (error) {
        console.error(
          "Error creating order:",
          error.response ? error.response.data : error.message
        );
        alert(
          `Error creating order: ${
            error.response ? error.response.data : error.message
          }`
        );
      }
    },
  });

  const displayPrice = (price) => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      trailingZeroDisplay: "stripIfInteger",
    });
  };

  const calculateTotal = () => {
    let total = carts.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    return displayPrice(total);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="w-full md:w-1/2">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-2xl font-bold">Customer Info</h2>
              <button
                onClick={() => setIsModalOpen(true)}
                className="mb-4 rounded bg-bloom px-4 py-2 font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Select Customer
              </button>
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-bold text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                    {...formik.getFieldProps("name")}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-sm text-red-500">
                      {formik.errors.name}
                    </div>
                  ) : null}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="age"
                    className="mb-2 block text-sm font-bold text-gray-700"
                  >
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    className="w-full rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                    {...formik.getFieldProps("age")}
                  />
                  {formik.touched.age && formik.errors.age ? (
                    <div className="text-sm text-red-500">
                      {formik.errors.age}
                    </div>
                  ) : null}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-bold text-gray-700"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    className="w-full rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                    {...formik.getFieldProps("phone")}
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <div className="text-sm text-red-500">
                      {formik.errors.phone}
                    </div>
                  ) : null}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="address"
                    className="mb-2 block text-sm font-bold text-gray-700"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="w-full rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                    {...formik.getFieldProps("address")}
                  />
                  {formik.touched.address && formik.errors.address ? (
                    <div className="text-sm text-red-500">
                      {formik.errors.address}
                    </div>
                  ) : null}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="paymentMethod"
                    className="mb-2 block text-sm font-bold text-gray-700"
                  >
                    Payment Method
                  </label>
                  <select
                    id="paymentMethod"
                    className="w-full rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={formik.values.paymentMethod?._id || ""}
                    onChange={(e) => {
                      const selectedMethod = paymentMethods.find(
                        (method) => method._id === e.target.value
                      );
                      formik.setFieldValue("paymentMethod", selectedMethod);
                    }}
                  >
                    <option value="">Select a payment method</option>
                    {paymentMethods.map((method) => (
                      <option key={method._id} value={method._id}>
                        {method.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="store"
                    className="mb-2 block text-sm font-bold text-gray-700"
                  >
                    Store
                  </label>
                  <select
                    id="store"
                    className="w-full rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                    {...formik.getFieldProps("store")}
                  >
                    <option value="">Select a store</option>
                    {stores.map((store) => (
                      <option key={store._id} value={store._id}>
                        {store.name}
                      </option>
                    ))}
                  </select>
                  {formik.touched.store && formik.errors.store ? (
                    <div className="text-sm text-red-500">
                      {formik.errors.store}
                    </div>
                  ) : null}
                </div>
                <button
                  type="submit"
                  className="rounded bg-bloom px-4 py-2 font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </form>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-2xl font-bold">Cart</h2>
              {carts.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                <ul>
                  {carts.map((cart) => (
                    <li
                      key={cart._id}
                      className="mb-2 flex items-center border-b border-gray-200 pb-2"
                    >
                      <img
                        src={cart.imageIDs[0].imageLink}
                        alt={cart.name}
                        className="mr-2 h-16 w-16 object-cover"
                      />
                      <div>
                        <p className="font-bold">{cart.name}</p>
                        <p>Quantity: {cart.quantity}</p>
                        <p>Price: {displayPrice(cart.price)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-lg font-semibold">
                  {calculateTotal()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="w-full max-w-3xl rounded bg-white p-6 shadow-lg">
              <div className="mb-4 flex justify-between">
                <h2 className="text-2xl font-bold">Select Customer</h2>
                <button
                  className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
              </div>
              <input
                type="text"
                placeholder="Search by name or phone"
                className="mb-4 w-full rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <ul className="max-h-64 overflow-y-auto">
                {customers
                  .filter(
                    (customer) =>
                      customer.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      customer.phone.includes(searchQuery)
                  )
                  .map((customer) => (
                    <li
                      key={customer._id}
                      className="mb-2 cursor-pointer rounded border p-2 hover:bg-gray-200"
                      onClick={() => handleSelectCustomer(customer)}
                    >
                      <p className="font-bold">{customer.name}</p>
                      <p>Phone: {customer.phone}</p>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Checkout;
