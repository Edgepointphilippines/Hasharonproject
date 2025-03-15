import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import Chart from "chart.js/auto";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import ViewersTracker from "../components/ViewersTracker";

const OrderAnalytics = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalSales: 0,
    totalOrders: 0,
    orderStatusDistribution: {},
    topProducts: {},
    monthlyEarnings: {},
    averageOrderValue: 0, 
  });

  // Chart references
  const statusChartRef = useRef(null);
  const productChartRef = useRef(null);
  const earningsChartRef = useRef(null);

  // Fetch orders from backend
  const fetchAllOrders = async () => {
    console.log("Fetching orders...");

    if (!token) {
      console.error("Token is missing!");
      toast.error("Authentication token is missing!");
      return;
    }

    console.log("Using token:", token); // Check if token is available

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { Authorization: `Bearer ${token}` } } // Ensure correct format
      );

      console.log("Response:", response.data);

      if (response.data.success) {
        setOrders(response.data.orders || []);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders: " + (error.response?.data?.message || error.message));
    }
  };

  // Calculate analytics
  const calculateAnalytics = () => {
    if (!orders || !Array.isArray(orders) || orders.length === 0) {
      setAnalytics({
        totalSales: 0,
        totalOrders: 0,
        orderStatusDistribution: {},
        topProducts: {},
        monthlyEarnings: {},
        averageOrderValue: 0,  // Set default value
      });
      return;
    }
  
    const totalSales = orders.reduce((sum, order) => sum + (order.amount || 0), 0);
    const totalOrders = orders.length;
  
    const orderStatusDistribution = {};
    const topProducts = {};
    const monthlyEarnings = {};
  
    // Calculate the analytics for each order
    orders.forEach((order) => {
      if (!order) return;
  
      // Order status count
      orderStatusDistribution[order.status] = (orderStatusDistribution[order.status] || 0) + 1;
  
      // Product sales count
      if (Array.isArray(order.items)) {
        order.items.forEach((item) => {
          if (item && item.name) {
            topProducts[item.name] = (topProducts[item.name] || 0) + (item.quantity || 0);
          }
        });
      }
  
      // Monthly earnings
      if (order.date) {
        const date = new Date(order.date);
        if (!isNaN(date)) {
          const month = date.toLocaleString("default", { year: "numeric", month: "long" });
          monthlyEarnings[month] = (monthlyEarnings[month] || 0) + (order.amount || 0);
        }
      }
    });
  
    // Calculate Average Order Value
    const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;
  
    setAnalytics({
      totalSales,
      totalOrders,
      orderStatusDistribution,
      topProducts,
      monthlyEarnings,
      averageOrderValue,
    });
  };
  

  // Fetch orders on mount
  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  // Calculate analytics when orders change
  useEffect(() => {
    calculateAnalytics();
  }, [orders]);

  // Render charts
  useEffect(() => {
    if (Object.keys(analytics.orderStatusDistribution).length === 0) return;

    // Destroy previous charts
    statusChartRef.current?.destroy();
    productChartRef.current?.destroy();
    earningsChartRef.current?.destroy();

    // Order status chart
    const statusCtx = document.getElementById("statusChart")?.getContext("2d");
    if (statusCtx) {
      statusChartRef.current = new Chart(statusCtx, {
        type: "pie",
        data: {
          labels: Object.keys(analytics.orderStatusDistribution),
          datasets: [
            {
              data: Object.values(analytics.orderStatusDistribution),
              backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0", "#9966ff"],
            },
          ],
        },
      });
    }

    // Top products chart
    const productCtx = document.getElementById("productsChart")?.getContext("2d");
    if (productCtx) {
      productChartRef.current = new Chart(productCtx, {
        type: "bar",
        data: {
          labels: Object.keys(analytics.topProducts),
          datasets: [
            {
              label: "Quantity Sold",
              data: Object.values(analytics.topProducts),
              backgroundColor: "#36a2eb",
            },
          ],
        },
      });
    }

    // Monthly earnings chart
    const earningsCtx = document.getElementById("earningsChart")?.getContext("2d");
    if (earningsCtx) {
      earningsChartRef.current = new Chart(earningsCtx, {
        type: "line",
        data: {
          labels: Object.keys(analytics.monthlyEarnings),
          datasets: [
            {
              label: "Earnings",
              data: Object.values(analytics.monthlyEarnings),
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "#36a2eb",
              fill: true,
            },
          ],
        },
      });
    }
  }, [analytics]);


 // 🚀 Export to PDF (Now Includes All Products)
const exportToPDF = () => {
  const doc = new jsPDF();
  doc.text("Order Analytics Report", 14, 15);

  // Summary Table
  doc.autoTable({
    startY: 25,
    head: [["Metric", "Value"]],
    body: [
      ["Total Sales", `${currency}${analytics.totalSales.toLocaleString()}`],
      ["Total Orders", analytics.totalOrders],
    ],
  });

  // Order Status Table
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 10,
    head: [["Order Status", "Count"]],
    body: Object.entries(analytics.orderStatusDistribution).map(([status, count]) => [status, count]),
  });

  // Monthly Earnings Table
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 10,
    head: [["Month", "Earnings"]],
    body: Object.entries(analytics.monthlyEarnings).map(([month, earnings]) => [
      month,
      `${currency}${earnings.toLocaleString()}`,
    ]),
  });

  // Product Sales Table (ALL Products)
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 10,
    head: [["Product Name", "Quantity Sold"]],
    body: Object.entries(analytics.topProducts).map(([name, qty]) => [name, qty]),
  });

  doc.save("Order_Analytics_Report.pdf");
};
//export excel
const exportToExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(orders.map(order => ({
    "Order ID": order.id,
    "Customer Name": order.customerName,
    "Product Name": order.items.map(item => item.name).join(", "), // Multiple products
    "Quantity": order.items.reduce((sum, item) => sum + item.quantity, 0), // Total quantity
    "Price": order.amount,
    "Status": order.status,
    "Date Ordered": new Date(order.date).toLocaleDateString(),
  })));

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
  XLSX.writeFile(workbook, "Order_Analytics.xlsx");
};


//import excel
// Import Excel function
const importFromExcel = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    // Convert Excel data to match order schema
    const importedOrders = jsonData.map(row => ({
      userId: row["User ID"] || "default-user-id",  // Ensure userId is present
      customerName: row["Customer Name"] || "Unknown",
      items: row["Product Name"] 
        ? row["Product Name"].split(", ").map(name => ({ name, quantity: row["Quantity"] || 1 }))
        : [],
      amount: Number(row["Price"] || 0), // Ensure amount is a number
      status: row["Status"] || "Order Placed",
      date: new Date(row["Date Ordered"]).getTime(), // Convert to timestamp
      address: row["Address"] || "Unknown Address", // Ensure address is present
      paymentMethod: row["Payment Method"] || "Unknown", // Ensure payment method is present
      payment: row["Payment Status"] ? row["Payment Status"] === "Paid" : false, // Convert to boolean
    }));

    console.log("📊 Formatted Orders for Backend:", importedOrders);

    // Send imported orders to backend
    saveImportedOrders(importedOrders);
  };
  reader.readAsArrayBuffer(file);
};


// Function to save imported orders to backend
const saveImportedOrders = async (orders) => {
  try {
    const response = await axios.post(
      backendUrl + "/api/order/import",
      { orders },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.data.success) {
      toast.success("Orders imported successfully!");
      fetchAllOrders(); // Refresh data after import
    } else {
      toast.error("Import failed: " + response.data.message);
    }
  } catch (error) {
    console.error("Error saving orders:", error);
    toast.error("Failed to import orders: " + (error.response?.data?.message || error.message));
  }
};


const exportToCSV = () => {
  const csvData = orders.map((order) => ({
    "Order ID": order.id,
    "Customer Name": order.customerName,
    "Product Name": order.items.map((item) => item.name).join(", "),
    "Quantity": order.items.reduce((sum, item) => sum + item.quantity, 0),
    "Price": order.amount,
    "Status": order.status,
    "Date Ordered": new Date(order.date).toLocaleDateString(),
  }));

  const csvContent = [
    Object.keys(csvData[0]).join(","),
    ...csvData.map((row) => Object.values(row).join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Order_Analytics.csv";
  link.click();
};





  return (
    <div className="p-4 md:p-8 lg:p-10">
  <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">Order Analytics</h3>

  {/* Export & Import Section */}
  <div className="flex flex-wrap gap-3 justify-center md:justify-between bg-white p-4 rounded-lg shadow-md mb-6">
    <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
      <button
        onClick={exportToPDF}
        className="px-4 py-2 md:px-5 md:py-2.5 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        📄 Export to PDF
      </button>
      <button
        onClick={exportToExcel}
        className="px-4 py-2 md:px-5 md:py-2.5 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
      >
        📊 Export to Excel
      </button>
      <button
        onClick={exportToCSV}
        className="px-4 py-2 md:px-5 md:py-2.5 bg-yellow-600 text-white rounded-lg shadow hover:bg-yellow-700 transition"
      >
        🗃 Export to CSV
      </button>

    </div>
    <label className="px-4 py-2 md:px-5 md:py-2.5 bg-gray-200 text-gray-700 rounded-lg shadow cursor-pointer hover:bg-gray-300 transition">
      📥 Import Excel
      <input type="file" accept=".xlsx, .xls" className="hidden" onChange={importFromExcel} />
    </label>
  </div>

  {/* Summary Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
    <div className="p-6 bg-gray-100 border rounded-lg shadow-lg text-center min-h-[120px]">
      <h4 className="text-lg md:text-xl font-semibold mb-2">Total Sales</h4>
      <p className="text-xl md:text-2xl">{currency}{analytics.totalSales.toLocaleString()}</p>
    </div>
    <div className="p-6 bg-gray-100 border rounded-lg shadow-lg text-center min-h-[120px]">
      <h4 className="text-lg md:text-xl font-semibold mb-2">Total Orders</h4>
      <p className="text-xl md:text-2xl">{analytics.totalOrders}</p>
    </div>
    <div className="p-6 bg-gray-100 border rounded-lg shadow-lg text-center min-h-[120px]">
      <h4 className="text-lg md:text-xl font-semibold mb-2">Top Product</h4>
      <p className="text-lg md:text-xl">
        {Object.entries(analytics.topProducts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 1)
          .map(([name, qty]) => `${name} (${qty} sold)`)
          .join(", ")}
      </p>
    </div>

    <div className="p-6 bg-gray-100 border rounded-lg shadow-lg text-center min-h-[120px]">
  <h4 className="text-lg md:text-xl font-semibold mb-2">Average Order Value (AOV)</h4>
  <p className="text-xl md:text-2xl">{currency}{analytics.averageOrderValue.toFixed(2)}</p>
</div>

  </div>

  {/* Charts Section */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* Full-width Quantity Sold Chart */}
    <div className="bg-white p-4 rounded-lg shadow-lg col-span-1 md:col-span-2 lg:col-span-3">
      <h4 className="text-lg md:text-xl font-semibold mb-4 text-center">Quantity Sold</h4>
      <canvas id="productsChart" className="w-full aspect-[3/1]"></canvas>
    </div>

    {/* Other Charts (Two-Column on iPad Mini) */}
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h4 className="text-lg md:text-xl font-semibold mb-4 text-center">Order Status</h4>
      <canvas id="statusChart" className="w-full aspect-[4/3]"></canvas>
    </div>
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h4 className="text-lg md:text-xl font-semibold mb-4 text-center">Earnings</h4>
      <canvas id="earningsChart" className="w-full aspect-[4/3]"></canvas>
    </div>


    <ViewersTracker/>
  </div>
</div>

  
  );
};
export default OrderAnalytics;
