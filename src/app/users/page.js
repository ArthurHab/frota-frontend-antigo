'use client'

// pages/Users.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation'
import NavigationMenu from '../components/NavigationMenu';
import LoadingMessage from '../components/LoadingMessage';
import UserTable from '../components/UserTable';
import UserFormModal from '../components/UserFormModal';
import Notification from '../components/Notification';

export default function Users() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleAbrirModal = () => {
    setModalAberto(true);
  };

  const handleFecharModal = () => {
    setModalAberto(false);
  };

  const addMessage = (text, type) => {
    setMessages([...messages, { text, type }]);
  };

  const removeMessage = (index) => {
    const updatedMessages = [...messages];
    updatedMessages.splice(index, 1);
    setMessages(updatedMessages);
  };

  const handleFinalizarCadastro = (data) => {
    let token = getCookie('token');
    axios
      .post('http://localhost:8080/auth/register', data, {headers: {
        Authorization: `Bearer ${token}`,
      }},)
      .then((response) => {
        getUsers();
        addMessage('Usuário cadastrado com sucesso!', 'success');
      })
      .catch((error) => {
        addMessage('Usuário já cadastrado no sistema!', 'error');
      });
    setModalAberto(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    let token = getCookie('token');
    axios
      .get('http://localhost:8080/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        router.push('/login');
      });
  }

  if (isLoading) {
    return <LoadingMessage />;
  }

  return (
    <>
      <NavigationMenu />
      <div className="bg-gray-100 min-h-screen p-8">
        <h2 className="text-2xl font-semibold mb-4">Lista de Usuários</h2>
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
        <UserTable users={data} onAdicionarVeiculo={handleAbrirModal}/>

        {/* Renderize o modal */}
        <UserFormModal isOpen={modalAberto} onClose={handleFecharModal} onFinalizarCadastro={handleFinalizarCadastro} />
      </div>
    </>
  );
}
