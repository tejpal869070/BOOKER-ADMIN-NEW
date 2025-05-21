import React, { useEffect, useState } from "react";
import {
  completeMatch,
  deleteMatch,
  getAllBets,
  getAllMatch,
  makeMatchLive,
  updateMatchTime,
} from "../Controllers/Admin/AdminController";
import { toast, ToastContainer } from "react-toastify";
import { Loading4, Loading5 } from "./Loading1";
import { API } from "../Controllers/Api";
import { Link } from "react-router-dom";
import { ImBin } from "react-icons/im";
import Swal from "sweetalert2";
import MatchResultPopup from "./MactResultPopup";
import { FaEye } from "react-icons/fa";
import MatchDataPopup from "./MatchDataPopup";

export default function Matches() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [dropdownOptions, setDropDownOptions] = useState({});
  const [updatePopup, setUpdatePopup] = useState(false);
  const [matchTime, setMatchTime] = useState("");
  const [matchId, setMatchId] = useState("");

  const [isView, setView] = useState(false);
  const [viewData, setViewData] = useState({});

  // handle match live
  const changeMatchStatus = async (id, status, betting) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to make this change?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    });

    if (result.isConfirmed) {
      try {
        await makeMatchLive(id, status, betting);
        await Swal.fire("LIVE!", `Match status changed`, "success");
      } catch (error) {
        toast.error(error?.response?.data?.message || "Internal Server Error!");
      } finally {
        fetchData();
      }
    }
  };

  const handleRemoveMatch = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this match?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteMatch(id);
        Swal.fire("Deleted!", "The match has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error", `${error?.response?.data?.message}`, "failed");
      } finally {
        fetchData();
      }
    }
  };

  const completeMatchFunction = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to complete this match?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes !",
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        await completeMatch(id);
        Swal.fire("Success!", "The match has been completed.", "success");
      } catch (error) {
        Swal.fire("Error", `${error?.response?.data?.message}`, "failed");
      } finally {
        fetchData();
        setLoading(false);
      }
    }
  };

  // update match time
  const openUpdatePopup = (id) => {
    setUpdatePopup(true);
    setMatchId(id);
  };

  const updateMatchTimeFunction = async (e) => {
    e.preventDefault();

    const selectedTime = new Date(matchTime);
    const now = new Date();

    if (selectedTime < now) {
      Swal.fire(
        "Invalid Date",
        "The match time cannot be in the past.",
        "error"
      );
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to change Time?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes!",
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        await updateMatchTime(matchId, matchTime);
        Swal.fire("Success!", "The match time has been updated.", "success");
        setMatchId("");
        setMatchTime("");
        setUpdatePopup(false);
      } catch (error) {
        Swal.fire("Error", `${error?.response?.data?.message}`, "error");
      } finally {
        fetchData();
        setLoading(false);
      }
    }
  };

  const fetchData = async () => {
    try {
      const response = await getAllMatch();
      setData(response?.data.reverse());
      setLoading(false);
    } catch (error) {
      toast.error("Something Went Wrong !");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const FormatDate = ({ date }) => {
    // Function to format the date
    const formatDate = (dateStr) => {
      const dateObj = new Date(dateStr);
      return dateObj
        .toLocaleString("en-US", {
          month: "long",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
        .replace(",", "")
        .replace(":", ".");
    };

    return <p>{formatDate(date)}</p>;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center ">
        <Loading5 />
      </div>
    );
  }

  return (
    <div>
      <ToastContainer />
      <Link
        to={{ pathname: "/dashboard", search: "?admin=add-new-match" }}
        className="px-4 mt-6 inline-block py-2 rounded bg-green-700 font-semibold text-gray-200 mb-4"
      >
        Add New Match
      </Link>
      <div class="mt-2 max-w-9xl overflow-x-auto mt-4">
        <table class=" mx-auto table-auto ">
          <thead class="justify-between">
            <tr class="bg-gray-800">
              <th class="px-16 py-2">
                <span class="text-gray-100 font-semibold">S.No.</span>
              </th>
              <th class="px-16 py-2">
                <span class="text-gray-100 font-semibold">Name</span>
              </th>

              <th class="px-16 py-2">
                <span class="text-gray-100 font-semibold">Match Date</span>
              </th>
              <th class="px-16 py-2">
                <span class="text-gray-100 font-semibold">Status</span>
              </th>

              <th class="px-16 py-2">
                <span class="text-gray-100 font-semibold">Betting</span>
              </th>

              <th class="px-16 py-2">
                <span class="text-gray-100 font-semibold">Setting</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-gray-200">
            {data?.map((item, index) => (
              <tr class="bg-gray-400 border-b-2 border-gray-200 py-4 mb-4">
                <td class="px-16 py-4 flex gap-2 flex-row items-center">
                  <img
                    class="h-8 w-8 rounded-full object-cover "
                    src={`${API.url}/assets/${item.teams[0].image}`}
                    alt=""
                  />
                  <img
                    class="h-8 w-8 rounded-full object-cover "
                    src={`${API.url}/assets/${item.teams[1].image}`}
                    alt=""
                  />
                </td>
                <td className="text-left">
                  <p class="text-center ml-2 font-semibold">
                    {item.teams[0].team_name}
                  </p>
                  <p class="text-center ml-2 font-semibold">
                    {item.teams[1].team_name}
                  </p>
                </td>

                <td class="px-16 py-4">
                  <span>
                    <FormatDate date={item.match_time} />
                    {(item.status === "LIVE" || item.status === "UC") && (
                      <button
                        onClick={() => openUpdatePopup(item.id)}
                        className="right-0 px-2 py-1 bg-blue-500 rounded text-xs font-medium text-gray-100"
                      >
                        Change
                      </button>
                    )}
                  </span>
                </td>
                <td class="px-16 py-4">
                  <span
                    className={`${
                      item.status === "LIVE" &&
                      "bg-[#02a92f] text-sm font-medium text-gray-100 px-2"
                    }`}
                  >
                    {item.status === "UC"
                      ? "Upcoming"
                      : item.status === "LIVE"
                      ? "LIVE"
                      : item.status === "C"
                      ? "Completed"
                      : ""}
                  </span>
                </td>

                <td class="px-16 py-4 ">
                  {item.status === "UC" ? (
                    item.can_place_bet === "N" ? (
                      <button
                        onClick={() => changeMatchStatus(item.id, "UC", "Y")}
                        className="ml-2 px-2 py-1 bg-green-600 font-semibold text-gray-200 text-xs rounded"
                      >
                        Start Betting
                      </button>
                    ) : (
                      <button
                        onClick={() => changeMatchStatus(item.id, "UC", "N")}
                        className="ml-2 px-2 py-1 bg-red-600 font-semibold text-gray-200 text-xs rounded"
                      >
                        Stop Betting
                      </button>
                    )
                  ) : (
                    "Match Completed Or Live"
                  )}
                </td>

                <td class="px-16 py-4 flex justify-center items-center">
                  {/* <Link
                    to={{
                      pathname: "/dashboard",
                      search: `?admin=edit-match&match-id=${item.id}`,
                    }}
                    class="text-yellow-500 flex cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-green-700 mx-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                      <path
                        fill-rule="evenodd"
                        d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </Link> */}
                  <FaEye
                    onClick={() => {
                      setView(true);
                      setViewData(item);
                    }}
                    className="mr-2 cursor-pointer text-indigo-900"
                    size={18}
                  />
                  <ImBin
                    className="cursor-pointer text-red-700"
                    onClick={() => handleRemoveMatch(item.id)}
                  />
                  {item.status === "LIVE" ? (
                    <button
                      onClick={() => completeMatchFunction(item.id)}
                      className="ml-2 px-2 py-1 bg-red-600 font-semibold text-gray-200 text-xs rounded"
                    >
                      COMPLETE MATCH
                    </button>
                  ) : item.status === "UC" ? (
                    <button
                      onClick={() => changeMatchStatus(item.id, "LIVE", "N")}
                      className="ml-2 px-2 py-1 bg-green-600 font-semibold text-gray-200 text-xs rounded"
                    >
                      MAKE LIVE
                    </button>
                  ) : (
                    ""
                  )}

                  {item.status === "LIVE" && (
                    <button
                      onClick={() => {
                        setShowPopup(true);
                        setDropDownOptions(item);
                      }}
                      className="ml-2 px-2 py-1 bg-green-600 font-semibold text-gray-200 text-xs rounded"
                    >
                      UPLOAD RESULTS
                    </button>
                  )}
                  <Link
                    to={{
                      pathname: "/dashboard",
                      search: "?admin=match-bets-details",
                    }}
                    state={{ matchId: item.id }}
                    // onClick={() => betsShowFunction(item.id)}

                    className="ml-2 px-2 py-1 bg-green-600 font-semibold text-gray-200 text-xs rounded"
                  >
                    BETS
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <MatchResultPopup
          options={dropdownOptions}
          onClose={() => {
            setShowPopup(false);
            setDropDownOptions([]);
            fetchData();
          }}
        />
      )}

      {isView && (
        <MatchDataPopup
          matchData={viewData}
          onClose={() => {
            setView(false);
            setViewData({});
            fetchData();
          }}
        />
      )}

      {updatePopup && (
        <div className="fixed top-0 left-0 w-screen h-screen backdrop-blur-md bg-black/50 flex justify-center items-center">
          <form
            onSubmit={(e) => updateMatchTimeFunction(e)}
            className="p-4 rounded bg-white w-80 h-80 flex flex-col justify-center items-center"
          >
            <input
              type="datetime-local"
              value={matchTime}
              onChange={(e) => setMatchTime(e.target.value)}
              placeholder="Enter Match Time"
              min={new Date().toISOString().slice(0, 16)} // sets minimum date/time to current
              className="w-full px-4 py-2 border bg-indigo-100 border-gray-300 rounded-md focus:outline-none bg-gray-400 focus:ring-2 focus:ring-indigo-600"
              required
            />

            <div className="flex w-full justify-between">
              <button
                type="submit"
                className=" w-[48%] py-1 rounded mt-4 bg-indigo-500 font-semibold  text-gray-100"
              >
                UPDATE
              </button>
              <button
                onClick={() => setUpdatePopup(false)}
                className=" w-[48%] py-1 rounded mt-4 bg-red-500 font-semibold  text-gray-100"
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
