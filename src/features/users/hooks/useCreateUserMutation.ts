import { useMutation } from "react-query";
import User from "../models/Users";
import createUser from "../apis/createUser";

const useCreateUserMutation = () =>
  useMutation((newUser: Partial<User>) => createUser(newUser as BodyInit));

export default useCreateUserMutation;
