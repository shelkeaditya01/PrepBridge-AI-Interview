import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {
  const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text)
      window.speechSynthesis.speak(speech)
    } else {
      alert('Sorry, your browser does not support Text to Speech!')
    }
  }

  return (
    mockInterviewQuestion?.length > 0 && (
      <div className="mt-13 p-5 border rounded-lg">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {mockInterviewQuestion.map((question, indexx) => (
            <h2
              key={indexx}
              className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer transition-all
                ${activeQuestionIndex === indexx ? 'bg-blue-600 text-green-800 text-2xl font-bold' : ''}`}
            >
              Question #{indexx + 1}
            </h2>
          ))}
        </div>

        <h2 className="my-5 text-md md:text-lg">
          {mockInterviewQuestion[activeQuestionIndex]?.question}
        </h2>

        <Volume2
          className="cursor-pointer"
          onClick={() =>
            textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)
          }
        />

        <div className="border rounded-lg p-5 border-blue-400 bg-blue-100 mt-8">
          <h2 className="flex gap-2 items-center text-blue-600">
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className="text-blue-500 mt-2">
            {process.env.NEXT_PUBLIC_QUESTION_NOTE}
          </h2>
        </div>
      </div>
    )
  )
}

export default QuestionsSection
