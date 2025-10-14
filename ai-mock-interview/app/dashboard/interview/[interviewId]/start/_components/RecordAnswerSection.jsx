import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { Button } from '@/components/ui/button';
import { Mic } from 'lucide-react';
import { toast } from 'sonner';
import { GoogleGenAI } from '@google/genai';
import useSpeechToText from 'react-hook-speech-to-text';

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex }) {
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const {
    error,
    interimResult,
    isRecording: speechIsRecording,
    results,
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

  const saveUserAnswer = async () => {
    if (speechIsRecording) {
      stopSpeechToText();
      if (userAnswer.length < 10) {
        toast('Error while saving your answer, please record again!');
        return;
      }

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
        console.log('Answer Rating:', parsedResponse.rating);
        console.log('Answer Feedback:', parsedResponse.feedback);

        toast.success('Answer saved successfully!');
      } catch (error) {
        console.error('Error generating feedback:', error);
        toast.error('Failed to get feedback. Please try again.');
      }
    } else {
      startSpeechToText();
    }
  };

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
        {speechIsRecording ? (
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
          console.log(userAnswer);
        }}
      >
        Show User Answer
      </Button>

      {/* Display Feedback & Rating */}
      {feedback && rating !== null && (
        <div className="mt-6 text-center">
          <h3 className="font-semibold text-xl">Feedback</h3>
          <p className="text-lg">{feedback}</p>
          <div className="mt-2">
            <span className="text-lg font-bold">Rating: {rating}/5</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecordAnswerSection;
