// Internal
import getOptions from "../../../utils/middleware/getOptions";
import URL from "../../../utils/constants/URLs";

const getUsers = async () => {
  const API_URL = URL.API_URL;

  const response = await fetch(`${API_URL}/v1/users`, getOptions("GET"));
  if (!response.ok) {
    throw Error("An error occured while fetching users");
  }
  return await response.json();
};

export default getUsers;
