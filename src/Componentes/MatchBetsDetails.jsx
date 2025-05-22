import React, { useEffect, useState } from "react";
import AllBets from "./MatchComponents/AllBets";
import { useLocation } from "react-router-dom";
import {
  completeMatch,
  getAllBets,
  getSingleMatchDetail,
  makeMatchLive,
  updateMatchTime,
} from "../Controllers/Admin/AdminController";
import { toast } from "react-toastify";
import { Loading5 } from "./Loading1";
import SectionList from "./MatchComponents/SectionList";
import Swal from "sweetalert2";
import MatchDataPopup from "./MatchDataPopup";
import MatchResultPopup from "./MactResultPopup";

export default function MatchBetsDetails() {
  const [matchDetails, setMatchDetails] = React.useState([]);
  const [bets, setBets] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const [isView, setView] = useState(false);
  const [viewData, setViewData] = useState({});

  const [showPopup, setShowPopup] = useState(false);
  const [dropdownOptions, setDropDownOptions] = useState({});

  const [updatePopup, setUpdatePopup] = useState(false);
  const [match_id, setMatchId] = useState("");
  const [matchTime, setMatchTime] = useState("");

  const location = useLocation();
  const matchId = location.state.matchId;

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
        await updateMatchTime(match_id, matchTime);
        Swal.fire("Success!", "The match time has been updated.", "success");
        setMatchId("");
        setMatchTime("");
        setUpdatePopup(false);
      } catch (error) {
        Swal.fire("Error", `${error?.response?.data?.message}`, "error");
      } finally {
        betsShowFunction(matchId);
        setLoading(false);
      }
    }
  };

  const betsShowFunction = async (id) => {
    try {
      const response = await getAllBets(id);
      setBets(response.data);
      const matchResponse = await getSingleMatchDetail(id);
      setMatchDetails(matchResponse.data);
    } catch (error) {
      setBets([]);
      toast.error(error?.response?.data?.message || "Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

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
        betsShowFunction(matchId);
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
        betsShowFunction(id);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    betsShowFunction(matchId);
    const intervalId = setInterval(() => {
      betsShowFunction(matchId);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [matchId]);

  if (loading) {
    return <Loading5 />;
  }

  return (
    <div>
      <nav className="w-full rounded border-2 p-6 border-gray-900 mb-6 flex bg-black justify-between">
        <p className="  text-lg font-semibold text-gray-200">
          {matchDetails?.teams[0]?.team_name} vs{" "}
          {matchDetails?.teams[1]?.team_name}{" "}
          <span className="text-xs font-medium ml-4 rounded-full px-4 py-0.5 bg-red-500 uppercase">
            {matchDetails.status === "UC"
              ? "Upcoming"
              : matchDetails.status === "LIVE"
              ? "LIVE"
              : matchDetails.status === "C"
              ? "Completed"
              : ""}
          </span>
          <br />{" "}
          <p className="text-sm">
            Time :-{" "}
            {new Date(matchDetails?.match_time).toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
            })}{" "}
            {(matchDetails.status === "LIVE" ||
              matchDetails.status === "UC") && (
              <span className="text-xs font-medium ml-4 rounded-full px-4 py-0.5 bg-yellow-500 uppercase">
                <button onClick={() => openUpdatePopup(matchDetails.id)}>
                  Change Date
                </button>
              </span>
            )}
          </p>
        </p>
        {matchDetails.status === "C" && (
          <div className="p-2 items-center justify-center px-4 rounded border shadow text-gray-200 flex gap-6 bg-gradient-to-r from-violet-600 to-indigo-600">
            <p>
              Stake: ₹
              {bets
                .reduce((sum, item) => sum + Number(item.amount || 0), 0)
                .toLocaleString()}
            </p>

            <p
              className={
                bets.reduce(
                  (sum, item) => sum + Number(item.win_amount || 0),
                  0
                ) > 0
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              P/L: ₹
              {bets
                .reduce((sum, item) => sum + Number(item.win_amount || 0), 0)
                .toLocaleString()}
            </p>
          </div>
        )}
        <div className="flex gap-4">
          <button>
            {matchDetails.status === "UC" ? (
              matchDetails.can_place_bet === "N" ? (
                <button
                  onClick={() => changeMatchStatus(matchDetails.id, "UC", "Y")}
                  className="btn"
                >
                  Start Betting
                </button>
              ) : (
                <button
                  onClick={() => changeMatchStatus(matchDetails.id, "UC", "N")}
                  className="btn"
                >
                  Stop Betting
                </button>
              )
            ) : (
              "Match Completed Or Live"
            )}
          </button>
          <button
            className="btn"
            onClick={() => {
              setView(true);
              setViewData(matchDetails);
            }}
            size={18}
          >
            DETAILS
          </button>

          {matchDetails.status === "UC" && (
            <button
              className="btn"
              onClick={() => changeMatchStatus(matchDetails.id, "LIVE", "N")}
            >
              MAKE LIVE
            </button>
          )}

          {matchDetails.status === "LIVE" && (
            <button
              className="btn"
              onClick={() => completeMatchFunction(matchDetails.id)}
            >
              COMPLETE MATCH
            </button>
          )}
          {matchDetails.status === "LIVE" && (
            <button
              className="btn"
              onClick={() => {
                setShowPopup(true);
                setDropDownOptions(matchDetails);
              }}
            >
              UPLOAD RESULT
            </button>
          )}
        </div>
      </nav>
      <div className="grid grid-cols-2 grid-rows-2 gap-4">
        <section className="p-6 shadow rounded border-2 bg-gray-900 shadow border-black min-h-[40vh] max-h-[40vh] overflow-auto ">
          <SectionList
            betsDetails={bets}
            team_name={matchDetails?.teams[0]?.team_name}
          />
        </section>
        <section className="p-6 shadow rounded border-2 bg-gray-900 shadow border-black min-h-[40vh] max-h-[40vh] overflow-auto ">
          <SectionList
            betsDetails={bets}
            team_name={matchDetails?.teams[1]?.team_name}
          />
        </section>
        <section className="px-6 py-2 shadow rounded border-2 bg-gray-900 shadow border-black min-h-[40vh] max-h-[40vh] overflow-auto no-scrollbar ">
          <AllBets bets={bets} team_name={matchDetails?.teams[0]?.team_name} />
        </section>
        <section className="px-6 py-2 shadow rounded border-2 bg-gray-900 shadow  border-black min-h-[40vh] max-h-[40vh] overflow-auto no-scrollbar ">
          <AllBets bets={bets} team_name={matchDetails?.teams[1]?.team_name} />
        </section>
      </div>

      {isView && (
        <MatchDataPopup
          matchData={viewData}
          onClose={() => {
            setView(false);
            setViewData({});
            betsShowFunction(matchId);
          }}
        />
      )}

      {showPopup && (
        <MatchResultPopup
          options={dropdownOptions}
          onClose={() => {
            setShowPopup(false);
            setDropDownOptions([]);
            betsShowFunction(matchId);
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
