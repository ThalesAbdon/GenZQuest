// QuizModal.js
import { useSessionContext } from '@supabase/auth-helpers-react';
import React, { useState, useEffect, useRef } from 'react';

interface QuizModalProps {
  onClose: () => void;
}



const questions = [
  {
    question: 'Em que ano o Brasil foi descoberto pelos portugueses?',
    options: ['1500', '1492', '1600', '1822'],
    correctAnswer: '1500',
  },
  {
    question: 'Quem foi o primeiro imperador do Brasil?',
    options: ['Dom Pedro I', ' Dom Pedro II', 'Dom João VI', 'Getúlio Vargas'],
    correctAnswer: 'Dom Pedro I',
  },
  {
    question: 'Quem foi o líder da Revolta dos Malês, uma revolta de escravos muçulmanos na Bahia em 1835?',
    options: ['Tiradentes', 'Zumbi dos Palmares', 'Luís Gama', 'Manuel Congo'],
    correctAnswer: 'Manuel Congo',
  },
  {
    question: 'Em que ano o Brasil se tornou uma república?',
    options: ['1889', '1822', '1500', '1964'],
    correctAnswer: '1889',
  },
  {
    question: 'Qual foi a primeira capital do Brasil colonial?',
    options: ['Rio de Janeiro', 'São Paulo', 'Recife', 'Salvador'],
    correctAnswer: 'Salvador',
  },
];

const QuizModal: React.FC<QuizModalProps> = ({ onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [quiz1, setQuiz1] = useState(false);
  const [badge1, setBadge1] = useState(false);
  const [timer, setTimer] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);
  const { supabaseClient } = useSessionContext();
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!quizCompleted) {
      timerIntervalRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [currentQuestion, quizCompleted]);

  useEffect(() => {
    if (quizCompleted) {
      setQuiz1(true)
      setBadge1(true)
    }

  }, [quizCompleted, score, timer]);



  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    setSelectedOption('');
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);

    if (currentQuestion === questions.length - 1) {
      setQuizCompleted(true);
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }
  };


  const handleCloseClick = async() => {
    
      const getSession = JSON.parse(localStorage.getItem("session") as string)

      let totalScore = ((score * 100) - timer)
      if(totalScore <= 0){
        totalScore = 0
      } 

      
      const { data, error } : any = await supabaseClient 
      .from('users')
      .select('score,email')
      .eq('id', getSession.user.id)
      .single()
      
      const setEmail = (await supabaseClient.auth.getSession()).data.session?.user.email
      if(data.email == null){
        console.log(setEmail)
        await supabaseClient.from('users').update({email: setEmail}).eq('id', getSession.user.id)
      }

      await supabaseClient 
        .from('users')
        .update({ score: data.score + (totalScore), quiz1: quiz1, badge1: badge1})
        .eq('id', getSession.user.id)
  
    setModalVisible(false);
    onClose();
  };

  return (
    <div className={`fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center ${modalVisible ? '' : 'hidden'}`}>
      <div
        className="p-8 rounded-md w-96 text-black bg-beige shadow-lg"
        style={{ background: '#F5F5DC' }}
      >
        <h2 className="text-xl mb-4">Quiz</h2>
        {currentQuestion < questions.length ? (
          <>
            <p className="mb-4">{questions[currentQuestion].question}</p>
            <div className="mb-4">
              <p>Tempo: {timer} segundos</p>
            </div>
            <ul>
              {questions[currentQuestion].options.map((option, index) => (
                <li
                  key={index}
                  className={`cursor-pointer flex items-center ${
                    selectedOption === option ? 'bg-blue-200' : ''
                  } mb-2 p-2 rounded-md`}
                  onClick={() => handleOptionClick(option)}
                >
                  <div className="w-4 h-4 border border-black rounded-full mr-2 flex items-center justify-center">
                    {selectedOption === option ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="red"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    ) : null}
                  </div>
                  {option}
                </li>
              ))}
            </ul>
            <button
              onClick={handleNextQuestion}
              disabled={!selectedOption}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
            >
              Próxima Pergunta
            </button>
          </>
        ) : (
          <>
            <p>Parabéns! Você completou o quiz.</p>
            <p>Sua pontuação: {(score * 100) - timer <= 0 ? 0 : (score * 100) - timer}</p>
            <div className="text-center">
              <button onClick={handleCloseClick} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
                Ok!
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizModal;
