"use client"
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import { desc } from 'drizzle-orm';
import InterviewItemCard from './InterviewItemCard';


function InterviewList() {

    const{user}=useUser();
    const[interviewList,setInterviewList]=useState();

    useEffect(()=>{
        user && GetInterviewList();
    },[user])

    const GetInterviewList=async()=>{
        const result=await db.select()
        .from(MockInterview)
        .where(eq(MockInterview.createdBy,user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(MockInterview.id))

        console.log(result);
        setInterviewList(result);
    }

  return (
    <div>
      <h2 className='font-bold text-xl my-10'>Previous Interviews</h2>

      <div className='grid grid-cols-1 md: grid-cols-2 lg: grid-cols-3 gap-6'>
        {interviewList && interviewList.map((interview,index)=>(
            <InterviewItemCard key={index}
                                interview={interview}></InterviewItemCard>
        ))}
      </div>
    </div>
  )
}

export default InterviewList
