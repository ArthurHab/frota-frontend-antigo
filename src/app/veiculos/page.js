'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import { getCookies, setCookie, deleteCookie, getCookie } from 'cookies-next';
import axios from 'axios';
import NavigationMenu from '../components/NavigationMenu';
import LoadingMessage from '../components/LoadingMessage';
import VeiculoTable from '../components/VeiculoTable';

export default function Veiculos(){

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

    useEffect(() => {
        getVeiculos();
    }, [])

    function getVeiculos(){
        let token = getCookie('token');
        axios.get("http://localhost:8080/veiculo",{
            headers: {
                'Authorization': `Bearer ${token}`,
              },
        })
            .then((response) => {
                setData(response.data)
                setIsLoading(false);
            })
            .catch((error) => {
                router.push("/login");
            });
    }

    if(isLoading){
        return(<LoadingMessage/>)
    }

    return(<>
        <NavigationMenu/>
        <div className="bg-gray-100 min-h-screen p-8">
        <h2 className="text-2xl font-semibold mb-4">Lista de Veículos</h2>
        <VeiculoTable veiculos={data} onAdicionarVeiculo={handleAbrirModal}/>
    </div>
    </>)
}