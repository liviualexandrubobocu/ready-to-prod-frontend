// Internal
import React from "react";
import { useUsers } from "../hooks/useUsers";
import User from "../models/Users";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";

const UsersPage = () => {
  const { data: users, isLoading } = useUsers();
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;

  const handleCreateClick = () => {
    navigate("/users/create");
  };

  const handleEditClick = (userId: number) => {
    navigate(`/users/${userId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <button
          onClick={handleCreateClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create
        </button>
      </div>
      <div className="shadow-md rounded-lg overflow-hidden">
        <div className="bg-gray-100 p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 font-bold">
            <div>Id</div>
            <div>Username</div>
            <div>Email</div>
            <div>Edit</div> {/* Added column for edit icon */}
          </div>
        </div>
        <div className="bg-white">
          {users &&
            users.map((user: User) => (
              <div
                key={user.id}
                className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 border-b last:border-b-0"
              >
                <div>{user.id}</div>
                <div>{user.username}</div>
                <div>{user.email}</div>
                <div>
                  <button
                    onClick={() => handleEditClick(user.id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FiEdit />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
