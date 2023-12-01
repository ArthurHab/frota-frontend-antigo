'use client'

import axios from "axios"

import { useEffect, useState } from "react"
import { getCookies, setCookie, deleteCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation'
import NavigationMenu from '../components/NavigationMenu';
import LoadingMessage from '../components/LoadingMessage';
import UserTable from "../components/UserTable";


export default function Users(){
    
    const router = useRouter();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getUsers();
    }, [])

    function getUsers(){
        let token = getCookie('token');
        axios.get("http://localhost:8080/user",{
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
      <h2 className="text-2xl font-semibold mb-4">Lista de Usuários</h2>
      <UserTable users={data} />
    </div>
    </>
    )
}