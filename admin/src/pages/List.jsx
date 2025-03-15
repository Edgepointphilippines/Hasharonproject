import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { FaTrash } from "react-icons/fa"; // Import trash icon


const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [editedQuantities, setEditedQuantities] = useState({});
  const [editedDiscounts, setEditedDiscounts] = useState({});
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState({}); // Tracks updating state for each product
  const [sortOption, setSortOption] = useState('');
  const [editedNames, setEditedNames] = useState({});
  const [editedPrices, setEditedPrices] = useState({});


  const handleSort = (option) => {
    setSortOption(option);
    let sortedList = [...list];

    switch (option) {
      case 'name-asc':
        sortedList.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sortedList.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        sortedList.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sortedList.sort((a, b) => b.price - a.price);
        break;
      case 'discount-asc':
        sortedList.sort((a, b) => a.discount - b.discount);
        break;
      case 'discount-desc':
        sortedList.sort((a, b) => b.discount - a.discount);
        break;
      case 'quantity-asc':
        sortedList.sort((a, b) => a.quantity - b.quantity);
        break;
      case 'quantity-desc':
        sortedList.sort((a, b) => b.quantity - a.quantity);
        break;
      default:
        break;
    }

    setList(sortedList);
  };


  // Fetch the product list
  const fetchList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (id, value, setEditedState) => {
    if (!/^\d*$/.test(value)) return; // Prevents non-numeric input
    setEditedState(prev => ({
      ...prev,
      [id]: value !== "" ? parseInt(value, 10) : "",
    }));
  };

  // Update product quantity
  const updateQuantity = async (id) => {
    const quantity = editedQuantities[id] ?? list.find(p => p._id === id)?.quantity;
    if (quantity < 0 || isNaN(quantity)) {
      toast.error("Invalid quantity value.");
      return;
    }

    setUpdating(prev => ({ ...prev, [id]: true }));
    try {
      const response = await axios.put(
        `${backendUrl}/api/product/updateQuantity/${id}`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success("Quantity updated successfully.");
        await fetchList();
        setEditedQuantities(prev => {
          const updated = { ...prev };
          delete updated[id];
          return updated;
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update quantity.");
    } finally {
      setUpdating(prev => ({ ...prev, [id]: false }));
    }
  };

  // Update product discount
  const updateDiscount = async (id) => {
    const discount = editedDiscounts[id] ?? list.find(p => p._id === id)?.discount;
    if (discount < 0 || discount > 100 || isNaN(discount)) {
      toast.error("Invalid discount value (0-100%).");
      return;
    }

    setUpdating(prev => ({ ...prev, [id]: true }));
    try {
      const response = await axios.put(
        `${backendUrl}/api/product/updateDiscount/${id}`,
        { discount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success("Discount updated successfully.");
        await fetchList();
        setEditedDiscounts(prev => {
          const updated = { ...prev };
          delete updated[id];
          return updated;
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update discount.");
    } finally {
      setUpdating(prev => ({ ...prev, [id]: false }));
    }
  };

  // Remove a product
  const removeProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    setUpdating(prev => ({ ...prev, [id]: true }));
    try {
      const response = await axios.delete(`${backendUrl}/api/product/delete`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { id },
      });

      if (response.data.success) {
        toast.success("Product deleted successfully.");
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product.");
    } finally {
      setUpdating(prev => ({ ...prev, [id]: false }));
    }
  };

  // // Fetch products on mount
  // useEffect(() => {
  //   fetchList();
  // }, []);


  const toggleBestSeller = async (id, currentStatus) => {
    setUpdating((prev) => ({ ...prev, [id]: true }));

    try {
        const response = await axios.put(
            `${backendUrl}/api/product/updateBestSeller/${id}`,
            { bestseller: !currentStatus }, // Toggle status
            { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
            toast.success(`Product ${!currentStatus ? "added to" : "removed from"} Best Sellers.`);
            await fetchList();
        } else {
            toast.error(response.data.message);
        }
    } catch (error) {
        console.error("Error updating bestseller:", error.response?.data || error.message);
        toast.error("Failed to update Best Seller status.");
    } finally {
        setUpdating((prev) => ({ ...prev, [id]: false }));
    }
};




// update price
const updatePrice = async (id) => {
  const price = editedPrices[id] ?? list.find((p) => p._id === id)?.price;
  if (price <= 0 || isNaN(price)) {
    toast.error("Invalid price value.");
    return;
  }

  setUpdating((prev) => ({ ...prev, [id]: true }));
  try {
    const response = await axios.put(
      `${backendUrl}/api/product/updatePrice/${id}`,
      { price },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.data.success) {
      toast.success("Product price updated successfully.");
      await fetchList();
      setEditedPrices((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to update product price.");
  } finally {
    setUpdating((prev) => ({ ...prev, [id]: false }));
  }
};




  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2 text-lg font-semibold">All Products List</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        
        <div className="overflow-x-auto">
           <div className="flex items-center mb-4 space-x-2">
        <label className="font-semibold">Sort By:</label>
        <select
          value={sortOption}
          onChange={(e) => handleSort(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">Select</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
          <option value="discount-asc">Discount (Low to High)</option>
          <option value="discount-desc">Discount (High to Low)</option>
          <option value="quantity-asc">Quantity (Low to High)</option>
          <option value="quantity-desc">Quantity (High to Low)</option>
        </select>
      </div>
          <table className="min-w-full border-collapse table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Image</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Discount (%)</th>
                <th className="px-4 py-2 text-left">Quantity</th>
                <th className="px-4 py-2 text-left">Weight(kg)</th>
                <th className="px-20 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item) => (
                <tr key={item._id} className="border-b">
                  <td className="px-4 py-2">
                    <img className="w-12 rounded" src={item.image[0]} alt={item.name} />
                  </td>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.category}</td>
                  {/* price */}
                  <td className="px-4 py-2 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <input
                        type="number"
                        min="0"
                        value={editedPrices[item._id] ?? item.price}
                        onChange={(e) => handleChange(item._id, e.target.value, setEditedPrices)}
                        className="w-20 p-1 text-center border rounded"
                      />
                      <button
                        onClick={() => updatePrice(item._id)}
                        className="p-1 text-xs text-white bg-blue-500 rounded-md hover:bg-blue-600"
                        disabled={updating[item._id]}
                      >
                        {updating[item._id] ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </td>

                  <td className="px-4 py-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={editedDiscounts[item._id] ?? item.discount}
                        onChange={(e) => handleChange(item._id, e.target.value, setEditedDiscounts)}
                        className="w-20 p-1 text-center border rounded"
                      />
                      <button
                        onClick={() => updateDiscount(item._id)}
                        className="p-1 text-xs text-white bg-blue-500 rounded-md hover:bg-blue-600"
                        disabled={updating[item._id]}
                      >
                        {updating[item._id] ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        min="0"
                        value={editedQuantities[item._id] ?? item.quantity}
                        onChange={(e) => handleChange(item._id, e.target.value, setEditedQuantities)}
                        className="w-20 p-1 text-center border rounded"
                      />
                      <button
                        onClick={() => updateQuantity(item._id)}
                        className="p-1 text-xs text-white bg-blue-500 rounded-md hover:bg-blue-600"
                        disabled={updating[item._id]}
                      >
                        {updating[item._id] ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-2">{item.weight} kg</td>
                  {/* action buttons */}
                  <td className="px-4 py-2 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => toggleBestSeller(item._id, item.bestseller)}
                      className={`p-2 text-xs text-white rounded-md ${
                        item.bestseller ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                      }`}
                      disabled={updating[item._id]}
                    >
                      {updating[item._id] ? "Updating..." : item.bestseller ? "Remove from Best Sellers" : "Mark as Best Seller"}
                    </button>
                    <button
                      onClick={() => removeProduct(item._id)}
                      className="p-2 text-xs text-white bg-red-500 rounded-md hover:bg-red-600"
                      disabled={updating[item._id]}
                    >
                      {updating[item._id] ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </td>



                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default List;
