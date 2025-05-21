import React, { useEffect, useState } from "react";
import Switch from "react-switch";
import { getAllGames } from "../Controllers/User/GamesController";
import axios from "axios";
import { API } from "../Controllers/Api";
import { toast, ToastContainer } from "react-toastify";

export default function Games() {
  const [data, setData] = useState([]);
  const [saving, setSaving] = useState(false);

  const handleSwitchChange = (index) => {
    const updatedData = [...data];
    updatedData[index].status = updatedData[index].status === "Y" ? "N" : "Y";
    setData(updatedData); // Update the state with the modified data
  };

  // Function to handle the save action
  const handleSave = async () => {
    setSaving(true);
    try {
      // Iterate through each game and send an API request to update its status
      const updatePromises = data.map((game) => {
        return axios.post(`${API.url}/admin/update-games/${game.id}`, {
          status: game.status,
        });
      });

      // Wait for all the requests to finish
      await Promise.all(updatePromises);
      toast.success("Game Status changed Successfully");
    } catch (error) {
      Window.alert("Somthing Went Wrong !");
    } finally {
      setSaving(false);
    }
  };

  // --------------------------
  useEffect(() => {
    const fatchGames = async () => {
      try {
        const response = await getAllGames();
        setData(response?.data); 
      } catch (error) {
        window.alert("Somthing Went Wrong !");
      }
    };

    fatchGames();
  }, []);
  // --------------------------

  return (
    <div className="max-w-4xl m-auto bg-gradient-to-r from-slate-900 to-slate-800 p-4 rounded">
      <ToastContainer />
      <div className="flex w-full justify-between text-gray-200 font-semibold border-b-2 border-red-200">
        <p>Game Name</p>
        <p>Status</p>
        <p>Action</p>
      </div>
      {data?.map((item, index) => (
        <div
          className="flex w-full justify-between text-gray-200 font-semibold mt-4"
          key={index}
        >
          <p className="w-[33%]">{item.game_name}</p>
          <p className="w-[33%] text-center ">
            {item.status === "Y" ? "Running" : "Stopped"}
          </p>
          <p className="w-[33%] flex  justify-end items-center">
            <Switch
              checked={item.status === "Y"}
              onChange={() => handleSwitchChange(index)}
              onColor="#4CAF50" // Green when ON
              offColor="#B71C1C" // Red when OFF
              height={20}
              width={40}
            />
          </p>
        </div>
      ))}

      <button
        className="mt-8 px-4 py-1 rounded-md bg-green-500 w-40 font-semibold text-gray-200"
        onClick={handleSave}
        disabled={saving}
      >
        {saving ? "Saving..." : "SAVE"}
      </button>
    </div>
  );
}
