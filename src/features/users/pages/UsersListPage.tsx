// Internal
import React from "react";
import { useUsers } from "../hooks/useUsers";
import User from "../models/Users";

const UsersPage = () => {
  const { data: users, isLoading } = useUsers();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="shadow-md rounded-lg overflow-hidden">
        <div className="bg-gray-100 p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 font-bold">
            <div>Id</div>
            <div>Username</div>
            <div>Email</div>
          </div>
        </div>
        <div className="bg-white">
          {users &&
            users.map((user: User) => (
              <div
                key={user.id}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 border-b last:border-b-0"
              >
                <div>{user.id}</div>
                <div>{user.username}</div>
                <div>{user.email}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
