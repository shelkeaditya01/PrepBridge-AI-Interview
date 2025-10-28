"use client"
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/db'
import { eq } from 'drizzle-orm'
import { UserAnswer } from '@/utils/schema'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import NoDataFound from './NoDataFound'

function Feedback({ params }) {
    const [feedbackList, setFeedbackList] = useState();
    const router = useRouter();

    useEffect(() => {
        GetFeedback();
    }, []);

    const GetFeedback = async () => {
        const result = await db.select()
            .from(UserAnswer)
            .where(eq(UserAnswer.mockIdRef, params.interviewId))
            .orderBy(UserAnswer.id)
        console.log(result);
        setFeedbackList(result);
    }

    return (
        <div className='p-4 md:p-10'>
            {feedbackList?.length === 0 ?
                <NoDataFound /> :
                <>
                    <h2 className='text-2xl md:text-3xl font-bold text-green-500'>Congratulations !!🚀🚀</h2>
                    <h2 className='font-bold text-xl md:text-2xl mt-2'>Here is Your Interview Feedback.....</h2>
                    <h2 className='text-blue-600 text-base md:text-lg mt-2'>Your Rating: <strong>10/10.</strong></h2>
                    <h2 className='text-sm md:text-base font-bold text-gray-500 mt-2'>
                        Find all Interview Questions with AI-generated Answers, Your answers, Rating & Feedback for Improvement.
                    </h2>

                    {feedbackList && feedbackList.map((item, index) => (
                        <Collapsible className='mt-4 md:mt-10' key={index}>
                            <CollapsibleTrigger className='p-2 md:p-4 bg-secondary rounded flex justify-between my-2 text-left gap-4 md:gap-6 w-full'>
                                {item.question}
                                <ChevronsUpDown className='h-4 w-4 mt-1' />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className='flex flex-col gap-2 md:gap-4 p-2'>
                                    <h2 className='text-red-500 p-2 border rounded-lg text-sm md:text-base'><strong>Rating: </strong>{item.rating}.</h2>
                                    <h2 className='p-2 border rounded-lg bg-red-50 text-sm md:text-base text-red-800'><strong>Your Answer: </strong>{item.userAns}.</h2>
                                    <h2 className='p-2 border rounded-lg bg-green-50 text-sm md:text-base text-green-800'><strong>Correct Answer: </strong>{item.correctAns}.</h2>
                                    <h2 className='p-2 border rounded-lg bg-blue-50 text-sm md:text-base text-blue-800'><strong>Feedback: </strong>{item.feedback}.</h2>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    ))}
                </>
            }
            <div className='mt-6 md:mt-10'>
                <Button onClick={() => router.replace('/dashboard')} className='w-full md:w-auto cursor-pointer'>
                    Go Home
                </Button>
            </div>
        </div>
    )
}

export default Feedback
