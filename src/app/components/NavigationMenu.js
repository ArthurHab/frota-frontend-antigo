// components/Navbar.js
import React from 'react';
import { FaUsers, FaCar, FaGasPump, FaSignOutAlt } from 'react-icons/fa';
import Link from 'next/link';
import { getCookies, setCookie, deleteCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation'

const NavigationMenu = () => {

  const router = useRouter();

  function onLogout(){
    deleteCookie('token');
    router.push('/login');
  }

  return (
    <nav className="bg-gray-800 text-white p-4 flex items-center justify-between">
      {/* Título à esquerda */}
      <h1 className="text-2xl font-semibold">Controle de Frota</h1>

      {/* Itens de navegação à direita */}
      <ul className="flex space-x-4">
        <li>
          <Link href="/users">
            <div className="flex flex-col items-center">
              <FaUsers className="w-5 h-5 mb-1" />
              Usuários
            </div>
          </Link>
        </li>
        <li>
          <Link href="/veiculos">
            <div className="flex flex-col items-center">
              <FaCar className="w-5 h-5 mb-1" />
              Veículos
            </div>
          </Link>
        </li>
        <li>
          <Link href="/abastecimentos">
            <div className="flex flex-col items-center">
              <FaGasPump className="w-5 h-5 mb-1" />
              Abastecimentos
            </div>
          </Link>
        </li>

        {/* Botão de Logout */}
        <li>
          <button
            onClick={onLogout}
            className="flex flex-col items-center cursor-pointer"
          >
            <FaSignOutAlt className="w-5 h-5 mb-1" />
            <span className="text-xs">Logout</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationMenu;
