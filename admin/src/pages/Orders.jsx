import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("date");

  useEffect(() => {
    if (token) {
      fetchAllOrders();
    }
  }, [token]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { Authorization: `Bearer ${token}` } } // Use 'Bearer' prefix
      );
      
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch orders.");
      console.error(error);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: event.target.value },
        { headers: { Authorization: `Bearer ${token}` } } // ✅ Use 'Bearer' format
      );
  
      if (response.data.success) {
        toast.success("Order status updated successfully.");
        fetchAllOrders(); // ✅ Refresh orders
      } else {
        toast.error(response.data.message || "Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating status:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Error updating status.");
    }
  };


  const sortedOrders = [...orders].sort((a, b) => {
    if (sortCriteria === "date") return new Date(b.date) - new Date(a.date);
    if (sortCriteria === "amount") return b.amount - a.amount;
    if (sortCriteria === "status") return a.status.localeCompare(b.status);
    if (sortCriteria === "cancelled") return a.status === "Canceled" ? -1 : 1;
    if (sortCriteria === "shipped") return a.status === "Shipped" ? -1 : 1;
    if (sortCriteria === "orderPlaced") return a.status === "Order Placed" ? -1 : 1;
    if (sortCriteria === "packing") return a.status === "Packing" ? -1 : 1;
    if (sortCriteria === "outForDelivery") return a.status === "Out for delivery" ? -1 : 1;
    if (sortCriteria === "delivered") return a.status === "Delivered" ? -1 : 1;
    return 0;
  });

  return (
    <div>
      <h3 className="text-lg font-semibold">Orders</h3>

      {/* Sorting Dropdown */}
      <div className="mb-4">
        <label htmlFor="sort" className="mr-2 font-medium">
          Sort By:
        </label>
        <select
          id="sort"
          className="p-2 border rounded"
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
        >
          <option value="date">Date</option>
          <option value="amount">Amount</option>
          <option value="status">Status</option>
          <option value="packing">Packing</option>
          <option value="cancelled">Canceled</option>
          <option value="shipped">Shipped</option>
          <option value="orderPlaced">Order Placed</option>
          <option value="outForDelivery">Out for Delivery</option>
          <option value="delivered">Delivered</option>
          
        </select>
      </div>

      {/* Order List */}
      {sortedOrders.length > 0 ? (
        sortedOrders.map((order) => (
          <div
            key={order._id}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
          >
            <img className="w-12" src={assets.parcel_icon} alt="Parcel" />
            <div>
              <div className="font-medium">
                {order.items.map((item, index) => (
                  <p key={index} className="py-0.5">
                    {item.name} x {item.quantity} {item.size && <span>({item.size})</span>}
                  </p>
                ))}
              </div>
              <hr />
              <p className="mt-3 mb-2 font-medium">
                {order.address?.firstName} {order.address?.lastName}
              </p>
              <div>
                <p>{order.address?.street},</p>
                <p>
                  {order.address?.city}, {order.address?.barangay}, {order.address?.province},{" "}
                  {order.address?.postalCode}
                </p>
              </div>
              <p>{order.address?.phone}</p>
            </div>

            <div>
              <p className="text-sm sm:text-[15px]">Items: {order.items.length}</p>
              <p className="mt-3">Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? "Done" : "Pending"}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            <p className="text-sm sm:text-[15px]">{currency}{order.amount.toLocaleString()}</p>

            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className="p-2 font-semibold border rounded"
            >
              <option value="OrderPlaced">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Canceled">Canceled</option>
            </select>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No orders found.</p>
      )}
    </div>
  );
};

export default Orders;
