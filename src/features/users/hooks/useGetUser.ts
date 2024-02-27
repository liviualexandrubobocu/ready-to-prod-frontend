// External
import { useQuery } from "react-query";

// Internal
import getUser from "../apis/getUser";

export const useGetUser = (id: string) => {
  return useQuery(["users", id], () => getUser(id));
};
