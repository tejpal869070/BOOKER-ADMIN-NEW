import axios from "axios";
import { API } from "../Api";

export const getAllDepositRequest = async (req, res) => {
  try {
    const response = await axios.post(`${API.url}/admin/all-deposit-requests`);
    return response.data;
  } catch (error) {
    return [];
  }
};

export const getAllWithdrawalRequests = async (req, res) => {
  try {
    const response = await axios.post(
      `${API.url}/admin/all-withdrawal-request`
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

export const inprocessWithdrawalRequest = async (id) => {
  const response = await axios.post(
    `${API.url}/admin/inprocess-withdrawal-request`,
    { id }
  );
  return response;
};

export const rejectWithdrawalRequest = async (id, reason) => {
  const response = await axios.post(
    `${API.url}/admin/reject-withdrawal-request`,
    { id, reason }
  );
  return response;
};

export const approveWithdrawalRequest = async (id) => {
  const response = await axios.post(
    `${API.url}/admin/approve-withdrawal-request`,
    { id }
  );
  return response;
};

export const approveDepositRequest = async (id) => {
  try {
    const response = await axios.post(
      `${API.url}/admin/approve-deposit-request`,
      {
        id,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const rejectDepostRequest = async (id, reason) => {
  try {
    const response = await axios.post(
      `${API.url}/admin/decline-deposit-request`,
      { id, reason }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addNewMatch = async (formData) => {
  const response = await axios.post(
    `${API.url}/admin/add-new-match`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const getAllMatch = async () => {
  const response = await axios.post(`${API.url}/admin/get-all-match `);
  return response;
};

export const makeMatchLive = async (id, status, betting) => {
  const response = await axios.post(`${API.url}/admin/change-match-status `, {
    id,
    status,
    can_bet_place: betting,
  });
  return response;
};

export const updateMatchResult = async (
  match_id,
  section_id,
  result,
  selectedTeam
) => {
  const response = await axios.post(`${API.url}/admin/update-match-results `, {
    match_id,
    section_id,
    result,
    team_name: selectedTeam,
  });
  return response;
};

export const deleteMatch = async (id) => {
  const response = await axios.post(`${API.url}/admin/delete-match`, {
    id,
  }); 
  return response;
};

export const winLossMatch = async (id, section_id, selectedTeam) => {
  const response = await axios.post(`${API.url}/admin/win-loss-match`, {
    id,
    section_id,
    team_name: selectedTeam,
  });
  return response;
};

export const updateMatchTime = async (match_id, match_time) => {
  const response = await axios.post(`${API.url}/admin/update-match-time`, {
    match_id,
    match_time,
  });
  return response;
};

export const completeMatch = async (id) => {
  const response = await axios.post(`${API.url}/admin/complete-match`, {
    id,
  });
  return response;
};

export const getAllBets = async (id) => {
  const response = await axios.post(`${API.url}/admin/get-all-bets`, {
    id,
  });
  return response;
};

export const getAdminData = async (type) => {
  const response = await axios.post(`${API.url}/admin/get-admin-data`, {
    type,
  });
  return response;
};

export const adminLogin = async (username, password) => {
  const response = await axios.post(`${API.url}/admin/login`, {
    username: username,
    password: password,
  });

  return response;
};

export const getAllUsers = async () => {
  const response = await axios.post(`${API.url}/admin/get-all-users`);
  return response;
};

export const getAllGamesData = async (type) => {
  const response = await axios.post(`${API.url}/admin/get-games-data`, {
    type,
  });
  return response;
};

export const getUserDetail = async (user_id) => {
  const response = await axios.post(`${API.url}/admin/get-user-details`, {
    user_id: user_id,
  });
  return response;
};

export const blockUser = async (email, type) => {
  const response = await axios.post(`${API.url}/admin/block-user`, {
    email: email,
    type: type,
  });
  return response;
};

export const getSingleMatchDetail = async (id) => {
  const response = await axios.post(
    `${API.url}/admin/get-single-match-detail`,
    { id }
  );
  return response;
};

export const addRefund = async (data) => {
  const response = await axios.post(`${API.url}/admin/add-refund`, {
    amount: data?.amount,
    user_id: data?.user_id,
    reason: data?.reason,
    type: data?.type,
  });
  return response;
};
