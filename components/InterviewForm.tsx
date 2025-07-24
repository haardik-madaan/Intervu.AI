'use client'

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import FormField from './FormField';
import Image from 'next/image';
import { Input } from '@/components/ui/input';

const interviewSchema = z.object({
  role: z.string().min(2, 'Role is required'),
  level: z.string().min(2, 'Level is required'),
  type: z.string().min(2, 'Type is required'),
  techstack: z.string().min(2, 'Tech stack is required'),
  amount: z.coerce.number().min(1).max(20),
});

type InterviewFormValues = z.infer<typeof interviewSchema>;

const defaultValues: InterviewFormValues = {
  role: 'Frontend Developer',
  level: 'Junior',
  type: 'Technical',
  techstack: 'React,Node.js',
  amount: 5,
};

const InterviewForm = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const form = useForm<InterviewFormValues>({
    resolver: zodResolver(interviewSchema),
    defaultValues,
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (values: InterviewFormValues) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/vapi/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, userid: userId }),
      });
      const data = await res.json();
      if (res.ok && data.success && data.id) {
        router.push(`/interview/${data.id}`);
      } else {
        setError(data.error || 'Failed to generate interview.');
      }
    } catch (err) {
      setError('Failed to generate interview.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-border lg:min-w-[556px]">
      <div className="flex flex-col gap-6 card py-14 px-10 items-center">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">PrepWise</h2>
        </div>
        <h3>Generate a New Interview</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full space-y-6 mt-4 form">
            <FormField control={form.control} name="role" label="Role" placeholder="e.g. Frontend Developer" description="The job role for the interview." />
            <FormField control={form.control} name="level" label="Level" placeholder="e.g. Junior" description="The experience level for the interview (Junior, Mid, Senior)." />
            <FormField control={form.control} name="type" label="Type" placeholder="e.g. Technical" description="Type of interview (Technical, Behavioural, Mixed)." />
            <FormField control={form.control} name="techstack" label="Tech Stack" placeholder="e.g. React,Node.js" description="Comma separated technologies for the interview." />
            <FormField control={form.control} name="amount" label="Number of Questions" placeholder="e.g. 5" description="How many questions to generate (1-20)." type="number" />
            <Button className="btn" type="submit" disabled={loading}>{loading ? 'Generating...' : 'Generate Interview'}</Button>
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default InterviewForm; 