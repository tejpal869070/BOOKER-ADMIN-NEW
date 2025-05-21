import React from "react";
import { useLocation } from "react-router-dom";
import Desposit from "../../Componentes/Desposit";
import Withdrawals from "../../Componentes/Withdrawals";
import Games from "../../Componentes/Games";
import MatchAdd from "../../Componentes/MatchAdd";
import Matches from "../../Componentes/Matches";
import EditMatch from "../../Componentes/EditMatch";
import Dashboard from "../Dashboard";
import Users from "../../Componentes/Users";
import UserDetails from "../../Componentes/UserDetails";
import MatchBetsDetails from "../../Componentes/MatchBetsDetails";

export default function InnerSection() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // get path and query to display content in inner section
  const paramsData = {};
  for (const [key, value] of queryParams.entries()) {
    paramsData[key] = value;
  }

  if (paramsData && paramsData.admin === "deposit") {
    return <div>{<Desposit />}</div>;
  } else if (paramsData && paramsData.admin === "withdrawal") {
    return <div>{<Withdrawals />}</div>;
  } else if (paramsData && paramsData.admin === "games-control") {
    return <div>{<Games />}</div>;
  } else if (paramsData && paramsData.admin === "add-new-match") {
    return <div>{<MatchAdd />}</div>;
  } else if (paramsData && paramsData.admin === "matches") {
    return <div>{<Matches />}</div>;
  } else if (paramsData && paramsData.admin === "edit-match") {
    return <div>{<EditMatch />}</div>;
  } else if (paramsData && paramsData.admin === "match-bets-details") {
    return <div>{<MatchBetsDetails />}</div>;
  } else if (paramsData && paramsData.admin === "users") {
    return <div>{<Users />}</div>;
  } else if (paramsData && paramsData.admin === "userdetails") {
    return <div>{<UserDetails />}</div>;
  } else {
    return <Dashboard />;
  }
}
