// Internal
import getOptions from "../../../utils/middleware/getOptions";
import URL from "../../../utils/constants/URLs";

const createUser = async (body: BodyInit) => {
  const API_URL = URL.API_URL;

  const response = await fetch(`${API_URL}/v1/users`, {
    ...getOptions("POST"),
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw Error("An error occured while creating users");
  }
  return await response.json();
};

export default createUser;
