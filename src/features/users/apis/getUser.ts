// Internal
import getOptions from "../../../utils/middleware/getOptions";
import URL from "../../../utils/constants/URLs";

const getUser = async (id: string) => {
  const API_URL = URL.API_URL;

  const response = await fetch(`${API_URL}/v1/users/${id}`, getOptions("GET"));
  if (!response.ok) {
    throw Error("An error occured while fetching user");
  }
  return await response.json();
};

export default getUser;
