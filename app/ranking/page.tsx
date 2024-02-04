'use client'
import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import Header from "../components/Header";
import { useEffect, useState } from 'react';


export default function Home() {
  const [userList, setUserList]: any = useState([]);
  const  supabaseClient  = useSupabaseClient();
  

  useEffect(() => {
    async function fetchData() {
      let { data, error } : any = await supabaseClient 
      .from('users')
      .select('*')
      .order('score', { ascending: false }).limit(5)
      if (data && data.length > 0) {
        setUserList(data);
    }
      
    }
    fetchData();
  
  
  }, [supabaseClient]);

  return (
    <div className='
      bg-neutral-900
      rounded-lg
      h-full
      w-full
      overflow-hidden
      overflow-y-auto
    '>
      <Header>
        <div className="mb-2">
          <h1
            className="text-white text-3xl font-semibold"
          >
            Suba ao topo!
          </h1>
        </div>
      </Header>

      <div className="flex items-center justify-center mt-4">
        <div className=" rounded-md p-4 w-full sm:w-3/4 lg:w-2/3 xl:w-1/2" style={{ background: '#F5F5DC' }}>
          <table className="w-full">
            <thead>
              <tr className="text-black" > 
                <th className="text-center">Posição</th>
                <th className="text-center">Email</th>
                <th className="text-cen">Pontuação</th>
              </tr>
            </thead>
            <tbody className="text-center text-blue-800">
            {userList.map((user : any, index : any) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.email}</td>
                <td>{user.score}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
