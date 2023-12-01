// components/AbastecimentoFormModal.js
import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';

const AbastecimentoFormModal = ({ isOpen, onClose, onFinalizarCadastro }) => {
  const [abastecimentoData, setAbastecimentoData] = useState({
    veiculoId: '',
    litros: '',
    km: '',
  });

  const [nomesVeiculos, setNomesVeiculos] = useState([]);

  useEffect(() => {
    // Carrega a lista de nomes de veículos da API ao montar o componente
    getNomesVeiculos();
  }, []);

  const getNomesVeiculos = () => {
    // Substitua a URL pela sua API de nomes de veículos
    axios.get('SUA_API_AQUI')
      .then((response) => {
        setNomesVeiculos(response.data);
      })
      .catch((error) => {
        console.error('Erro ao obter nomes de veículos', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAbastecimentoData((prevAbastecimentoData) => ({
      ...prevAbastecimentoData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    
    onFinalizarCadastro();
  };
  

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${isOpen ? 'visible' : 'invisible'}`}>
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500">
            <FaTimes />
          </button>
        </div>
        <h1 className="text-2xl font-semibold mb-4">Cadastro de Abastecimento</h1>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Selecione um veículo</label>
          <select
            name="veiculoId"
            value={abastecimentoData.veiculoId}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="" disabled>
              Selecione um veículo
            </option>
            {nomesVeiculos.map((veiculo) => (
              <option key={veiculo.id} value={veiculo.id}>
                {veiculo.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Litros</label>
          <input
            type="text"
            name="litros"
            value={abastecimentoData.litros}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Quilometragem</label>
          <input
            type="text"
            name="km"
            value={abastecimentoData.km}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Finalizar Cadastro
        </button>
      </div>
    </div>
  );
};

export default AbastecimentoFormModal;
