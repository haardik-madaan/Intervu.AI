import InterviewForm from '@/components/InterviewForm';
import { getCurrentUser } from '@/lib/auth.action';
import React from 'react';

const page = async () => {
  const user = await getCurrentUser();
  return (
    <div className="flex justify-center items-center min-h-screen">
      <InterviewForm userId={user?.id} />
    </div>
  );
};

export default page;