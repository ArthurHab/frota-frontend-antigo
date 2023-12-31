// components/VeiculoTable.js
import React from 'react';
import { FaPlus } from 'react-icons/fa';

const VeiculoTable = ({ veiculos, onAdicionarVeiculo }) => {
  return (
    <div className="overflow-x-auto">
      <div className="flex justify-end mb-4">
        <button
          onClick={onAdicionarVeiculo}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
        >
          <FaPlus className="w-4 h-4 mr-2" />
          Adicionar Veículo
        </button>
      </div>
      <table className="min-w-full border border-gray-300 divide-y divide-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 font-semibold text-left">ID</th>
            <th className="py-2 px-4 font-semibold text-left">Placa</th>
            <th className="py-2 px-4 font-semibold text-left">Marca</th>
            <th className="py-2 px-4 font-semibold text-left">Modelo</th>
            <th className="py-2 px-4 font-semibold text-left">Ano Fabricado</th>
            <th className="py-2 px-4 font-semibold text-left">Consumo (km/l)</th>
            <th className="py-2 px-4 font-semibold text-left">Valor</th>
            <th className="py-2 px-4 font-semibold text-left">Quilometragem</th>
          </tr>
        </thead>
        <tbody>
          {veiculos.map((veiculo) => (
            <tr key={veiculo.idVeiculo} className="hover:bg-gray-50">
              <td className="py-2 px-4">{veiculo.idVeiculo}</td>
              <td className="py-2 px-4">{veiculo.placa}</td>
              <td className="py-2 px-4">{veiculo.marca}</td>
              <td className="py-2 px-4">{veiculo.modelo}</td>
              <td className="py-2 px-4">{veiculo.ano_fabricado}</td>
              <td className="py-2 px-4">{veiculo.consumo}</td>
              <td className="py-2 px-4">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(veiculo.valor)}</td>
              <td className="py-2 px-4">{veiculo.km} km</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VeiculoTable;