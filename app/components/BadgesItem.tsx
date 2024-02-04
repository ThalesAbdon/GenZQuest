/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { useEffect, useState } from "react";
import BadgeFirstQuiz from "./BadgeFirstQuiz";
import BadgeToTheTop from "./BadgeToTheTop";
import { useSessionContext } from "@supabase/auth-helpers-react";

const BadgesItem = () => {
  const { supabaseClient } = useSessionContext();
  const [shouldRenderFirstQuiz, setShouldRenderFirstQuiz] = useState(false);
  const [shouldRenderToTheTop, setShouldRenderToTheTop] = useState(false);
  useEffect(() => {
    async function checkBadges(){
      const { data } : any = await supabaseClient 
      .from('users')
      .select('*')
      .eq('id', (await supabaseClient.auth.getSession()).data.session?.user.id)
      .single()

      if (data.quiz1 || data.quiz2) {
        setShouldRenderFirstQuiz(true);
      }

      if(data.score >= 500){
        setShouldRenderToTheTop(true)
      }

    } 
    checkBadges()
  }, [supabaseClient]);

  return (
    <div className="flex flex-col border-2 rounded-md border-[#66a0e2] p-4 mb-2">
      {shouldRenderFirstQuiz && <BadgeFirstQuiz />}
      {shouldRenderToTheTop && <BadgeToTheTop />}
    </div>
  );
 }
export default BadgesItem
