'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import InterviewCard from '@/components/InterviewCard'
import { getInterviewsByUserId, getLatestInterviews } from '@/lib/general.action'
import { getCurrentUser } from '@/lib/auth.action'

const HomePage = () => {
    const [userInterviews, setUserInterviews] = useState([]);
    const [latestInterviews, setLatestInterviews] = useState([]);
    const [user, setUser] = useState(null);
    useEffect(() => {
        async function fetchData() {
            const user = await getCurrentUser();
            setUser(user);
            const [userInterviews, latestInterviews] = await Promise.all([
                getInterviewsByUserId(user?.id),
                getLatestInterviews({ userId: user?.id })
            ]);
            setUserInterviews(userInterviews || []);
            setLatestInterviews(latestInterviews || []);
        }
        fetchData();
    }, []);

    const handleDelete = (id) => {
        setUserInterviews((prev) => prev.filter((interview) => interview.id !== id));
        setLatestInterviews((prev) => prev.filter((interview) => interview.id !== id));
    };

    const hasPastInterviews = userInterviews.length > 0;
    const hasUpcomingInterviews = latestInterviews.length > 0;
    return (
        <>
            <section className='card-cta mb-8'>
                <div className='flex flex-col gap-6 max-w-lg'>
                    <h2>Get Interview ready with AI Powered Mock Interviews at Intervu.AI </h2>
                    <p className="text-lg">
                        Practice on real interview problems and get instant feedback
                    </p>
                    <Button asChild className='btn-primary max-sm:w-full'>
                        <Link href="/interview">Start an interview</Link>
                    </Button>
                </div>
                <Image src ="/robot.png" alt= "robo-dude" width={400} height={400} className="max-sm:hidden"/>
            </section>
            <section className='flex flex-col gap-6 mt-8 mb-8'>
                <h2>Your Interviews</h2>
                <div className='interviews-section'>
                    {hasPastInterviews ? (
                        userInterviews.map((interview) => (
                            <InterviewCard {...interview} key={interview.id} onDelete={handleDelete} />
                        ))):(
                            <p>You haven&apos;t taken any interviews yet!</p> 
                        )}
                </div>
            </section>
            <section className='flex flex-col gap-6 mt-8 mb-8'>
                <h2>Take an Interview</h2>
                <div className='interviews-section'>
                {hasUpcomingInterviews ? (
                        latestInterviews.map((interview) => (
                            <InterviewCard {...interview} key={interview.id} onDelete={handleDelete} />
                        ))):(
                            <p>There are no new interviews available now!</p> 
                        )}
                </div>
            </section>
        </>
    )
}

export default HomePage