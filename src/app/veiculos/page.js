'use client'

// pages/veiculos.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { getCookies, setCookie, deleteCookie, getCookie } from 'cookies-next';
import NavigationMenu from '../components/NavigationMenu';
import LoadingMessage from '../components/LoadingMessage';
import VeiculoTable from '../components/VeiculoTable';
import VeiculoFormModal from '../components/VeiculoModal';


export default function Veiculos() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);

  const handleAbrirModal = () => {
    setModalAberto(true);
  };

  const handleFecharModal = () => {
    setModalAberto(false);
  };

  const handleFinalizarCadastro = () => {
    // Lógica para atualizar a lista de veículos após o cadastro
    getVeiculos();
    // Fechar o modal após finalizar o cadastro
    handleFecharModal();
  };

  useEffect(() => {
    getVeiculos();
  }, [])

  const getVeiculos = () => {
    let token = getCookie('token');
    axios
      .get('http://localhost:8080/veiculo', {
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
  };

  if (isLoading) {
    return <LoadingMessage />;
  }

  return (
    <>
      <NavigationMenu />
      <div className="bg-gray-100 min-h-screen p-8">
        <h2 className="text-2xl font-semibold mb-4">Lista de Veículos</h2>
        <VeiculoTable veiculos={data} onAdicionarVeiculo={handleAbrirModal} />
        <VeiculoFormModal isOpen={modalAberto} onClose={handleFecharModal} onFinalizarCadastro={handleFinalizarCadastro} />
      </div>
    </>
  );
}
