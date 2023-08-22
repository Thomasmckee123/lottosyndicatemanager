import axios from "../integrations/instance";

const updateBalance = async (balance: number) => {
  console.log("balance ", balance);
  const updateData = {
    balance: balance,
  };
  const response = await axios.put(`/users/updateBalance`, updateData);
  return response.data;
};

const updateTreasury = async (treasury: number, gameId: number) => {
  try {
    const treasuryData = {
      treasury: Number(treasury),
    };
    console.log("treasury data   ", treasuryData);
    console.log("gameId", gameId);

    const response = await axios.put(`games/${gameId}`, treasuryData);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { updateBalance, updateTreasury };
