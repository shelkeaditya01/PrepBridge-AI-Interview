"use client"
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { LoaderCircle } from 'lucide-react'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid';
import { uuid } from 'drizzle-orm/gel-core'
import { useUser } from '@clerk/nextjs'
import moment from 'moment/moment'
import { useRouter } from 'next/navigation';


function AddNewInterview() {
    const[openDialog,setOpenDialog]=useState(false);
    const[jobPosition,setJobPosition]=useState();
    const[jobDescription,setJobDescription]=useState();
    const[jobExperience,setJobExperience]=useState();
    const[loading,setLoading]=useState();
    const[jsonResponse,setJsonResponse]=useState([]);
    const{user}=useUser();
    const router=useRouter();

    const { GoogleGenAI } = require('@google/genai');

const onSubmit = async (e) => {
  setLoading(true);
  e.preventDefault();

  console.log(jobPosition, jobDescription, jobExperience);

  const inputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDescription}, Years of Experience: ${jobExperience}. Depend on this information give me ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions with answers in JSON format, give question & answers field on JSON`;

  let fullText = '';
  let cleanedText = '';
  let interviewQuestions = [];

  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    });

    const tools = [{ googleSearch: {} }];
    const config = {
      thinkingConfig: {
        thinkingBudget: -1,
      },
      tools,
    };

    const model = 'gemini-2.5-flash';
    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: inputPrompt,
          },
        ],
      },
    ];

    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    for await (const chunk of response) {
      if (chunk?.candidates?.[0]?.content?.parts?.[0]?.text) {
        fullText += chunk.candidates[0].content.parts[0].text;
      }
    }

    try {
      cleanedText = fullText.replace(/^```json\s*/, '').replace(/```$/, '');
      interviewQuestions = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('❌ Error parsing interview questions JSON:', parseError);
      console.log('Raw response:', fullText);
      setLoading(false);
      return;
    }

    setJsonResponse(cleanedText);

    console.log('Interview Questions & Answers (JSON format):', interviewQuestions);

    const resp = await db.insert(MockInterview).values({
      mockId: uuidv4(),
      jsonMockResp: cleanedText,
      jobPosition: jobPosition,
      jobDesc: jobDescription,
      jobExperience: jobExperience,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format('DD-MM-YYYY'), // fixed format
    }).returning({ mockId: MockInterview.mockId });

    console.log("Inserted ID:", resp);

    if(resp){
    setOpenDialog(false);
    router.push('/dashboard/interview/'+resp[0]?.mockId)
  }
  
  } catch (error) {
    console.error('❌ Error generating interview questions:', error);
  }

  setLoading(false);
};





  return (
    <div className='p-10 border rounded-lg bg-secondary hover:scale-100 hover:shadow-md cursor-pointer transition-all'
        onClick={()=>{setOpenDialog(true)}}>
      <div className='font-bold text-lg text-center'>
        + Add New
      </div>
      
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent>
                <DialogHeader>
                <DialogTitle className='font-bold text-2xl'>Tell Us More About Job You Are Interviewing ..</DialogTitle>
                <DialogDescription>
                    <form onSubmit={onSubmit}>
                        <div>
                            <h2>Add details about Job Position, Your Skill & Year of Experience</h2>

                            <div className='mt-4 my-8'>
                                <label className='mb-2'>Job Position</label>
                                <Input placeholder="Ex.Software Developer" required
                                onChange={(event)=>setJobPosition(event.target.value)}></Input>
                            </div>

                            <div className='mt-4 my-8'>
                                <label className='mb-2'>Job Description/Tech Stack</label>
                                <Textarea placeholder="Ex.React, Node, MongoDB, Flutter" required
                                onChange={(event)=>setJobDescription(event.target.value)}></Textarea>
                            </div>

                            <div className='mt-4 mb-6 my-8'>
                                <label className='mb-2'>Years of Experience</label>
                                <Input placeholder="Ex.1" type="number" required
                                onChange={(event)=>setJobExperience(event.target.value)}></Input>
                            </div>

                        </div>
                        <div className='flex gap-5 justify-end'>
                            <Button type="button" variant="ghost" onClick={()=>{setOpenDialog(false)}}>Cancel</Button>
                            <Button type="submit" className='bg-blue-500 text-white' variant="outline"
                                disabled={loading} 
                                >
                                    {loading?
                                    <>
                                    <LoaderCircle className='animate-spin'></LoaderCircle>Generating from AI ..
                                    </>:
                                    'Start Interview'}</Button>
                        </div>
                    </form>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default AddNewInterview
