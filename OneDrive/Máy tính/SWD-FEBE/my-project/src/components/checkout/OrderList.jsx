import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import Footer from "components/footer/FooterAuthDefault";
import Navbar from "components/navbar/Navbar";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [token, setToken] = useState(() => localStorage.getItem("accessToken"));
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10); // Number of orders per page
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  // Get current orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Change page
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <h2 className="mb-6 text-3xl font-semibold text-gray-800">Orders</h2>
        {loading ? (
          <p className="text-center text-lg">Loading...</p>
        ) : (
          <div className="overflow-x-auto rounded-lg bg-white shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Customer Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {currentOrders.map((order) => (
                  <tr key={order._id}>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      {order._id}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      {order.customerID?.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-hemp">
                      <Link
                        to={`/orders/${order._id}`}
                        className="hover:underline"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="mt-6 flex justify-center">
          <nav className="inline-flex rounded-md shadow-sm" aria-label="Pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded ${
                  currentPage === page ? 'bg-bloom text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
          </nav>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default OrderList;