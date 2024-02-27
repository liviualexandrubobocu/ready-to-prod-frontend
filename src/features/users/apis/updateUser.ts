// Internal
import getOptions from "../../../utils/middleware/getOptions";
import URL from "../../../utils/constants/URLs";

const updateUser = async (id: string, body: BodyInit | null | undefined) => {
  const API_URL = URL.API_URL;

  const response = await fetch(`${API_URL}/v1/users/${id}`, {
    ...getOptions("PUT"),
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw Error("An error occured while updating users");
  }
  return await response.json();
};

export default updateUser;
