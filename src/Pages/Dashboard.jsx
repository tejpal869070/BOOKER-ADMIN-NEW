import React, { useEffect, useState } from "react";
import { FaWallet } from "react-icons/fa";
import { IoIosWallet } from "react-icons/io";
import { IoGameController } from "react-icons/io5";
import { BiSolidCricketBall } from "react-icons/bi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAdminData,
  getAllGamesData,
} from "../Controllers/Admin/AdminController";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register required components

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (context) => `${context.dataset.label}: ${context.raw}`,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export default function Dashboard() {
  const [adminData, setAdminData] = useState({});
  const [gamesData, setGamesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rows, setRow] = useState()
  // chart data
  const [roundsData, setRoundsData] = useState([0, 0, 0, 0, 0, 0]);
  const [betAmountData, setBetAmountData] = useState([0, 0, 0, 0, 0, 0]);
  const [betWinData, setBetWinData] = useState([0, 0, 0, 0, 0, 0]);
  const [type, setType] = useState("");

  const data = {
    labels: ["Mines", "Wheel", "Limbo", "Dragon Tower", "Coin Flip", "Match"],
    datasets: [
      {
        label: "Games Played",
        data: roundsData,
        fill: false,
        tension: 0.4,
        backgroundColor: [
          "#8569f1", // Purple 1
          "rgb(164, 101, 241)", // Purple 2
          "rgb(101, 143, 241)", // Blue 1
          "rgb(255, 159, 64)", // Orange
          "rgb(75, 192, 192)", // Teal
          "rgb(255, 99, 132)", // Red
        ],

        hoverOffset: 4,
        borderWidth: 1,
      },
    ],
  };

  const data2 = {
    labels: ["Mines", "Wheel", "Limbo", "Dragon Tower", "Coin Flip", "Match"],
    datasets: [
      {
        label: "Amount Bet",
        data: betAmountData,
        fill: false,
        tension: 0.4,
        backgroundColor: [
          "#8569f1", // Purple 1
          "rgb(164, 101, 241)", // Purple 2
          "rgb(101, 143, 241)", // Blue 1
          "rgb(255, 159, 64)", // Orange
          "rgb(75, 192, 192)", // Teal
          "rgb(255, 99, 132)", // Red
        ],

        hoverOffset: 4,
        borderWidth: 1,
      },
    ],
  };

  const data3 = {
    labels: ["Mines", "Wheel", "Limbo", "Dragon Tower", "Coin Flip", "Match"],
    datasets: [
      {
        label: "Amount Winning",
        data: betWinData,
        fill: false,
        tension: 0.4,
        backgroundColor: [
          "#8569f1", // Purple 1
          "rgb(164, 101, 241)", // Purple 2
          "rgb(101, 143, 241)", // Blue 1
          "rgb(255, 159, 64)", // Orange
          "rgb(75, 192, 192)", // Teal
          "rgb(255, 99, 132)", // Red
        ],

        hoverOffset: 4,
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    let intervalId;

    const fetchAllData = async () => {
      console.log("first")
      try {
        setLoading(true);

        const [adminResponse, gamesResponse] = await Promise.all([
          getAdminData(type),
          getAllGamesData(type),
        ]);

        setAdminData(adminResponse.data);
        setGamesData(gamesResponse.data[0]);
        console.log(gamesResponse.data[0])
        const rounds = Object.keys(gamesResponse.data[0]).map(
          (game) => gamesResponse.data[0][game].rounds
        );
        const betAmount = Object.keys(gamesResponse.data[0]).map(
          (game) => gamesResponse.data[0][game].total_bet_amount
        );
        const betWinData = Object.keys(gamesResponse.data[0]).map(
          (game) => gamesResponse.data[0][game].total_win_amount
        );

        setRoundsData(rounds);
        setBetAmountData(betAmount);
        setBetWinData(betWinData);
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
    intervalId = setInterval(fetchAllData, 10000); // every 10 seconds

    return () => clearInterval(intervalId); // cleanup on unmount
  }, [type]);

  useEffect(() => {
    const rows = Object.entries(gamesData).map(([game, stats]) => ({
      game,
      ...stats,
    }));
    setRow(rows)
  }, [gamesData]);
 

  return ( 
    <div>
      <div className=" flex justify-end ">
        <select
          onChange={(e) => setType(e.target.value)}
          className=" inline border-0 rounded-lg cursor-pointer "
        >
          <option value="">All</option>
          <option value="Today">Today </option>
          <option value="Daily">Last 7 Days </option>
          <option value="Weekly">Last 4 Weeks</option>
          <option value="Monthly">Last 6 Months</option>
          <option value="Yearly">Last 5 Years</option>
        </select>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-5   gap-4 mt-6">
        {/* deposit */}
        <div class="container  ">
          <Link
            to={"/dashboard?admin=deposit"}
            class="card_box overflow-hidden"
          >
            <p className="font-semibold text-gray-200 text-center text-md border-b bg-[#c1870a] p-4">
              Desposit
            </p>
            <div className="p-4">
              <div className="text-sm flex justify-between w-full mt-4 text-gray-300 font-medium border-b-[0.5px] border-gray-600">
                Total Requests <p>{adminData?.deposit?.total}</p>
              </div>
              <div className="text-sm flex justify-between w-full mt-2 border-b-[0.5px] border-gray-600 text-gray-300 font-medium">
                Pending <p>{adminData?.deposit?.pending}</p>
              </div>
              <div className="text-sm flex justify-between w-full mt-2 border-b-[0.5px] border-gray-600 text-gray-300 font-medium">
                Approved <p>{adminData?.deposit?.approved}</p>
              </div>
              <div className="text-sm flex justify-between w-full mt-2 border-b-[0.5px] border-gray-600 text-gray-300 font-medium">
                Rejected <p>{adminData?.deposit?.rejected}</p>
              </div>
              <div className="text-[#1cc71c] text-sm flex justify-between w-full mt-2 border-b-[0.5px] border-gray-600   font-medium">
                Total Deposit <p>₹{adminData?.deposit?.total_amount}</p>
              </div>
            </div>
          </Link>
        </div>

        {/* withdrwaal */}
        <div class="container">
          <Link
            to={"/dashboard?admin=withdrawal"}
            class="card_box overflow-hidden"
          >
            <p className="font-semibold text-gray-200 text-center text-md border-b bg-[#c1870a] p-4">
              Withdrawal
            </p>
            <div className="p-4">
              <div className="text-sm flex justify-between w-full mt-4 text-gray-300 font-medium border-b-[0.5px] border-gray-600">
                Total Requests <p>{adminData?.withdrawal?.total}</p>
              </div>
              <div className="text-sm flex justify-between w-full mt-2 border-b-[0.5px] border-gray-600 text-gray-300 font-medium">
                Pending <p>{adminData?.withdrawal?.pending}</p>
              </div>
              <div className="text-sm flex justify-between w-full mt-2 border-b-[0.5px] border-gray-600 text-gray-300 font-medium">
                Approved <p>{adminData?.withdrawal?.approved}</p>
              </div>
              <div className="text-sm flex justify-between w-full mt-2 border-b-[0.5px] border-gray-600 text-gray-300 font-medium">
                Rejected <p>{adminData?.withdrawal?.rejected}</p>
              </div>
              <div className="text-red-500 text-sm flex justify-between w-full mt-2 border-b-[0.5px] border-gray-600  font-medium">
                Total Withdrawal <p>₹{adminData?.withdrawal?.total_amount}</p>
              </div>
            </div>
          </Link>
        </div>

        {/* users */}
        <div class="container">
          <Link to={"/dashboard?admin=users"} class="card_box overflow-hidden">
            <p className="font-semibold text-gray-200 text-center text-md border-b bg-[#c1870a] p-4">
              Users
            </p>
            <div className="p-4">
              <div className="text-sm flex justify-between w-full mt-4 text-gray-300 font-medium border-b-[0.5px] border-gray-600">
                Total User <p>{adminData?.users?.total}</p>
              </div>
              <div className="text-sm flex justify-between w-full mt-2 border-b-[0.5px] border-gray-600 text-gray-300 font-medium">
                Blocked <p>{adminData?.users?.blocked}</p>
              </div>
              <div className="text-sm flex justify-between w-full mt-2 border-b-[0.5px] border-gray-600 text-gray-300 font-medium">
                Active <p>{adminData?.users?.active}</p>
              </div>
              <div className="text-sm flex justify-between w-full mt-2 border-b-[0.5px] border-gray-600 text-gray-300 font-medium">
                Total Main Bal. <p>₹{Number(adminData?.wallets?.total_game_wallet).toFixed(3)}</p>
              </div>
              <div className="text-sm flex justify-between w-full mt-2 border-b-[0.5px] border-gray-600 text-gray-300 font-medium">
                Total Game Bal. <p>₹{Number(adminData?.wallets?.total_main_wallet).toFixed(3)}</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* games */}
      <h1 className="text-center mt-10 bg-indigo-500   py-1 rounded-t-xl font-semibold text-lg italic">
        {" "}
        Games Data{" "}
      </h1>

      <div className="  bg-gray-800 items-center  ">
        <div className="w-full   grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 p-4   gap-4  rounded-t-0 ">
          {rows?.map(
            ({ game, total_bet_amount, total_win_amount, rounds }, idx) => (
              <div class="container" key={idx}>
                <div class="card_box overflow-hidden">
                  <p
                    className={`font-semibold text-gray-200 text-center text-lg italic border-b  p-4 ${
                      idx === 0
                        ? "bg-[#8569f1]"
                        : idx === 1
                        ? "bg-[#a465f1]"
                        : idx === 2
                        ? "bg-[#658ff1]"
                        : idx === 3
                        ? "bg-[#ff9f40]"
                        : idx === 4
                        ? "bg-[#4bc0c0]"
                        : "bg-[#ff6384]"
                    } `}
                  >
                    {game}
                  </p>
                  <div className="p-4">
                    <div className="text-sm flex justify-between w-full mt-4 text-gray-300 font-medium border-b-[0.5px] border-gray-600">
                      Total Bets <p>{rounds}</p>
                    </div>
                    <div className="text-sm flex justify-between w-full mt-2 border-b-[0.5px] border-gray-600 text-gray-300 font-medium">
                      Bet Amount <p>₹{Number(total_bet_amount).toFixed(3)}</p>
                    </div>
                    <div className="text-sm flex justify-between w-full mt-2 border-b-[0.5px] border-gray-600 text-gray-300 font-medium">
                      Winnings <p>₹{Number(total_win_amount).toFixed(3)}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        {/* chart */}
      </div>

      <div className="grid grid-cols-3 grid-rows-1 gap-4 p-4 bg-gray-800 rounded-b-lg pt-6">
        <div className="w-full  shadow-lg bg-gray-800 border border-gray-600 rounded-lg overflow-hidden  flex justify-center items-center    ">
          <div className="p-1  ">
            <p className="text-sm font-semibold text-gray-200 underline italic">
              Total Bets
            </p>
            <Bar
              data={data}
              options={options}
              className="w-[400px] h-[400px]"
            />
          </div>
        </div>
        <div className="w-full  shadow-lg bg-gray-800 border border-gray-600 rounded-lg overflow-hidden  flex justify-center items-center    ">
          <div className="p-1  ">
            <p className="text-sm font-semibold text-gray-200 underline italic">
              Bet Amount Chart
            </p>
            <Bar
              data={data2}
              options={options}
              className="w-[400px] h-[400px]"
            />
          </div>
        </div>
        <div className="w-full  shadow-lg bg-gray-800 border border-gray-600 rounded-lg overflow-hidden  flex justify-center items-center    ">
          <div className="p-1  ">
            <p className="text-sm font-semibold text-gray-200 underline italic">
              Bet Winnings Chart
            </p>
            <Bar
              data={data3}
              options={options}
              className="w-[400px] h-[400px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

//  <Link
//         to={"/dashboard?admin=deposit"}
//         className="border-2 border-gray-400 p-2 rounded text-center font-semibold text-gray-300 flex flex-col justify-center items-center gap-2"
//       >
//         <FaWallet size={20} />
//         Desposit
//         <div className="border-t w-full pt-1">
//           <p className="flex justify-between">
//             Total : <span></span>
//             {adminData?.depositCount}
//           </p>
//         </div>
//       </Link>
//       <Link
//         to={"/dashboard?admin=withdrawal"}
//         className="border-2 border-gray-400 p-2 rounded text-center font-semibold text-gray-300 flex flex-col justify-center items-center gap-2"
//       >
//         <IoIosWallet size={20} />
//         Withdrawal
//         <div className="border-t w-full pt-1">
//           <p className="flex justify-between">
//             Total : <span></span>
//             {adminData?.withdrawalCount}
//           </p>
//         </div>
//       </Link>
//       <Link
//         to={"/dashboard?admin=games-control"}
//         className="border-2 border-gray-400 p-2 rounded text-center font-semibold text-gray-300 flex flex-col justify-center items-center gap-2"
//       >
//         <IoGameController size={20} />
//         Games
//       </Link>
//       <Link
//         to={"/dashboard?admin=matches"}
//         className="border-2 border-gray-400 p-2 rounded text-center font-semibold text-gray-300 flex flex-col justify-center items-center gap-2"
//       >
//         <BiSolidCricketBall size={20} />
//         Match
//       </Link>
