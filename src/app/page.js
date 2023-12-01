"use client"

import axios from 'axios'
import { useEffect, useState } from 'react';
import { getCookies, setCookie, deleteCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation'
import NavigationMenu from './components/NavigationMenu';
import LoadingMessage from './components/LoadingMessage';

export default function Home() {

  const router = useRouter();
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
          console.log(response.data)
          setIsLoading(false);
      })
      .catch((error) => {
          router.push("/login");
      });
}

if(isLoading){
  return(<LoadingMessage/>)
}

  return (
    <main>
      <NavigationMenu/>
    </main>
  )
}
