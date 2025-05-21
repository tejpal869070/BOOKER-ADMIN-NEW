import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Loading4 } from "./Loading1";
import {
  getAllBets,
  getSingleMatchDetail,
} from "../Controllers/Admin/AdminController";
import { toast, ToastContainer } from "react-toastify";
import { FaFilter } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

export default function MatchBetsDetails() {
  const [loading, setLoading] = React.useState(true);
  const [bets, setBets] = React.useState([]);
  const [matchDetails, setMatchDetails] = React.useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [showTable, setShowTable] = useState(false);
  const [popupData, setPopupData] = useState([]);
  const [viewTeam, setViewTeam] = useState(false);

  const location = useLocation();
  const matchId = location.state.matchId;

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

  // Sort function to sort the data based on a column
  const sortData = (data) => {
    const { key, direction } = sortConfig;
    return [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  // Handle column header click for sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const filteredBets = bets.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.user_id.toLowerCase().includes(query) ||
      item.mobile.toString().toLowerCase().includes(query)
    );
  });

  const sortedBets = sortData(filteredBets);

  //   ---------
  const handleShowData = (team_name) => {
    setViewTeam(team_name);
    const filteredBets = bets.filter((item) => item.team_name === team_name);
    setPopupData(filteredBets);
    setShowTable(true);
  };

  const filteredLTypeBets = popupData;

  // Group L-type bets by section
  const groupedBySection = {};
  filteredLTypeBets.forEach((item) => {
    const section = item.section;
    if (!groupedBySection[section]) {
      groupedBySection[section] = [];
    }
    groupedBySection[section].push(item);
  });

  // For each section, compute betStats (0 to 9 values)
  const sectionStats = Object.entries(groupedBySection).map(
    ([section, bets]) => {
      // 1. Aggregate total amount per digit (last digit only)
      const totalBetsPerDigit = Array.from({ length: 10 }, (_, i) => {
        return bets
          .filter((item) => Number(item.bet_value) % 10 === i)
          .reduce((sum, item) => sum + Number(item.amount), 0);
      });

      // 2. For each result 0–9, calculate loss/profit
      const betStats = totalBetsPerDigit.map((amountOnDigit, i) => {
        const lossIfWins = amountOnDigit * 9;
        const profitIfNotWin = totalBetsPerDigit.reduce((sum, amt, idx) => {
          return idx !== i ? sum + amt : sum;
        }, 0);
        const netOutcome = profitIfNotWin - lossIfWins;

        return {
          value: i,
          totalAmount: amountOnDigit,
          lossIfWins,
          profitIfNotWin,
          netOutcome,
        };
      });

      const maxAmount = Math.max(...betStats.map((stat) => stat.totalAmount));
      const totalBets = bets.length;

      const exectRunBets = bets.filter((i) => i.bet_type === "E");

      const groupedBets = exectRunBets.reduce((acc, curr) => {
        if (acc[curr.bet_value]) {
          acc[curr.bet_value].amount += parseFloat(curr.amount);
        } else {
          acc[curr.bet_value] = {
            ...curr,
            amount: parseFloat(curr.amount),
          };
        }
        return acc;
      }, {});

      const finalExectBets = Object.values(groupedBets).sort(
        (a, b) => b.amount - a.amount
      );

      const totalAmountLastDigit = bets
        .filter((i) => i.bet_type === "L")
        .reduce((sum, item) => sum + Number(item.amount), 0);

      const totalAmountExactRun = bets
        .filter((i) => i.bet_type === "E")
        .reduce((sum, item) => sum + Number(item.amount), 0);

      return {
        section,
        betStats,
        maxAmount,
        totalBets,
        totalAmountLastDigit,
        totalAmountExactRun,
        finalExectBets,
      };
    }
  );

  useEffect(() => {
    betsShowFunction(matchId);
  }, [matchId]);

  if (!matchId) {
    return (
      <div>
        <p>No Data Found</p>
      </div>
    );
  }

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
      <p className="text-center text-lg font-semibold text-gray-200">
        {matchDetails?.teams[0]?.team_name} vs{" "}
        {matchDetails?.teams[1]?.team_name}
      </p>
      <div className="my-6 flex gap-6">
        <section className="w-80 p-4 rounded backdrop-blur-md bg-white/80 shadow-md">
          <p className="flex justify-between">
            Total Bets : <span>{bets?.length}</span>
          </p>
          <p className="flex justify-between">
            Total Bet Amount :
            <span>
              ₹ {bets?.reduce((acc, curr) => acc + Number(curr.amount || 0), 0)}
            </span>
          </p>
          <p className="flex justify-between">
            Winning Amount :
            <span>
              ₹
              {bets?.reduce(
                (acc, curr) => acc + Number(curr.win_amount || 0),
                0
              )}
            </span>
          </p>
          <p className="flex justify-between mt-4 border-t font-medium">
            Profit/Loss:
            <span
              className={
                bets?.reduce((acc, curr) => acc + Number(curr.amount || 0), 0) -
                  bets?.reduce(
                    (acc, curr) => acc + Number(curr.win_amount || 0),
                    0
                  ) >=
                0
                  ? "text-[#51bd45]"
                  : "text-red-600"
              }
            >
              {(() => {
                const winTotal = bets?.reduce(
                  (acc, curr) => acc + Number(curr.amount || 0),
                  0
                );
                const betTotal = bets?.reduce(
                  (acc, curr) => acc + Number(curr.win_amount || 0),
                  0
                );
                const profitLoss = winTotal - betTotal;
                const sign = profitLoss >= 0 ? "+" : "-";
                return `${sign} ₹${Math.abs(profitLoss).toFixed(2)}`;
              })()}
            </span>
          </p>
        </section>

        {/* team one */}
        <section className="w-80 p-4 rounded backdrop-blur-md bg-white/80 shadow-md">
          <h1 className="font-semibold italic text-[#7c00ff] mb-2 underline">
            {matchDetails?.teams[0]?.team_name}
          </h1>
          <p className="flex justify-between">
            Total Bets :
            <span>
              {
                bets?.filter(
                  (i) => i.team_name === matchDetails?.teams[0]?.team_name
                ).length
              }
            </span>
          </p>
          <p className="flex justify-between">
            Total Bet Amount :
            <span>
              ₹
              {bets
                ?.filter(
                  (i) => i.team_name === matchDetails?.teams[0]?.team_name
                )
                .reduce((acc, curr) => acc + Number(curr.amount || 0), 0)}
            </span>
          </p>
          <p className="flex justify-between">
            Winning Amount :
            <span>
              ₹
              {bets
                ?.filter(
                  (i) => i.team_name === matchDetails?.teams[0]?.team_name
                )
                .reduce((acc, curr) => acc + Number(curr.win_amount || 0), 0)}
            </span>
          </p>
          <p
            onClick={() => {
              handleShowData(matchDetails?.teams[0]?.team_name);
            }}
            className="text-center  rounded bg-[#4ccbfd] mt-4 text-sm font-medium cursor-pointer py-1"
          >
            View
          </p>
        </section>

        {/* team 2 */}
        <section className="w-80 p-4 rounded backdrop-blur-md bg-white/80 shadow-md">
          <h1 className="font-semibold italic text-[#7c00ff] mb-2 underline">
            {matchDetails?.teams[1]?.team_name}
          </h1>
          <p className="flex justify-between">
            Total Bets :
            <span>
              {
                bets?.filter(
                  (i) => i.team_name === matchDetails?.teams[1]?.team_name
                ).length
              }
            </span>
          </p>
          <p className="flex justify-between">
            Total Bet Amount :
            <span>
              ₹
              {bets
                ?.filter(
                  (i) => i.team_name === matchDetails?.teams[1]?.team_name
                )
                .reduce((acc, curr) => acc + Number(curr.amount || 0), 0)}
            </span>
          </p>
          <p className="flex justify-between">
            Winning Amount :
            <span>
              ₹
              {bets
                ?.filter(
                  (i) => i.team_name === matchDetails?.teams[1]?.team_name
                )
                .reduce((acc, curr) => acc + Number(curr.win_amount || 0), 0)}
            </span>
          </p>
          <p
            onClick={() => {
              handleShowData(matchDetails?.teams[1]?.team_name);
            }}
            className="text-center  rounded bg-[#4ccbfd] mt-4 text-sm font-medium cursor-pointer py-1"
          >
            View
          </p>
        </section>
      </div>

      <div className="flex w-full justify-end">
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="w-60 p-2 mb-3 border border-gray-200 rounded-md  "
        />
      </div>
      <div className="overflow-x-auto  ">
        <table className="min-w-full text-sm text-left border border-gray-600">
          <thead className="bg-indigo-500 text-xs uppercase font-semibold text-gray-100">
            <tr>
              <th
                className="px-4 py-3 cursor-pointer"
                onClick={() => handleSort("id")}
              >
                <p className="flex gap-1 items-center">
                  ID
                  <FaFilter />
                </p>
              </th>
              <th
                className="px-4 py-3 cursor-pointer"
                onClick={() => handleSort("match_id")}
              >
                <p className="flex gap-1 items-center">
                  Match ID
                  <FaFilter />
                </p>
              </th>
              <th
                className="px-4 py-3 cursor-pointer"
                onClick={() => handleSort("user_id")}
              >
                <p className="flex gap-1 items-center">
                  User ID
                  <FaFilter />
                </p>
              </th>
              <th
                className="px-4 py-3 cursor-pointer"
                onClick={() => handleSort("mobile")}
              >
                <p className="flex gap-1 items-center">
                  Mobile
                  <FaFilter />
                </p>
              </th>
              <th
                className="px-4 py-3 cursor-pointer"
                onClick={() => handleSort("team_name")}
              >
                <p className="flex gap-1 items-center">
                  Team
                  <FaFilter />
                </p>
              </th>
              <th
                className="px-4 py-3 cursor-pointer"
                onClick={() => handleSort("bet_type")}
              >
                <p className="flex gap-1 items-center">
                  Bet Type
                  <FaFilter />
                </p>
              </th>
              <th
                className="px-4 py-3 cursor-pointer"
                onClick={() => handleSort("bet_value")}
              >
                <p className="flex gap-1 items-center">
                  Bet Value
                  <FaFilter />
                </p>
              </th>
              <th
                className="px-4 py-3 cursor-pointer"
                onClick={() => handleSort("amount")}
              >
                <p className="flex gap-1 items-center">
                  Amount
                  <FaFilter />
                </p>
              </th>
              <th
                className="px-4 py-3 cursor-pointer"
                onClick={() => handleSort("win_amount")}
              >
                <p className="flex gap-1 items-center">
                  Win Amount
                  <FaFilter />
                </p>
              </th>
              <th
                className="px-4 py-3 cursor-pointer"
                onClick={() => handleSort("section")}
              >
                <p className="flex gap-1 items-center">
                  Section
                  <FaFilter />
                </p>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-500">
            {sortedBets.length === 0 ? (
              <p className="text-xl font-bold text-gray-200 py-10 text-center">
                No Bet Yet
              </p>
            ) : (
              sortedBets.map((bet) => (
                <tr
                  key={bet.id}
                  className="hover:bg-gray-50 hover:text-gray-900 cursor-pointer text-gray-200"
                >
                  <td className="px-4 py-3">{bet.id}</td>
                  <td className="px-4 py-3">{bet.match_id}</td>
                  <td className="px-4 py-3">{bet.user_id}</td>
                  <td className="px-4 py-3">{bet.mobile}</td>
                  <td className="px-4 py-3">{bet.team_name}</td>
                  <td className="px-4 py-3">
                    {bet.bet_type === "L" ? "Last Digit" : "Exect Run"}
                  </td>
                  <td className="px-4 py-3">{bet.bet_value}</td>
                  <td className="px-4 py-3">₹ {bet.amount}</td>
                  <td className="px-4 py-3">₹ {bet.win_amount || "-"}</td>
                  <td className="px-4 py-3">{bet.section}th Over</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showTable && (
        <div className="fixed top-0 left-0 w-screen h-screen backdrop-blur-md bg-black/50 z-[99] flex flex-col justify-center items-center">
          <div className="p-6 max-w-5xl rounded-lg overflow-auto bg-white animate-flip-down">
            <div className="flex justify-between">
              <p className="mb-6 font-semibold text-lg">{viewTeam}</p>{" "}
              <MdCancel
                className="cursor-pointer"
                onClick={() => {
                  setShowTable(false);
                  setViewTeam("");
                }}
                size={22}
              />
            </div>
            {sectionStats.length === 0 ? (
              <p className="text-xl font-bold text-gray-800 py-10 px-10 text-center">
                No Bet Yet
              </p>
            ) : (
              sectionStats.map(
                ({
                  section,
                  betStats,
                  maxAmount,
                  totalBets,
                  totalAmountLastDigit,
                  totalAmountExactRun,
                  finalExectBets,
                }) => (
                  <div className="mb-6">
                    <section
                      key={section}
                      className="  border-2 border-indigo-500 shadow-md rounded-lg overflow-hidden bg-indigo-50"
                    >
                      {/* Section header with totals */}
                      <div className="flex gap-6 items-center p-4 bg-indigo-200 font-semibold text-sm">
                        <p>Section: {section}</p>
                        <p>Total Bets: {totalBets}</p>
                        <p> Last Digit: ₹ {totalAmountLastDigit}</p>
                        <p> Exact Run: ₹ {totalAmountExactRun}</p>
                      </div>

                      <div className="flex gap-4 justify-between">
                        {/* Left-side header */}
                        <div className="font-medium shadow text-center bg-indigo-500">
                          Over <br />
                          <div className="p-4 text-left bg-white">
                            Bets: <br /> Amount:
                          </div>
                        </div>

                        {/* Stats grid */}
                        <div className="flex overflow-auto">
                          {betStats.map((stat) => {
                            const isHighest =
                              stat.totalAmount === maxAmount && maxAmount > 0;

                            return (
                              <div
                                key={stat.value}
                                className={`border border-y-0 border-gray-600 text-center min-w-[80px] ${
                                  isHighest ? "bg-green-400" : ""
                                }`}
                              >
                                <p className="bg-black text-gray-100">
                                  {stat.value}
                                </p>
                                <div className="p-4">
                                  <p className="text-[#138737] font-medium text-lg">
                                    ₹ {stat.totalAmount}
                                  </p>
                                  <p className="text-red-600 text-sm font-semibold ">
                                    {/* Loss  :  */}
                                   L ₹ {stat.lossIfWins}
                                  </p>
                                  <p className="text-blue-600 text-sm font-semibold ">
                                    {/* Profit  : */}
                                    P ₹ {stat.profitIfNotWin}
                                  </p>
                                  <p
                                    className={`text-sm font-bold ${
                                      stat.netOutcome < 0
                                        ? "text-red-700"
                                        : "text-green-700"
                                    }`}
                                  >
                                    Net Outcome: ₹ {stat.netOutcome}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </section>
                    <div className="flex">
                      <p>Exect Run Bets</p>
                      <div className="flex overflow-auto">
                        {finalExectBets.map((item) => (
                          <div
                            key={item.bet_value}
                            className="border border-gray-600 text-center min-w-[80px]"
                          >
                            <p className="bg-[#ff4747] text-gray-100">
                              {item.bet_value} Runs
                            </p>
                            <div>
                              <p>Rs.{item.amount}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
