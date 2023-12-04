'use client'
// components/Abastecimentos.js
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCookies, setCookie, deleteCookie, getCookie } from 'cookies-next';
import axios from 'axios';
import NavigationMenu from '../components/NavigationMenu';
import LoadingMessage from '../components/LoadingMessage';
import AbastecimentoTable from '../components/AbastecimentoTable';
import AbastecimentoFormModal from '../components/AbastecimentoModal';
import Notification from '../components/Notification';

export default function Abastecimentos() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [messages, setMessages] = useState([]);

  const addMessage = (text, type) => {
    setMessages([...messages, { text, type }]);
  };

  const removeMessage = (index) => {
    const updatedMessages = [...messages];
    updatedMessages.splice(index, 1);
    setMessages(updatedMessages);
  };

  const handleAbrirModal = () => {
    setModalAberto(true);
  };

  const handleFecharModal = () => {
    setModalAberto(false);
  };

  const handleFinalizarCadastro = (data) => {
    let token = getCookie('token');
    axios
      .post('http://localhost:8080/abastecimento/cadastro', data, {headers: {
        Authorization: `Bearer ${token}`,
      }},)
      .then((response) => {
        getAbastecimentos();
        addMessage('Abastecimento cadastrado com sucesso!', 'success');
      })
      .catch((error) => {
        console.log(error);
        addMessage('Veículo não encontrado!', 'error');
      });

      setModalAberto(false);
  }

  useEffect(() => {
    getAbastecimentos();
  }, []);

  function getAbastecimentos() {
    let token = getCookie('token');
    axios
      .get('http://localhost:8080/abastecimento', {
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
        <h2 className="text-2xl font-semibold mb-4">Lista de Abastecimentos</h2>
        <AbastecimentoTable abastecimentos={data} onAdicionarAbastecimento={handleAbrirModal}/>
        <AbastecimentoFormModal isOpen={modalAberto} onClose={handleFecharModal} onFinalizarCadastro={handleFinalizarCadastro} />
      </div>
    </>
  );
}
