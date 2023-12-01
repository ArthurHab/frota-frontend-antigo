// components/AbastecimentoTable.js
import React from 'react';
import { FaPlus } from 'react-icons/fa';

const AbastecimentoTable = ({ abastecimentos, onAdicionarVeiculo }) => {
  return (
    <div className="overflow-x-auto">
        <div className="flex justify-end mb-4">
        <button
          onClick={onAdicionarVeiculo}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
        >
          <FaPlus className="w-4 h-4 mr-2" />
          Adicionar Abastecimento
        </button>
      </div>
      <table className="min-w-full border border-gray-300 divide-y divide-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 font-semibold text-left">ID Abastecimento</th>
            <th className="py-2 px-4 font-semibold text-left">Veículo</th>
            <th className="py-2 px-4 font-semibold text-left">Litros</th>
            <th className="py-2 px-4 font-semibold text-left">Quilometragem</th>
            <th className="py-2 px-4 font-semibold text-left">Data de Criação</th>
            <th className="py-2 px-4 font-semibold text-left">Data de Atualização</th>
          </tr>
        </thead>
        <tbody>
          {abastecimentos.map((abastecimento) => (
            <tr key={abastecimento.idAbasteciemento} className="hover:bg-gray-50">
              <td className="py-2 px-4">{abastecimento.idAbasteciemento}</td>
              <td className="py-2 px-4">{abastecimento.veiculo.modelo}</td>
              <td className="py-2 px-4">{abastecimento.litros}</td>
              <td className="py-2 px-4">{abastecimento.km}</td>
              <td className="py-2 px-4">{abastecimento.created_at}</td>
              <td className="py-2 px-4">{abastecimento.updated_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AbastecimentoTable;
