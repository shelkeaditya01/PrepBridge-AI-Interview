import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import Image from 'next/image'
import useSpeechToText from 'react-hook-speech-to-text'
import { Button } from '@/components/ui/button'
import { Mic } from 'lucide-react'
import { toast } from 'sonner'
import { ChatSession } from '@google/generative-ai'
import { GoogleGenerativeAI } from '@google/generative-ai'


function RecordAnswerSection({mockInterviewQuestion,activeQuestionIndex}) {
  const [userAnswer, setUserAnswer] = useState('')

  

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  })

  useEffect(() => {
    results.forEach((result) => {
      setUserAnswer((prevAns) => prevAns + result.transcript)
    })
  }, [results])

  const saveUserAnswer=async()=>{
    if(isRecording){
      stopSpeechToText();
      if(userAnswer.length<10){
        toast('Error while saving your answer, please record again!')
        return;
      }

      const feedbackPrompt="Question: "+mockInterviewQuestion[activeQuestionIndex]?.question+", User Answer: "+userAnswer+", deepends on question & user answer for given interview question please give us rating for answer & feedback as area of improvement if any in just 4 to 5 lines to improve it in JSON format with rating field & feedback field";
      console.log(feedbackPrompt);
      const result=await chatSession.sendMessage(feedbackPrompt);

      const mockJsonResp=(result.response.text()).replace('```json','').replace('```','');
      console.log(mockJsonResp);
    }
    else{
        startSpeechToText();
    }
  }

  return (
    <div className="flex items-center justify-center flex-col mt-20">
      <div className="flex flex-col justify-center items-center bg-gray-100 rounded-lg p-5 relative">
        
        {/* Optional background image */}
        <img
          src={'/WebCam.png'}
          width={400}
          height={400}
          className="absolute opacity-40"
          alt="Webcam background"
        />

        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: '100%',
            maxWidth: 400,
            zIndex: 10,
          }}
        />
      </div>

      {/* Record Button */}
      <Button
        variant="outline"
        className="mt-5 mb-2 cursor-pointer"
        onClick={saveUserAnswer}
      >
        {isRecording ? (
          <span className="flex items-center gap-2 text-red-600">
            <Mic /> Stop Recording...
          </span>
        ) : (
          'Record Answer'
        )}
      </Button>

      {/* Show Answer Button */}
      <Button
        className="cursor-pointer"
        onClick={() => {
          console.log(userAnswer)
        }}
      >
        Show User Answer
      </Button>

    </div>
  )
}

export default RecordAnswerSection
