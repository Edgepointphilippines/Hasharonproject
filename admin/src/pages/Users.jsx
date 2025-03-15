import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../App"; // Update this based on your setup
import { toast } from "react-toastify";

const UserManagement = () => {
  const [users, setUsers] = useState([]); // Stores all users
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch users from backend API
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No token found, please login again.");
        return;
      }

      const response = await axios.get(`${backendUrl}/api/user/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setUsers(response.data.users);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      setError("Failed to fetch users. Please try again later.");
      toast.error("Failed to fetch users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch the current user's details
  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get(`${backendUrl}/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setCurrentUser(response.data.user);
      }
    } catch (error) {
      console.log("Failed to fetch current user:", error);
    }
  };

  // Handle Role Update
  const updateRole = async (id, newRole) => {
    try {
      if (!window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
        return;
      }

      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${backendUrl}/api/user/update-role/${id}`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        toast.success(`Role updated to ${newRole}`);
        setUsers(users.map(user => (user._id === id ? { ...user, role: newRole } : user)));
      } else {
        toast.error(response.data.message || "Failed to update role.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error updating role.");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchCurrentUser();
  }, []);

  if (loading) return <div className="text-xl font-bold text-blue-500 text-center mt-6">Loading users...</div>;
  if (error) return <div className="text-red-500 text-lg text-center">{error}</div>;

  const admins = users.filter(user => user.role === "admin");
  const regularUsers = users.filter(user => user.role !== "admin");

  return (
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-center">User Management</h1>

      {/* Admin List */}
      <h2 className="text-lg md:text-2xl font-bold mt-4 mb-3 text-green-700">Admins</h2>
      {admins.length === 0 ? (
        <p className="text-gray-500">No admins found.</p>
      ) : (
        <ul>
          {admins.map((user) => (
            <li
              key={user._id}
              className="bg-white p-4 rounded-lg shadow-md mb-4 flex flex-col md:flex-row justify-between items-center"
            >
              <div className="text-center md:text-left">
                <p className="text-gray-700 font-bold">{user.firstName} {user.lastName}</p>
                <p className="text-gray-500 text-sm">{user.email}</p>
                <p className="text-gray-500 text-sm">Phone: {user.phone}</p>
              </div>
              {currentUser?._id !== user._id && (
                <button
                  onClick={() => updateRole(user._id, "user")}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 mt-3 md:mt-0 md:ml-4 w-full md:w-auto"
                >
                  Change to User
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* User List */}
      <h2 className="text-lg md:text-2xl font-bold mt-8 mb-3 text-blue-700">Users</h2>
      {regularUsers.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <ul>
          {regularUsers.map((user) => (
            <li
              key={user._id}
              className="bg-white p-4 rounded-lg shadow-md mb-4 flex flex-col md:flex-row justify-between items-center"
            >
              <div className="text-center md:text-left">
                <p className="text-gray-700 font-bold">{user.firstName} {user.lastName}</p>
                <p className="text-gray-500 text-sm">{user.email}</p>
                <p className="text-gray-500 text-sm">Phone: {user.phone}</p>
              </div>
              <button
                onClick={() => updateRole(user._id, "admin")}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 mt-3 md:mt-0 md:ml-4 w-full md:w-auto"
              >
                Promote to Admin
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserManagement;
