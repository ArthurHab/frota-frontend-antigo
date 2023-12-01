'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"
import { getCookies, setCookie, deleteCookie, getCookie } from 'cookies-next';
import axios from 'axios';
import NavigationMenu from '../components/NavigationMenu';
import LoadingMessage from '../components/LoadingMessage';
import AbastecimentoTable from '../components/AbastecimentoTable';

export default function Abastecimentos(){

    const router = useRouter();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getAbastecimentos();
    }, [])

    function getAbastecimentos(){
        let token = getCookie('token');
        axios.get("http://localhost:8080/abastecimento",{
            headers: {
                'Authorization': `Bearer ${token}`,
              },
        })
            .then((response) => {
                setData(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                router.push("/login");
            });
    }

    if(isLoading){
        return(<LoadingMessage/>)
    }

    return(
    <>  
        <NavigationMenu/>
        <div className="bg-gray-100 min-h-screen p-8">
        <h2 className="text-2xl font-semibold mb-4">Lista de Abastecimentos</h2>
        <AbastecimentoTable abastecimentos={data}/>
    </div>
    </>)
}