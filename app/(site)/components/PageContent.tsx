"use client"
import QuizItem from '@/app/components/QuizItem';
import QuizItem2 from '@/app/components/QuizItem2';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const PageContent = () => {
  const { supabaseClient } = useSessionContext();
  const [quizData, setQuizData] = useState(false);
  const [quizData2, setQuizData2] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  useEffect(() => {  
    async function fetchData() {
      const session = await supabaseClient.auth.getSession();
      const userId = session.data.session?.user.id;
      if (!userId) {
        console.warn('Usuário não está logado. Não é possível buscar dados.');
        setShouldRender(true); 
        return;
      }
      const { data, error } = await supabaseClient 
        .from('users')
        .select('quiz1,quiz2')
        .eq('id', userId);
      
       
      if (error) {
        console.error('Error fetching data:', 'você precisa logar!');
      } else {
        setQuizData(data.length > 0 ? data[0].quiz1 : false);
        setQuizData2(data.length > 0 ? data[0].quiz2 : false);
        setShouldRender(true);
      }
    }

    fetchData();
  }, [supabaseClient]);

  return ( 
    <div
      className="
        grid
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-8
        gap-4
        mt-4
      "
    >
      {shouldRender && !quizData && <QuizItem />}
      {shouldRender && !quizData2 && <QuizItem2 />}
    </div>
  );
}

export default PageContent;
