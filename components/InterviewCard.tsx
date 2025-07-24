'use client'
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';
import { getRandomInterviewCover } from '@/lib/utils';
import Link from 'next/link';
import { Button } from './ui/button';
import DisplayTechIcons from './DisplayTechIcons';
import { GetFeedbackByInterviewId } from '@/lib/general.action';
import { useRouter } from 'next/navigation';

interface InterviewCardProps {
  id: string;
  userId?: string;
  role: string;
  type: string;
  techstack: string[];
  createdAt?: string;
}

const InterviewCard = ({id, userId, role, type, techstack, createdAt}: InterviewCardProps) => {
    const [feedback, setFeedback] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        let ignore = false;
        async function fetchFeedback() {
            if (userId && id) {
                const result = await GetFeedbackByInterviewId({ interviewId: id, userId });
                if (!ignore) setFeedback(result);
            }
        }
        fetchFeedback();
        return () => { ignore = true; };
    }, [id, userId]);

    const normalizedType = /mix/gi.test(type) ? 'Mixed' : type;
    const formattedDDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format('MMM D, YYYY');
    return (
        <div className='card-border h-full flex flex-col'>
            <div className='card-interview flex-1 flex flex-col justify-between h-full'>
                <div className='absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600'>
                    <p className='badge-text'>{normalizedType}</p>
                </div>
                <Image src={getRandomInterviewCover()} alt="cover-image" width={90} height={90} className='rounded-full object-fit size-[90px]'/>
                <h3 className='mt-5 capitalize'>
                    {role} Interview
                </h3>
                <div className='flex flex-row gap-5 mt-3'>
                    <div className='flex flex-row gap-2'>
                        <Image src="/calendar.svg" alt="calendar" width={22} height={22}/>
                        <p>{formattedDDate}</p>
                    </div>
                    <div className='flex flex-row gap-2 items-center'>
                        <Image src ="/star.svg" alt='star' width={22} height={22}/>
                        <p>{feedback?.totalscore || '---'}/100</p>
                    </div>
                </div>
                <p className='line-clamp-2 mt-5'>
                    {feedback?.finalAssessment || "You haven't taken the the interview yet. Take it to improve your skills."}
                </p>
            </div>
            <div className='flex flex-row justify-between items-center gap-2'>
                <DisplayTechIcons techStack={techstack}/>
                <div className="flex gap-2">
                    <Button className="btn-primary">
                        <Link href={feedback ? `/interview/${id}/feedback` : `/interview/${id}`}>
                        {feedback ? 'Check Feedback' : 'View Interview'}
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default InterviewCard;