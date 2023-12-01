// components/UserTable.js
import React from 'react';
import { FaPlus } from 'react-icons/fa';

const UserTable = ({ users, onAdicionarVeiculo }) => {
  return (
    <div className="overflow-x-auto">
            <div className="flex justify-end mb-4">
        <button
          onClick={onAdicionarVeiculo}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
        >
          <FaPlus className="w-4 h-4 mr-2" />
          Adicionar Usuário
        </button>
      </div>
      <table className="min-w-full border border-gray-300 divide-y divide-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 font-semibold text-left">ID</th>
            <th className="py-2 px-4 font-semibold text-left">Login</th>
            <th className="py-2 px-4 font-semibold text-left">Role</th>
            <th className="py-2 px-4 font-semibold text-left">Username</th>
            <th className="py-2 px-4 font-semibold text-left">Enabled</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="py-2 px-4">{user.id}</td>
              <td className="py-2 px-4">{user.login}</td>
              <td className="py-2 px-4">{user.role}</td>
              <td className="py-2 px-4">{user.username}</td>
              <td className="py-2 px-4">{user.enabled ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
