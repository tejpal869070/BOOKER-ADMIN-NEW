import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  approveWithdrawalRequest,
  getAllWithdrawalRequests,
  inprocessWithdrawalRequest,
  rejectWithdrawalRequest,
} from "../Controllers/Admin/AdminController";
import Swal from "sweetalert2";

export default function Withdrawals() {
  const [data, setData] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [viewData, setViewData] = useState({});
  const [isProcessing, setProcessing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  //   inprocess
  const inProcessFuntion = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Make this withdrawal request Inprocess ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    });

    if (!result.isConfirmed) return;

    setProcessing(true);

    try {
      await inprocessWithdrawalRequest(id);
      await Swal.fire(
        "Approved!",
        "The withdrawal request now is in process.",
        "success"
      );
    } catch (error) {
      console.error(error);
      await Swal.fire(
        "Error!",
        "There was a problem approving the request.",
        "error"
      );
    } finally {
      setProcessing(false);
      fetchData();
    }
  };

  //   reject
  const rejectRequest = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure to reject this request",
      icon: "warning",
      input: "text",
      inputLabel: "Reason for rejection",
      inputPlaceholder: "Enter your reason here...",
      inputValidator: (value) => {
        if (!value) {
          return "You must provide a reason!";
        }
      },
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    });

    if (!result.isConfirmed) return;

    const reason = result.value;

    try {
      await rejectWithdrawalRequest(id, reason);
      await Swal.fire("Approved!", "The withdrawal Rejected", "success");
      fetchData();
    } catch (error) {
      await Swal.fire(
        "Error!",
        "There was a problem approving the request.",
        "error"
      );
    }
  };

  //   approve
  const approveFunction = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Approve This withdrawal request ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    });

    if (!result.isConfirmed) return;
    try {
      await approveWithdrawalRequest(id);
      await Swal.fire(
        "Approved!",
        "The withdrawal request now is in process.",
        "success"
      );
      fetchData();
    } catch (error) {
      await Swal.fire(
        "Error!",
        "There was a problem approving the request.",
        "error"
      );
    }
  };

  const fetchData = async () => {
    try {
      const response = await getAllWithdrawalRequests();
      setData(response.reverse());
    } catch (error) {
      setData([]);
      window.alert("Data Not Found");
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);

    fetchData();

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="relative max-w-7xl m-auto">
      <ToastContainer />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="w-full p-2 mb-4 border border-gray-200 rounded-md"
        />{" "}
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 deposit-table">
          <thead className="text-xs text-gray-200 uppercase bg-indigo-700  ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Transection Id
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data
                .filter((item) => {
                  const query = searchQuery.toLowerCase();
                  return (
                    item.transection_id.toLowerCase().includes(query) ||
                    item.amount.toString().toLowerCase().includes(query) ||
                    item.email.toLowerCase().includes(query) ||
                    item.status.toLowerCase().includes(query) ||
                    item.created_at.toLowerCase().includes(query)
                  );
                })
                .map((item, index) => (
                  <tr
                    key={index}
                    className="odd:bg-gray-400 odd:dark:bg-gray-900 even:bg-gray-500 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200 text-xs text-gray-900 font-semibold"
                  >
                    <th
                      scope="row"
                      className="px-6 py-1 text-xs font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.transection_id}
                    </th>
                    <td className="px-6 py-1 ">$ {item.amount}</td>
                    <td className="px-6 py-1 text-xs">{item.email}</td>
                    <td className="px-6 py-1 text-xs">
                      {item.status === "P"
                        ? "Pending"
                        : item.status === "I"
                        ? "Inprocess"
                        : item.status === "R"
                        ? "Rejected"
                        : item.status === "C"
                        ? "Cancelled"
                        : item.status === "S"
                        ? "SUCCESS"
                        : "ERROR"}
                    </td>
                    <td className="px-6 py-1 text-xs">
                      {item.created_at.split("T")[0]}{" "}
                      {item.created_at.split("T")[1].split(".")[0]}
                    </td>
                    <td className="px-6 py-1 text-xs">
                      <button
                        onClick={() => {
                          setOpen(true);
                          setViewData(item);
                          console.log(item);
                        }}
                        className="bg-yellow-300 text-gray-900"
                      >
                        View
                      </button>

                      {item.status === "P" ? (
                        <button
                          onClick={() => inProcessFuntion(item.id)}
                          disabled={item.status === "C" || item.status === "R"}
                          className="bg-indigo-500 text-gray-200"
                        >
                          {isProcessing ? "Processing" : "Inprocess"}
                        </button>
                      ) : item.status === "C" ? (
                        <button className="bg-red-400 text-gray-900">
                          Cancelled
                        </button>
                      ) : item.status === "R" ? (
                        <button className="bg-red-400 text-gray-900">
                          Rejected
                        </button>
                      ) : item.status === "I" ? (
                        <button
                          onClick={() => approveFunction(item.id)}
                          className="bg-green-400"
                        >
                          Approve
                        </button>
                      ) : (
                        ""
                      )}

                      {(item.status === "P" || item.status === "I") && (
                        <button
                          disabled={item.status === "C" || item.status === "R"}
                          className="bg-gray-800 text-gray-200"
                          onClick={() => rejectRequest(item.id)}
                        >
                          Reject
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6">
            {/* Close button */}
            <button
              onClick={() => {
                setOpen(false);
                setViewData({});
              }}
              className="absolute bg-white p-2 rounded-full top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              &times;
            </button>

            {/* Table */}
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                    Field
                  </th>
                  <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200">
                  <td className="px-4 py-2 text-gray-600">ID</td>
                  <td className="px-4 py-2 text-gray-800">{viewData.id}</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="px-4 py-2 text-gray-600">Email</td>
                  <td className="px-4 py-2 text-gray-800">{viewData?.email}</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="px-4 py-2 text-gray-600">
                    Withdrawal Address
                  </td>
                  <td className="px-4 py-2 text-gray-800">
                    {viewData.withdrawal_address}
                  </td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="px-4 py-2 text-gray-600">Amount</td>
                  <td className="px-4 py-2 text-gray-800">{viewData.amount}</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="px-4 py-2 text-gray-600">Transaction Hash</td>
                  <td className="px-4 py-2 text-gray-800">
                    {viewData.transection_hash}
                  </td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="px-4 py-2 text-gray-600">Created At</td>
                  <td className="px-4 py-2 text-gray-800">
                    {viewData.created_at}
                  </td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="px-4 py-2 text-gray-600">Reason</td>
                  <td className="px-4 py-2 text-gray-800">{viewData.reason}</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="px-4 py-2 text-gray-600">Status</td>
                  <td className="px-4 py-2 text-gray-800">{viewData.status}</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="px-4 py-2 text-gray-600">Transaction ID</td>
                  <td className="px-4 py-2 text-gray-800">
                    {viewData.transection_id}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
