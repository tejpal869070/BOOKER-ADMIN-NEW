import React, { useEffect, useState } from "react";
import { getAllUsers } from "../Controllers/Admin/AdminController";
import { toast, ToastContainer } from "react-toastify";
import { Loading4 } from "./Loading1";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
      setUsers([]);
      toast.error("Error in getting users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center ">
        <Loading4 />
      </div>
    );
  }

  return (
    <div>
      <ToastContainer />
      <div className="overflow-x-auto p-4">
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="w-full p-2 mb-4 border border-gray-200 rounded-md"
        />{" "}
        <table className="min-w-full border border-gray-300 shadow-md rounded-lg bg-white">
          <thead className="bg-gray-100 text-gray-300 bg-gray-900">
            <tr>
              <th className="px-4 py-2 border">User ID</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Mobile</th>
              <th className="px-4 py-2 border">Main Wallet</th>
              <th className="px-4 py-2 border">Game Wallet</th>
              <th className="px-4 py-2 border">View</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users
                .filter((item) => {
                  const query = searchQuery.toLowerCase();
                  return (
                    item.user_name.toLowerCase().includes(query) ||
                    item.email.toString().toLowerCase().includes(query) ||
                    item.user_id.toLowerCase().includes(query) ||
                    item.mobile.toLowerCase().includes(query) ||
                    item.main_wallet.toLowerCase().includes(query) || 
                    item.game_wallet.toLowerCase().includes(query)
                  );
                })
                .map((user) => (
                  <tr
                    key={user.user_id}
                    className="text-center text-sm hover:bg-gray-50"
                  >
                    <td className="px-4 py-2 border">{user.user_id}</td>
                    <td className="px-4 py-2 border">{user.user_name}</td>
                    <td className="px-4 py-2 border">{user.email}</td>
                    <td className="px-4 py-2 border">{user.mobile}</td>
                    <td className="px-4 py-2 border">{user.main_wallet}</td>
                    <td className="px-4 py-2 border">{user.game_wallet}</td>
                    <Link
                      to={{
                        pathname: "/dashboard",
                        search: `?admin=userdetails&user_id=${user.user_id}`,
                      }}
                      className="table-cell px-4 py-2 border cursor-pointer"
                    >
                      <FaEye />
                    </Link>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
