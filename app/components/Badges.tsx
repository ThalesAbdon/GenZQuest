"use client";
import { FaMedal } from "react-icons/fa6";
import BadgesItem from "./BadgesItem";
import { useEffect, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";

const Badges = () => {
  const { supabaseClient } = useSessionContext();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const checkBadges = async () => {
      // const { data, error } = await supabaseClient
      //   .from('users')
      //   .select('*')
      //   .eq('id', (await supabaseClient.auth.getSession()).data.session?.user.id)
      //   .single();
        
      //   if (error) {
      //     console.warn('Usuário não está logado. Não é possível buscar dados.');
      //     setShouldRender(false); 
      //     return;
      //   }

      //   if((data.quiz1 || data.quiz2) || data.score >= 500){
      //     setShouldRender(true);
      //   }
    };

    checkBadges();

    // Adiciona um ouvinte para alterações no estado de autenticação
    const authListener = supabaseClient.auth.onAuthStateChange(() => {
      checkBadges();
    });

    // Limpa o ouvinte quando o componente é desmontado
    return () => {
      authListener.data.subscription.unsubscribe();
    };
  }, [supabaseClient]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <FaMedal className="text-neutral-400" size={26} />
          <p className="text-neutral-400 font-medium text-md">Suas Conquistas!</p>
        </div>
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3"></div>
      <div>{shouldRender && <BadgesItem />}</div>
    </div>
  );
};

export default Badges;
