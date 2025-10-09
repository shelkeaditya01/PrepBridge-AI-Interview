"use client"
import { MockInterview } from '@/utils/schema';
import React,{ useEffect, useState } from 'react'
import { db } from '@/utils/db';
import { eq } from 'drizzle-orm';
import Webcam from 'react-webcam';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function Interview({params}) {

    const [interviewData,setInterviewData]=useState();
    const[webCamEnabled,setWebCamEnabled]=useState(false);
    const[startingInterview,setStartingInterview]=useState("Start Interview");

    useEffect(() => {
      console.log(params.interviewId);
      getInterviewDetails();
      }, [])

    //   Getting Interview deatails from mockId or interviewId

      const getInterviewDetails=async()=>{
        const result=await db.select().from(MockInterview).where(eq(MockInterview.mockId,params.interviewId));
        setInterviewData(result[0]);
        console.log("InterviewData"+interviewData)
      }

  return (
    <div className='my-10'>
  <h2 className='font-bold text-2xl'>Let's go 🚀 ..</h2>

    <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
      
          {interviewData ? (
        <div className='flex flex-col my-5 gap-5'>
          
          <div className='flex flex-col my-5 gap-5 p-5 rounded-lg border'>
            <h2><strong>Job Role: </strong>{interviewData.jobPosition}</h2>
            <h2><strong>Job Description: </strong>{interviewData.jobDesc}</h2>
            <h2><strong>Experience: </strong>{interviewData.jobExperience} years</h2>
          </div>

          <div className='p-5 border rounded-lg border-yellow-400 bg-yellow-100'>
            <h2 className='flex gap-2 items-center text-yellow-800'><Lightbulb></Lightbulb><strong>Information</strong></h2>
            <h2 className='text-yellow-600 mt-6'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
          </div>
        </div>
      ) : (
        <div className="my-5 text-muted-foreground">Loading interview details...</div>
      )}

      <div className='mt-2.5'>
        {webCamEnabled ? (
          <Webcam
            onUserMedia={() => setWebCamEnabled(true)}
            onUserMediaError={() => setWebCamEnabled(false)}
            mirrored={true}
            style={{ height: 336, width: 1000, marginTop:46}}
          />
        ) : (
          <>
        <WebcamIcon className='h-80 w-full my-8 p-20 bg-secondary rounded-lg border' />
        <div className="flex justify-center mt-4">
                <Button className='px-13 cursor-pointer' variant="ghost" onClick={() => setWebCamEnabled(true)}>Enable Camera & Microphone</Button>
        </div>

          </>
        )}
      </div>

    </div>

      <div className='flex justify-end items-end'>
        <Link href={'/dashboard/interview/'+params.interviewId+'/start'}>
          <Button onClick={()=>{setStartingInterview("Starting....")}} className='hover:cursor-pointer'>{startingInterview}</Button>
        </Link>

      </div>

</div>

  )
}

export default Interview
