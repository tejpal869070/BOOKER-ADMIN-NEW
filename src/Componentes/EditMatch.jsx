import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const initialData = {
  id: 1,
  match_time: "2025-05-01T10:30:00.000Z",
  sections: [
    { id: 1, after_over: "5" },
    { id: 2, after_over: "10" },
    { id: 3, after_over: "15" },
    { id: 4, after_over: "17" },
  ],
  teams: [
    {
      team_name: "RAJASTHAN ROYALS",
      team_members: [{ name: "TEJPAL SONI" }, { name: "Tarun Soni" }],
      image: "1746010799354-rr.webp",
    },
    {
      team_name: "Royal Challengers Bengaluru",
      team_members: [{ name: "Virat Kohli" }, { name: "Rajat Patidar" }],
      image: "1746010799354-rcb.png",
    },
  ],
  title: "TATA IPL 41th Match",
  status: "UC",
  result: "",
};

const EditMatch = () => {
  const [matchData, setMatchData] = useState(initialData);
  const [saving, setSaving] = useState(false);

  const handleMatchChange = (e) => {
    const { name, value } = e.target;
    setMatchData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTimeChange = (e) => {
    setMatchData((prev) => ({ ...prev, match_time: e.target.value }));
  };

  const handleSectionChange = (index, value) => {
    const updated = [...matchData.sections];
    updated[index].after_over = value;
    setMatchData((prev) => ({ ...prev, sections: updated }));
  };

  const addSection = () => {
    const newSection = {
      id: matchData.sections.length + 1,
      after_over: "",
    };
    setMatchData((prev) => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }));
  };

  const handleTeamChange = (teamIndex, name, value) => {
    const teams = [...matchData.teams];
    teams[teamIndex][name] = value;
    setMatchData((prev) => ({ ...prev, teams }));
  };

  const handleMemberChange = (teamIndex, memberIndex, value) => {
    const teams = [...matchData.teams];
    teams[teamIndex].team_members[memberIndex].name = value;
    setMatchData((prev) => ({ ...prev, teams }));
  };

  const addTeamMember = (teamIndex) => {
    const teams = [...matchData.teams];
    teams[teamIndex].team_members.push({ name: "" });
    setMatchData((prev) => ({ ...prev, teams }));
  };

  const removeTeamMember = (teamIndex, memberIndex) => {
    const teams = [...matchData.teams];
    teams[teamIndex].team_members.splice(memberIndex, 1);
    setMatchData((prev) => ({ ...prev, teams }));
  };

  const removeSection = (index) => {
    const updatedSections = [...matchData.sections];
    updatedSections.splice(index, 1);
    setMatchData((prev) => ({ ...prev, sections: updatedSections }));
  };

  const handleImageUpload = (teamIndex, file) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 5 * 1024 * 1024;

    if (!allowed.includes(file.type)) {
      toast.error("Only JPG, PNG, or WEBP allowed.");
      return;
    }

    if (file.size > maxSize) {
      toast.error("File exceeds 5MB.");
      return;
    }

    const teams = [...matchData.teams];
    teams[teamIndex].team_image = file;
    setMatchData((prev) => ({ ...prev, teams }));
  };

  const makeItLive = () => {
    setMatchData((prev) => ({ ...prev, status: "LIVE" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);

    // Build FormData or JSON here for actual submission
    console.log("Updated Match Data:", matchData);

    toast.success("Match updated (simulated)");
    setSaving(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-400 rounded-lg shadow-md mt-8">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Edit Match
      </h1>

      <form onSubmit={handleSubmit}>
        {/* Match Time */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Match Time:</label>
          <input
            type="datetime-local"
            value={new Date(matchData.match_time).toISOString().slice(0, 16)}
            onChange={handleTimeChange}
            className="w-full px-4 py-2 border rounded-md bg-gray-300"
          />
        </div>

        {/* Match Title */}
        <div className="mb-4">
          <label className="block text-gray-700">Match Title:</label>
          <input
            type="text"
            name="title"
            value={matchData.title}
            onChange={handleMatchChange}
            className="w-full px-4 py-2 border rounded-md bg-gray-300"
            required
          />
        </div>

        {/* Sections */}
        {/* Sections */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Sections</h3>
          {matchData.sections.map((section, idx) => (
            <div key={section.id} className="mb-3 flex items-center gap-4">
              <div className="flex-grow">
                <label className="block text-gray-700">
                  After Over (Section {section.id}):
                </label>
                <input
                  type="number"
                  value={section.after_over}
                  onChange={(e) => handleSectionChange(idx, e.target.value)}
                  className="w-full px-4 py-2 border rounded-md bg-gray-300"
                />
              </div>
              {matchData.sections.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSection(idx)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 mt-6"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addSection}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Add Section
          </button>
        </div>

        {/* Teams */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Teams</h3>
          {matchData.teams.map((team, teamIndex) => (
            <div
              key={teamIndex}
              className="bg-gray-700 text-white rounded-md p-4 mb-6"
            >
              <label>Team Name:</label>
              <input
                type="text"
                value={team.team_name}
                onChange={(e) =>
                  handleTeamChange(teamIndex, "team_name", e.target.value)
                }
                className="w-full px-4 py-2 mb-2 bg-gray-300 text-black border rounded"
              />

              <label>Team Logo:</label>
              <input
                type="file"
                onChange={(e) =>
                  handleImageUpload(teamIndex, e.target.files[0])
                }
                className="w-full bg-gray-300 text-black border rounded mb-2"
                accept=".jpg,.jpeg,.png,.webp"
              />

              <h4 className="mt-3 mb-2 text-sm font-bold">Team Members</h4>
              {team.team_members.map((member, memberIndex) => (
                <div key={memberIndex} className="mb-2 flex items-center">
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) =>
                      handleMemberChange(teamIndex, memberIndex, e.target.value)
                    }
                    className="w-[60%] px-4 py-2 bg-gray-300 text-black border rounded"
                  />
                  {team.team_members.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTeamMember(teamIndex, memberIndex)}
                      className="ml-2 px-2 py-1 bg-red-600 rounded text-white hover:bg-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={() => addTeamMember(teamIndex)}
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Add Member
              </button>
            </div>
          ))}
        </div>

        {/* Result and Status */}
        <div className="mb-4">
          <label className="block text-gray-700">Result:</label>
          <input
            type="text"
            name="result"
            value={matchData.result}
            onChange={handleMatchChange}
            className="w-full px-4 py-2 border rounded-md bg-gray-300"
          />
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-700">
            Status: <span className="font-bold">{matchData.status}</span>
          </p>
          <button
            type="button"
            onClick={makeItLive}
            className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
          >
            Make it Live
          </button>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full px-6 py-2 bg-indigo-700 text-white rounded hover:bg-indigo-800"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditMatch;
