import React, { useState } from "react";
import { API } from "../Controllers/Api";

const MatchDataPopup = ({ matchData, onClose }) => {
  console.log(matchData);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg overflow-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{matchData.title}</h2>
          <button
            onClick={onClose}
            className="text-red-500 font-bold text-xl hover:text-red-700"
          >
            ×
          </button>
        </div>

        <table className="table-auto w-full border border-gray-300 mb-6">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Match Time</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Can Place Bet</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">
                {new Date(matchData.match_time).toLocaleString()}
              </td>
              <td className="border px-4 py-2">
                {matchData.status === "C"
                  ? "COMPLETED"
                  : matchData.status === "LIVE"
                  ? "LIVE"
                  : matchData.status === "UC"
                  ? "Upcoming"
                  : ""}
              </td>
              <td className="border px-4 py-2">{matchData.can_place_bet}</td>
            </tr>
          </tbody>
        </table>

        <h3 className="text-xl font-semibold mb-2">Score by Overs</h3>
        <table className="table-auto w-full border border-gray-300 mb-6">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">After Over</th>
              <th className="border px-4 py-2">Team Score</th>
            </tr>
          </thead>
          <tbody>
            {matchData.sections.map((section) => (
              <tr key={section.id}>
                <td className="border px-4 py-2">{section.after_over}</td>
                <td className="border px-4 py-2">
                  {section.result
                    ? section.result.map((team, idx) => (
                        <div key={idx}>
                          {team.team_name}: {team.score}
                        </div>
                      ))
                    : "No data"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="text-xl font-semibold mb-2">Teams</h3>
        <div className="grid grid-cols-2 gap-4">
          {matchData.teams.map((team, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={`${API.url}/assets/${team.image}`}
                  alt={team.team_name}
                  className="w-10 h-10 object-contain"
                />
                <h4 className="text-lg font-bold">{team.team_name}</h4>
              </div>
              <ul className="list-disc list-inside">
                {team.team_members.map((member, idx) => (
                  <li key={idx}>{member.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchDataPopup;
