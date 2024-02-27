// Internal
import getOptions from "../../../utils/middleware/getOptions";
import URL from "../../../utils/constants/URLs";

const createUser = async (id: string) => {
  const API_URL = URL.API_URL;

  const response = await fetch(`${API_URL}/v1/users/${id}`, {
    ...getOptions("DELETE"),
  });
  if (!response.ok) {
    throw Error("An error occured while deleting users");
  }
  return await response.json();
};

export default createUser;
