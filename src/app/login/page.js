'use client'
// pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import Notification from '../components/Notification';

export default function Login() {
  
  const router = useRouter();

  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const tryLogin = () => {
    axios
      .post('http://localhost:8080/auth/login', {
        login: userName,
        password: password,
      })
      .then((response) => {
        setCookie('token', response.data.token);
        router.push('/users');
      })
      .catch((error) => {
        setErrors((prevErrors) => [...prevErrors, 'Usuário não cadastrado!']);
      });
  };

  const closeNotification = () => {
    setErrors([]);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Username</label>
          <input
            type="text"
            value={userName}
            onChange={handleUsernameChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <button
          onClick={tryLogin}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Acessar
        </button>

        {/* Mostrar a notificação de erro */}
        {errors.length > 0 && <Notification messages={errors} onClose={closeNotification} />}
      </div>
    </div>
  );
}
