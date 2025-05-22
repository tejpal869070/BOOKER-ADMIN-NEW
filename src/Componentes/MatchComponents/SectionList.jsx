import React, { useState } from "react";
import { MdCancel } from "react-icons/md";

export default function SectionList({ betsDetails, team_name }) {
  const [showTable, setShowTable] = useState(false);
  const [viewTeam, setViewTeam] = useState("");
  const [viewSection, setViewSection] = useState("");
  const [sectionStats, setSectionStats] = useState([]);
  const [showExactPopup, setShowExactPopup] = useState(false);
  const [exactPopupData, setExactPopupData] = useState([]);
  const [popupTeam, setPopupTeam] = useState("");
  const [popupSection, setPopupSection] = useState("");

  const bets = betsDetails?.filter((i) => i.team_name === team_name);

  const lambiBets = bets;
  const exactRunBets = bets.filter((bet) => bet.bet_type === "E");

  // Group by team -> section
  const groupedData = lambiBets.reduce((acc, bet) => {
    const team = bet.team_name;
    const section = bet.section;

    if (!acc[team]) acc[team] = {};
    if (!acc[team][section]) acc[team][section] = [];

    acc[team][section].push(bet);
    return acc;
  }, {});

  const renderTable = (team, sections) => (
    <div key={team} className="w-[95%]">
      <h2 className="text-xl font-bold mb-2 text-[#c7970a]">{team}</h2>

      <table className="min-w-full border border-gray-600 text-sm">
        <thead className="bg-black text-gray-400">
          <tr>
            <th className="border border-gray-800 px-4 py-2 text-left">
              Section
            </th>
            <th className="border border-gray-800 px-4 py-2 text-left">
              Bets View
            </th>
            <th className="border border-gray-800 px-4 py-2 text-left">
              Stake
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(sections).map(([section, _bets]) => (
            <tr key={section} className=" ">
              <td className="border border-gray-800 px-4 py-2 font-semibold text-gray-300">
                {section}th Over
              </td>
              <td className="border border-gray-800  px-4 py-2 flex justify-around">
                <button
                  onClick={() => handleView(team, section)}
                  className="bg-blue-500  text-white text-xs px-3 py-1 rounded"
                >
                  LAST DIGIT
                </button>
                <button
                  onClick={() => handleViewExactBook(team, section)}
                  className="bg-[#b319ae] text-white text-xs px-3 py-1 rounded"
                >
                  EXACT BOOK
                </button>
              </td>
              <td
                onClick={() => console.log(_bets)}
                className="border border-gray-800 px-4 py-2 font-semibold text-gray-300"
              >
                ₹
                {_bets
                  .reduce((sum, item) => sum + Number(item.amount || 0), 0)
                  .toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const handleView = (team, section) => {
    setViewTeam(team);
    setViewSection(section);

    const sectionBets = bets.filter(
      (bet) => bet.team_name === team && bet.section === section
    );

    const groupedBySection = {
      [section]: sectionBets,
    };

    const calculatedStats = Object.entries(groupedBySection).map(
      ([section, bets]) => {
        const totalBetsPerDigit = Array.from({ length: 10 }, (_, i) => {
          return bets
            .filter((item) => Number(item.bet_value) === i)
            .reduce((sum, item) => sum + Number(item.amount), 0);
        });

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

    setSectionStats(calculatedStats);
    setShowTable(true);
  };

  function calculateExactBookRanges(bets) {
    // Step 1: Filter Exact Run bets
    const exactBets = bets
      .filter((bet) => bet.bet_type === "E")
      .map((bet) => ({
        ...bet,
        bet_value: Number(bet.bet_value),
        amount: Number(bet.amount),
      }));

    if (exactBets.length === 0) return [];

    // Step 2: Get unique sorted bet values
    const sortedValues = [...new Set(exactBets.map((b) => b.bet_value))].sort(
      (a, b) => a - b
    );

    // Step 3: Build dynamic ranges
    const ranges = [];
    let prev = 0;
    for (let i = 0; i < sortedValues.length; i++) {
      const val = sortedValues[i];
      if (val - prev > 1) {
        ranges.push([prev, val - 1]);
      }
      ranges.push([val, val]);
      prev = val + 1;
    }
    const maxValue = sortedValues[sortedValues.length - 1];
    if (prev <= maxValue + 100) {
      ranges.push([prev, Infinity]);
    }

    // Step 4: Compute data for each range
    const rangeData = ranges.map(([start, end]) => {
      const inRange = exactBets.filter(
        (b) => b.bet_value >= start && b.bet_value <= end
      );
      const outRange = exactBets.filter(
        (b) => b.bet_value < start || b.bet_value > end
      );

      const totalAmount = inRange.reduce((sum, b) => sum + b.amount, 0);
      const lossIfWins = totalAmount * 20;
      const profitIfNotWin = outRange.reduce((sum, b) => sum + b.amount, 0);
      const netOutcome = profitIfNotWin - lossIfWins;

      const label =
        end === Infinity
          ? `${start}+`
          : start === end
          ? `${start}`
          : `${start}–${end}`;

      return {
        range: label,
        totalAmount,
        lossIfWins,
        profitIfNotWin,
        netOutcome,
      };
    });

    return rangeData;
  }

  const handleViewExactBook = (team, section) => {
    const filteredBets = bets.filter(
      (b) => b.bet_type === "E" && b.team_name === team && b.section === section
    );

    const rangeStats = calculateExactBookRanges(filteredBets);

    setExactPopupData(rangeStats);
    setPopupTeam(team);
    setPopupSection(section);
    setShowExactPopup(true);
  };

  return (
    <div className="flex justify-between gap-4 flex-wrap">
      {Object.entries(groupedData).map(([team, sections]) =>
        renderTable(team, sections)
      )}

      {showTable && (
        <div className="fixed top-0 left-0 w-screen h-screen backdrop-blur-md bg-black/50 z-[99] flex flex-col justify-center items-center">
          <div className="p-6 max-w-xl w-full rounded-lg overflow-auto bg-gray-100 animate-flip-down">
            <div className="flex justify-between items-center mb-4">
              <p className="font-semibold text-lg text-[#116b21]">
                {viewTeam} - {viewSection}th Over
              </p>
              <MdCancel
                className="cursor-pointer"
                onClick={() => {
                  setShowTable(false);
                  setViewTeam("");
                  setViewSection("");
                }}
                size={22}
              />
            </div>

            {sectionStats.length === 0 ? (
              <p className="text-xl font-bold text-gray-800 py-10 text-center">
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
                  <div key={section} className="mb-10">
                    <div className="bg-indigo-100 border border-indigo-400 rounded-md px-4 py-3 mb-4 text-sm font-semibold flex gap-6">
                      <p>Section: {section}</p>
                      <p>Total Bets: {totalBets}</p>
                      <p>Total Amount: ₹{totalAmountLastDigit}</p>
                    </div>

                    {/* TABLE FORMAT */}
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-sm text-left border border-gray-300">
                        <thead className="bg-indigo-500 text-white">
                          <tr>
                            <th className="border px-4 py-2">Digit</th>
                            <th className="border px-4 py-2">Stake </th>
                            {/* <th className="border px-4 py-2">Loss If Wins</th>
                            <th className="border px-4 py-2">
                              Profit If Not Win
                            </th> */}
                            <th className="border px-4 py-2">P/L</th>
                          </tr>
                        </thead>
                        <tbody>
                          {betStats.map((stat) => {
                            const isHighest =
                              stat.totalAmount === maxAmount && maxAmount > 0;

                            return (
                              <tr
                                key={stat.value}
                                className={
                                  isHighest ? "bg-green-100 font-semibold" : ""
                                }
                              >
                                <td className="border px-4 py-2">
                                  {stat.value}
                                </td>
                                <td className="border px-4 py-2">
                                  ₹{stat.totalAmount}
                                </td>
                                {/* <td className="border px-4 py-2 text-red-600">
                                  ₹{stat.lossIfWins}
                                </td>
                                <td className="border px-4 py-2 text-blue-600">
                                  ₹{stat.profitIfNotWin}
                                </td> */}
                                <td
                                  className={`border px-4 py-2 font-bold ${
                                    stat.netOutcome < 0
                                      ? "text-red-700"
                                      : "text-green-700"
                                  }`}
                                >
                                  ₹{stat.netOutcome}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Exact Run Bets Table */}
                    {/* <div className="mt-6">
                      <p className="font-bold mb-2">Exact Run Bets</p>
                      {finalExectBets.length > 0 ? (
                        <table className="min-w-[300px] border border-gray-300 text-sm">
                          <thead className="bg-red-500 text-white">
                            <tr>
                              <th className="border px-4 py-2">Run</th>
                              <th className="border px-4 py-2">Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {finalExectBets.map((item) => (
                              <tr key={item.bet_value}>
                                <td className="border px-4 py-2">
                                  {item.bet_value} Runs
                                </td>
                                <td className="border px-4 py-2">
                                  ₹{item.amount}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <p className="text-gray-500 text-sm">
                          No exact run bets found.
                        </p>
                      )}
                    </div> */}
                  </div>
                )
              )
            )}
          </div>
        </div>
      )}

      {showExactPopup && (
        <div className="fixed top-0 left-0 w-screen h-screen backdrop-blur-md bg-black/50 z-[99] flex flex-col justify-center items-center">
          <div className="p-6 max-w-xl max-h-[70vh] w-full bg-white rounded-lg overflow-auto animate-flip-down no-scrollbar">
            <div className="flex justify-between mb-4">
              <p className="text-lg font-semibold">
                {popupTeam} - Section {popupSection}
              </p>
              <MdCancel
                className="cursor-pointer"
                size={22}
                onClick={() => {
                  setShowExactPopup(false);
                  setExactPopupData([]);
                  setPopupTeam("");
                  setPopupSection("");
                }}
              />
            </div>

            <table className="w-full table-auto border border-gray-300 text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-3 py-2">Range</th>
                  <th className="border px-3 py-2">Stake</th>
                  {/* <th className="border px-3 py-2">Loss if Win</th>
                  <th className="border px-3 py-2">Profit if Not Win</th> */}
                  <th className="border px-3 py-2">P/L</th>
                </tr>
              </thead>
              <tbody>
                {exactPopupData.map((item, index) => (
                  <tr key={index}>
                    <td className="border px-3 py-1 text-center font-semibold">
                      {item.range}
                    </td>
                    <td className="border px-3 py-1 text-green-600 font-medium text-center">
                      ₹ {item.totalAmount}
                    </td>
                    {/* <td className="border px-3 py-1 text-red-600 text-center">
                      ₹ {item.lossIfWins}
                    </td>
                    <td className="border px-3 py-1 text-blue-600 text-center">
                      ₹ {item.profitIfNotWin}
                    </td> */}
                    <td
                      className={`border px-3 py-1 font-bold text-center ${
                        item.netOutcome < 0 ? "text-red-700" : "text-green-700"
                      }`}
                    >
                      ₹ {item.netOutcome}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
