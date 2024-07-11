import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      <h2 className="text-3xl font-bold">Welcome, User {user}</h2>
      <button
        onClick={logout}
        className="px-4 py-2 font-semibold text-white bg-red-500 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
