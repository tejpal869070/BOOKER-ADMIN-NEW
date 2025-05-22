import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";

export default function AllBets({ bets, team_name }) {
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [searchQuery, setSearchQuery] = useState("");

  const betToShow = bets?.filter((i) => i.team_name === team_name);

  // Handle column header click for sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
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

  const filteredBets = betToShow.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.user_id.toLowerCase().includes(query) ||
      item.mobile.toString().toLowerCase().includes(query) ||
      item.amount.toString().toLowerCase().includes(query) ||
      item.section.toString().toLowerCase().includes(query)
    );
  });

  const sortedBets = sortData(filteredBets);

  return (
    <div>
      <div className="overflow-x-auto  ">
        <div className="flex justify-between">
          <p className="text-[#ff8a0d]">{team_name} BETS</p> 

          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-60 p-2 h-8 mb-3 bg-gray-400 border border-gray-200 rounded-md  "
          />
        </div>
        <table className="min-w-full text-sm text-left border border-gray-600">
          <thead className="bg-black text-xs uppercase font-medium text-gray-300">
            <tr>
              <th
                className="px-4 py-3 cursor-pointer whitespace-nowrap"
                onClick={() => handleSort("id")}
              >
                <p className="flex gap-1 items-center">
                  ID
                  <FaFilter />
                </p>
              </th>
              <th
                className="px-4 py-3 cursor-pointer whitespace-nowrap"
                onClick={() => handleSort("section")}
              >
                <p className="flex gap-1 items-center">
                  Section
                  <FaFilter />
                </p>
              </th>

              <th
                className="px-4 py-3 cursor-pointer whitespace-nowrap"
                onClick={() => handleSort("mobile")}
              >
                <p className="flex gap-1 items-center">
                  Mobile
                  <FaFilter />
                </p>
              </th>
              <th
                className="px-4 py-3 cursor-pointer whitespace-nowrap"
                onClick={() => handleSort("team_name")}
              >
                <p className="flex gap-1 items-center">
                  Team
                  <FaFilter />
                </p>
              </th>
              <th
                className="px-4 py-3 cursor-pointer whitespace-nowrap"
                onClick={() => handleSort("bet_type")}
              >
                <p className="flex gap-1 items-center">
                  Bet Type
                  <FaFilter />
                </p>
              </th>
              <th
                className="px-4 py-3 cursor-pointer whitespace-nowrap"
                onClick={() => handleSort("bet_value")}
              >
                <p className="flex gap-1 items-center">
                  Bet Value
                  <FaFilter />
                </p>
              </th>
              <th
                className="px-4 py-3 cursor-pointer whitespace-nowrap"
                onClick={() => handleSort("amount")}
              >
                <p className="flex gap-1 items-center">
                  Amount
                  <FaFilter />
                </p>
              </th>
              <th
                className="px-4 py-3 cursor-pointer whitespace-nowrap"
                onClick={() => handleSort("win_amount")}
              >
                <p className="flex gap-1 items-center">
                  Win Amount
                  <FaFilter />
                </p>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {sortedBets.length === 0 ? (
              <p className="text-xl font-bold text-gray-200 py-10 text-center">
                No Bet Yet
              </p>
            ) : (
              sortedBets.map((bet) => (
                <tr
                  key={bet.id}
                  className="hover:bg-gray-50 hover:text-gray-900 cursor-pointer text-gray-200 even:bg-[#243549]"
                >
                  <td className="px-4 py-1">{bet.id}</td>
                  <td className="px-4 py-1">{bet.section}th Over</td>
                  <td className="px-4 py-1">{bet.mobile}</td>
                  <td className="px-4 py-1">{bet.team_name}</td>
                  <td className="px-4 py-1">
                    {bet.bet_type === "L" ? "Last Digit" : "Exect Run"}
                  </td>
                  <td className="px-4 py-1">{bet.bet_value}</td>
                  <td className="px-4 py-1">₹ {bet.amount}</td>
                  <td className="px-4 py-1">₹ {bet.win_amount || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
