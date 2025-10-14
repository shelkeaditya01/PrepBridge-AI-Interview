import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { Button } from '@/components/ui/button';
import { Mic } from 'lucide-react';
import { toast } from 'sonner';
import { GoogleGenAI } from '@google/genai';
import useSpeechToText from 'react-hook-speech-to-text';
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/db';
import { MockInterview, UserAnswer } from '@/utils/schema';
import moment from 'moment';
import { useRouter } from 'next/router';

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const { user }=useUser();
  const[loading,setLoading]=useState();

  const {
    error,
    interimResult,
    isRecording: speechIsRecording,
    results,
    setResults,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    // Update user answer dynamically with speech recognition results
    results.forEach((result) => {
      setUserAnswer((prevAns) => prevAns + result.transcript);
    });
  }, [results]);

  useEffect(()=>{
    if(!isRecording && userAnswer.length>10){
      updateUserAnswer();
    }
  },[userAnswer])

  const startStopRecording = async () => {
    if (speechIsRecording) {
      stopSpeechToText();

      }
    else {
      startSpeechToText();
    }
  };

  const updateUserAnswer= async ()=>{

    console.log(userAnswer);
    // Construct the prompt for the generative AI
      const feedbackPrompt = `
        Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, 
        User Answer: ${userAnswer},
        Based on the question and the user answer, please provide a rating (out of 5) and feedback on areas for improvement in 4-5 lines.
        Respond in JSON format with "rating" and "feedback" fields.
      `;

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
                text: feedbackPrompt,
              },
            ],
          },
        ];

        // Make the request to Gemini to generate feedback
        const response = await ai.models.generateContentStream({
          model,
          config,
          contents,
        });

        let fullText = '';
        for await (const chunk of response) {
          if (chunk?.candidates?.[0]?.content?.parts?.[0]?.text) {
            fullText += chunk.candidates[0].content.parts[0].text;
          }
        }

        // Clean and parse the response text
        const cleanedText = fullText.replace(/^```json\s*/, '').replace(/```$/, '');
        const parsedResponse = JSON.parse(cleanedText);

        // Set feedback and rating
        setFeedback(parsedResponse.feedback);
        setRating(parsedResponse.rating);

        // Log feedback and rating to console
        console.log(parsedResponse);
        // console.log('Answer Rating:', parsedResponse.rating);
        // console.log('Answer Feedback:', parsedResponse.feedback);

//         console.log("Interview data:", interviewData);
// console.log("Mock ID:", interviewData?.mockId);


//         console.log({
//   mockIdRef: interviewData?.mockId,
//   question: mockInterviewQuestion[activeQuestionIndex]?.question,
//   correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
//   userAns: userAnswer,
//   feedback: parsedResponse?.feedback,
//   rating: parsedResponse?.rating,
//   userEmail: user?.primaryEmailAddress?.emailAddress,
//   createdAt: moment().format('DD-MM-YYYY'),
// });


        const resp = await db.insert(UserAnswer).values({
              mockIdRef: interviewData?.mockId,
              question: mockInterviewQuestion[activeQuestionIndex]?.question,
              correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
              userAns: userAnswer,
              feedback: parsedResponse?.feedback,
              rating: parsedResponse?.rating,
              userEmail: user?.primaryEmailAddress?.emailAddress,
              createdAt: moment().format('DD-MM-YYYY'), // fixed format
        })

        if(resp){
          toast.success('Answer saved successfully!');
          setResults([]);
        }
        setResults([]);
        
  } 
  catch (error) {
        console.error('Error generating feedback:', error);
        toast.error('Failed to get feedback. Please try again.');
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
        onClick={startStopRecording}
      >
        {speechIsRecording ? (
          <span className="flex items-center gap-2 text-red-600">
            <Mic /> Stop Recording...
          </span>
        ) : (
          'Record Answer'
        )}
      </Button>

    </div>
  );
}

export default RecordAnswerSection;
