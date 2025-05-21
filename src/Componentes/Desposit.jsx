import React, { useEffect, useState } from "react";
import {
  approveDepositRequest,
  getAllDepositRequest,
  rejectDepostRequest,
} from "../Controllers/Admin/AdminController";
import { toast, ToastContainer } from "react-toastify";
import { MdCancel } from "react-icons/md";
import { API } from "../Controllers/Api";
import Swal from "sweetalert2";

export default function Desposit() {
  const [data, setData] = useState([]);
  const [approving, setApproving] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [isCancelOpen, setCancelOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [id, setId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [viewOpen, setViewOpen] = useState(false);
  const [viewData, setViewData] = useState({});

  const [paymentImage, setPaymentImage] = useState(false);

  const approveRequest = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to approve this deposit request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    });

    if (!result.isConfirmed) return;

    setApproving(true);
    try {
      await approveDepositRequest(id);
      await Swal.fire(
        "Approved!",
        "The deposit request has been approved.",
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
      setApproving(false);
      fetchData();
    }
  };

  // reject

  const openCancelPopup = (id) => {
    setCancelOpen(true);
    setId(id);
  };

  const rejectDepost = async () => {
    setCancelling(true);
    try {
      await rejectDepostRequest(id, cancelReason);
      toast.success("Deposit Rejected !");
      setCancelOpen(false);
      setId("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Internal Server Error !");
    } finally {
      setCancelling(false);
      fetchData();
    }
  };

  const viewPopup = (item) => {
    console.log(item);
    setViewData(item);
    setViewOpen(true);
  };

  const fetchData = async () => {
    try {
      const response = await getAllDepositRequest();
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
          <thead className="text-xs text-gray-200 uppercase bg-gray-900  ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Transection Id
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                UID
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
                    item.user_id.toLowerCase().includes(query) ||
                    item.status.toLowerCase().includes(query) ||
                    item.created_at.toLowerCase().includes(query)
                  );
                })
                .map((item, index) => (
                  <tr
                    key={index}
                    className=" bg-gray-300 border-b dark:border-gray-700 border-gray-200 text-sm text-gray-900 font-semibold"
                  >
                    <th
                      scope="row"
                      className="px-6 py-1 text-xs font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.transection_id}
                    </th>
                    <td className="px-6 py-1 ">$ {item.amount}</td>
                    <td className="px-6 py-1  ">{item.user_id}</td>
                    <td className="px-6 py-1  ">
                      {item.status === "P"
                        ? "Pending"
                        : item.status === "C"
                        ? "Cancelled"
                        : item.status === "S"
                        ? "Success"
                        : "Failed"}
                    </td>
                    <td className="px-6 py-1  ">
                      {item.created_at.split("T")[0]}{" "}
                      {item.created_at.split("T")[1].split(".")[0]}
                    </td>
                    <td className="px-6 py-1  ">
                      <button
                        onClick={() => viewPopup(item)}
                        className="bg-yellow-300 text-gray-900"
                      >
                        View
                      </button>
                      {item.status === "P" ? (
                        <button
                          disabled={approving}
                          onClick={() => approveRequest(item.id)}
                          className="bg-indigo-500 text-gray-200"
                        >
                          {approving ? "Loading..." : "Approve"}
                        </button>
                      ) : item.status === "R" ? (
                        <button className="bg-red-500 text-gray-200">
                          Rejected
                        </button>
                      ) : item.status === "S" ? (
                        <button className="text-gray-100 bg-green-500">
                          Success
                        </button>
                      ) : (
                        <button>Failed</button>
                      )}
                      {item.status === "P" && (
                        <button
                          className="bg-gray-800 text-gray-200"
                          onClick={() => {
                            openCancelPopup(item.id);
                            setCancelReason("");
                          }}
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {isCancelOpen && (
        <div className="fixed z-[999] top-0 left-0 w-screen h-screen flex justify-center pt-20 backdrop-blur-md bg-black/30">
          <MdCancel
            onClick={() => {
              setCancelOpen(false);
              setId("");
            }}
            className="cursor-pointer absolute top-4 right-4"
            size={20}
          />

          <div className="  border-2 border-gray-200 rounded-md h-auto p-6 max-h-[40vh]">
            <p className="text-gray-100">Reason</p>
            <textarea
              className="h-24 w-80 rounded"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              minLength={4}
            />
            <div className="flex justify-around mt-6">
              <button
                onClick={rejectDepost}
                className="bg-green-500 rounded py-2 w-[45%] font-semibold text-gray-100"
              >
                {cancelling ? "Processing..." : "SUBMIT"}
              </button>
              <button
                onClick={() => {
                  setCancelOpen(false);
                  setId("");
                }}
                disabled={cancelling}
                className="bg-red-500 rounded py-2 w-[45%] font-semibold text-gray-100"
              >
                CENCEL
              </button>
            </div>
          </div>
        </div>
      )}

      {viewOpen && (
        <div className="fixed z-[999] top-0 left-0 w-screen h-screen flex justify-center pt-20 backdrop-blur-md bg-black/30">
          <MdCancel
            onClick={() => {
              setViewOpen(false);
              setViewData({});
              setPaymentImage(false);
            }}
            className="cursor-pointer absolute top-4 right-4"
            size={20}
          />

          <div className="    border-2 border-gray-200 rounded-md h-auto p-6 max-h-[40vh] overflow-scroll no-scrollbar bg-gradient-to-l from-gray-600 to-gray-700">
            <div className="flex justify-between text-gray-200 w-full text-sm font-semibold border-b-[1px] border-gray-600 ">
              <p>Transection Id :- </p>
              <p>{viewData.transection_id}</p>
            </div>
            <div className="flex justify-between text-gray-200 w-full text-sm font-semibold border-b-[1px] border-gray-600 mt-2">
              <p>User Id :- </p>
              <p>{viewData.user_id}</p>
            </div>
            <div className="flex justify-between text-gray-200 w-full text-sm font-semibold border-b-[1px] border-gray-600 mt-2">
              <p>Amount :- </p>
              <p>{viewData.amount}</p>
            </div>
            <div className="flex justify-between text-gray-200 w-full text-sm font-semibold border-b-[1px] border-gray-600 mt-2">
              <p>Transection Hash :- </p>
              <p>{viewData.transection_hash}</p>
            </div>
            <div className="flex justify-between text-gray-200 w-full text-sm font-semibold border-b-[1px] border-gray-600 mt-2">
              <p>Status :- </p>
              <p>
                {viewData.status === "P"
                  ? "Pending"
                  : viewData.status === "R"
                  ? "Rejected"
                  : viewData.status === "S"
                  ? "Success"
                  : "Failed"}
              </p>
            </div>
            <div className="flex justify-between text-gray-200 w-full text-xs font-semibold border-b-[1px] border-gray-600 mt-2">
              <p>Reason :- </p>
              <p>{JSON.parse(viewData.reason)}</p>
            </div>
            <div className="flex justify-between text-gray-200 w-full text-xs font-semibold border-b-[1px] border-gray-600 mt-2">
              <p>Image :- </p>
              <p
                className={
                  paymentImage &&
                  "absolute top-0 w-screen h-screen overflow-scroll  no-scrollbar bg-black/30 backdrop-blur-md left-0 flex justify-center items-center"
                }
              >
                <img
                  alt="paytn"
                  onClick={() => setPaymentImage((pre) => !pre)}
                  className={`w-32 cursor-pointer ${
                    paymentImage && "w-[600px]"
                  }  `}
                  src={`${API.url}${viewData.image_url}`}
                />{" "}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
