import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import ColorGame from "../Componentes/Casino/ColorGame";
import Aviator from "../Componentes/Casino/Aviator";
import MinesGame from "../Componentes/Casino/MinesGame"; 
import WheelGame from "../Componentes/Casino/WheelGame";
import LiveCasinoDashboard from "../Componentes/Casino/LiveCasinoDashboard";
import CasinoLobby from "../Componentes/Casino/CasinoLobby";
import Limbo from "../Componentes/Casino/Limbo";
import DragonTower from "../Componentes/Casino/DragonTower";
import GameLoading from "../Componentes/GameLoading";
import CoinFlip from "../Componentes/Casino/CoinFlip";

export default function LiveCasino() {
  const location = useLocation();
  const [preload, setPreload] = useState(false);
  const [gameComponent, setGameComponent] = useState(null);

  // get path and query to display content in inner section
  const paramsData = useMemo(() => {
    const queryParams = new URLSearchParams(location.search);
    const data = {};
    for (const [key, value] of queryParams.entries()) {
      data[key] = value;
    }
    return data;
  }, [location.search]);

  useEffect(() => {
    if (paramsData && paramsData.game) {
      setPreload(true);
      const timeoutId = setTimeout(() => {
        setPreload(false);
        const renderGameComponent = () => {
          if (paramsData && paramsData.game === "color-game") {
            setGameComponent(<ColorGame />);
          } else if (paramsData && paramsData.game === "mines") {
            setGameComponent(<MinesGame />);
          } else if (paramsData && paramsData.game === "wheel") {
            setGameComponent(<WheelGame />);
          } else if (paramsData && paramsData.game === "casino") {
            setGameComponent(<LiveCasinoDashboard />);
          } else if (paramsData && paramsData.game === "limbo") {
            setGameComponent(<Limbo />);
          } else if (paramsData && paramsData.game === "dragon-tower") {
            setGameComponent(<DragonTower />);
          } else if (paramsData && paramsData.game === "casino-lobby") {
            setGameComponent(<CasinoLobby />);
          } else if (paramsData && paramsData.game === "aviator") {
            setGameComponent(<Aviator />);
          } else if (paramsData && paramsData.game === "coin-flip") {
            setGameComponent(<CoinFlip />);
          } else {
            setGameComponent(
              <div>
                <iframe
                  src="https://www.crazygames.com/embed/ragdoll-archers"
                  title="onloneGame"
                  style={{ width: "80vw", height: "90vh" }}
                  frameborder="0"
                  allow="gamepad *;"
                ></iframe>
              </div>
            );
          }
        };
        renderGameComponent();
      }, 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [paramsData]);

  return (
    <div>
      {preload ? (
        <div>
          <GameLoading />
        </div>
      ) : (
        gameComponent
      )}
    </div>
  );
}
