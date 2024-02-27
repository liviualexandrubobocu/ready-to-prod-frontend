// External
import { useQuery } from "react-query";

// Internal
import getUsers from "../apis/getUsers";

export const useUsers = () => {
  return useQuery("users", getUsers);
};
