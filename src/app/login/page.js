'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import Notification from '../components/Notification';

// Componente de Mensagem

export default function Login() {
  const router = useRouter();
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [messages, setMessages] = useState([]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const addMessage = (text, type) => {
    setMessages([...messages, { text, type }]);
  };

  const removeMessage = (index) => {
    const updatedMessages = [...messages];
    updatedMessages.splice(index, 1);
    setMessages(updatedMessages);
  };

  const tryLogin = () => {
    axios
      .post('http://localhost:8080/auth/login', {
        login: userName,
        password: password,
      })
      .then((response) => {
        setCookie('token', response.data.token);
        addMessage('Login realizado com sucesso!', 'success');
        router.push('/users');
      })
      .catch((error) => {
        addMessage('Usuário não cadastrado!', 'error');
        console.log(error);
      });
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        
        <div className='absolute top-10 right-4'>
          {messages.map((message, index) => (
            <Notification
              key={index}
              text={message.text}
              type={message.type}
              onRemove={() => removeMessage(index)}
            />
          ))}
        </div>

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
      </div>
    </div>
  );
}
