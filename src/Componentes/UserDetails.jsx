import React, { useEffect, useState } from "react";
import {
  addRefund,
  blockUser,
  getUserDetail,
} from "../Controllers/Admin/AdminController";
import { toast, ToastContainer } from "react-toastify";
import { Loading4 } from "./Loading1";
import Swal from "sweetalert2";
import RefundModal from "./RefundModal";

export default function UserDetails() {
  const [user_id, setUserId] = useState("");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [selected, setSelected] = useState(1);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleRefund = (user_id) => {
    setShowRefundModal(true);
  };

  const handleRefundApi = async (data) => {
    try {
      await addRefund(data);
      toast.success("Success");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      fetchUser(user_id);
    }
  };

  const updateUserStatus = async (type) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to ${
        type === "block" ? "block" : "unblock"
      } this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
    });

    if (result.isConfirmed) {
      try {
        setUpdating(true); // Optionally show a loading spinner
        await blockUser(user?.email, type);
        toast.success("User status changed!");
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      } finally {
        setUpdating(false);
        fetchUser(user_id);
      }
    }
  };

  const fetchUser = async (id) => {
    try {
      const response = await getUserDetail(id);
      console.log(response.data);
      setUser(response.data);
    } catch (error) {
      toast.error("Something went wrong!");
      setUser({});
    } finally {
      setLoading(false);
    }
  };

  // Extract user_id from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("user_id");
    if (id) {
      setUserId(id);
    }
  }, []);

  // Fetch user data when userId is set
  useEffect(() => {
    if (user_id) {
      fetchUser(user_id);
    }
  }, [user_id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center ">
        <Loading4 />
      </div>
    );
  }

  return (
    <div className="lg:p-6 max-w-7xl mx-auto">
      <ToastContainer />
      {/* User Info Card */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8 border">
        <h2 className="text-xl font-semibold mb-4">User Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-sm">
          <div>
            <strong>User ID:</strong> {user?.user_id}
          </div>
          <div>
            <strong>Name:</strong> {user?.user_name}
          </div>
          <div>
            <strong>Email:</strong> {user?.email}
          </div>
          <div>
            <strong>Mobile:</strong> {user?.mobile}
          </div>
          <div>
            <strong>Main Wallet:</strong> $ {user?.main_wallet}
          </div>
          <div>
            <strong>Game Wallet:</strong> $ {user?.game_wallet}
          </div>
          <div>
            <strong>Total Deposits:</strong> {user?.total_deposits}
          </div>
          <div>
            <strong>Total Withdrawals:</strong> {user?.total_withdrawals}
          </div>
          <div>
            <strong>Total Deposits Amount:</strong> ${" "}
            {user?.total_deposit_amount}
          </div>
          <div>
            <strong>Total Withdrawals Amount:</strong> ${" "}
            {user?.total_withdrawal_amount}
          </div>
        </div>
        {user.is_active === "Y" ? (
          <button
            onClick={() => updateUserStatus("N")}
            disabled={updating}
            className="w-40 py-1 text-gray-100 font-semibold mt-4 text-center bg-red-500 rounded"
          >
            {updating ? "Updating" : " Block User"}
          </button>
        ) : (
          <button
            onClick={() => updateUserStatus("Y")}
            disabled={updating}
            className="w-40 py-1 text-gray-100 font-semibold mt-4 text-center bg-green-500 rounded"
          >
            {updating ? "Updating" : " Activate User"}
          </button>
        )}
        <button
          onClick={() => handleRefund(user?.user_id)}
          className="w-40 ml-4 py-1 text-gray-100 font-semibold mt-4 text-center bg-indigo-500 rounded"
        >
          Add Refund
        </button>
      </div>

      {/* Statement Table */}
      <div className="overflow-x-auto">
        <div className="mb-4 flex items-center gap-6">
          <select
            value={selected}
            onChange={(e) => setSelected(Number(e.target.value))}
            className="cursor-pointer px-4 py-2 rounded text-md font-semibold bg-white border border-gray-300"
          >
            <option value={1}>Account Statements</option>
            <option value={2}>Game Statements</option>
          </select>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-80 block p-2   border border-gray-200 rounded-md"
          />{" "}
        </div>

        {selected === 1 ? (
          <table className="min-w-full border bg-white shadow-sm rounded-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Transaction ID</th>
                <th className="px-4 py-2 border">Type</th>
                <th className="px-4 py-2 border">Amount</th>
                <th className="px-4 py-2 border">Updated Balance</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Description</th>
              </tr>
            </thead>
            <tbody>
              {user?.statements
                ?.filter((item) => {
                  const query = searchQuery.toLowerCase();
                  return (
                    item.transection_id.toLowerCase().includes(query) ||
                    item.amount.toString().toLowerCase().includes(query) ||
                    item.type.toLowerCase().includes(query) ||
                    item.updated_balance.toLowerCase().includes(query) ||
                    item.date.toLowerCase().includes(query) ||
                    item.description.toLowerCase().includes(query)
                  );
                })
                ?.map((txn) => (
                  <tr
                    key={txn.id}
                    className="text-center text-sm hover:bg-gray-50"
                  >
                    <td className="px-4 py-2 border">{txn.id}</td>
                    <td className="px-4 py-2 border">{txn.transection_id}</td>
                    <td
                      className={`px-4 py-2 border ${
                        txn.type === "Deposit"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {txn.type}
                    </td>
                    <td className="px-4 py-2 border">₹{txn.amount}</td>
                    <td className="px-4 py-2 border">₹{txn.updated_balance}</td>
                    <td className="px-4 py-2 border">
                      {new Date(txn.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 border">{txn.description}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <table className="min-w-full border bg-white shadow rounded-md text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Transaction ID</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Amount</th>
                <th className="px-4 py-2 border">Updated Balance</th>
                <th className="px-4 py-2 border">Game</th>
                <th className="px-4 py-2 border">Description</th>
              </tr>
            </thead>
            <tbody>
              {user?.gameStatements
                ?.filter((item) => {
                  const query = searchQuery.toLowerCase();
                  return (
                    item.transection_id.toLowerCase().includes(query) ||
                    item.amount.toString().toLowerCase().includes(query) || 
                    item.updated_balance.toLowerCase().includes(query) ||
                    item.date.toLowerCase().includes(query) ||
                    item.description.toLowerCase().includes(query) || 
                    item.game_name.toLowerCase().includes(query)
                  );
                })
                ?.map((txn) => (
                  <tr key={txn.id} className="text-center hover:bg-gray-50">
                    <td className="px-4 py-2 border">{txn.id}</td>
                    <td className="px-4 py-2 border">{txn.transection_id}</td>
                    <td className="px-4 py-2 border">
                      {new Date(txn.date).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 border">₹{txn.amount}</td>
                    <td className="px-4 py-2 border">₹{txn.updated_balance}</td>
                    <td className="px-4 py-2 border">{txn.game_name}</td>
                    <td className="px-4 py-2 border">
                      {txn.description.replace(/"/g, "")}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
      {showRefundModal && (
        <RefundModal
          user_id={user_id}
          onClose={() => setShowRefundModal(false)}
          onRefund={handleRefundApi}
        />
      )}
    </div>
  );
}
