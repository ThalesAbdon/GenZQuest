'use client';
import React, { useState } from 'react';
import Image from "next/image"
import PlayButton from './PlayButton';
import Quiz1Modal from './Quiz1Modal';
import { useUser } from '@supabase/auth-helpers-react';
import useAuthModal from '@/hooks/useAuthModal';

const QuizItem = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const user = useUser()
    const authModal = useAuthModal()

    const handleItemClick = () => {
        if(!user){
            return authModal.onOpen()
        }
        setModalOpen(true);

    };

    const closeQuizModal = () => {
        setModalOpen(false);
    };

    return ( 
        <div
            onClick={handleItemClick}
            className="
                relative
                group
                flex
                flex-col
                items-center
                justify-center
                rounded-md
                overflow-hidden
                gap-x-4
                bg-neutral-400/5
                cursor-pointer
                hover:bg-neutral-400/10
                transition
                p-3

            "
        >
            <div
                className='
                    relative
                    aspect-square
                    w-full
                    h-full
                    rounded-md
                    overflow-hidden
                '
            >
                <Image 
                    className="object-cover"
                    src="/images/historia.jpg"
                    fill
                    alt='Imagem do quizz'
                />
            </div>
            <div className='flex flex-col items-center w-full pt-2 gap-y-1'>
                <p className='font-semibold truncate w-full text-center'>
                    História
                </p>
            </div>
            <div className='
                absolute
                bottom-16
                right-5
            '>
                <PlayButton />
            </div>

            {isModalOpen && (
                <Quiz1Modal onClose={closeQuizModal} />
            )}
        </div>
    );
}

export default QuizItem;
