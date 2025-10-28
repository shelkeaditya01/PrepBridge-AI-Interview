import { Button } from '@/components/ui/button'
import { Link } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

function InterviewItemCard({ interview }) {

  const router=useRouter();

  const onStart=()=>{
    router.push('/dashboard/interview/'+interview?.mockId)
  }

  const onFeedbackpressClick=()=>{
    router.push('/dashboard/interview/'+interview?.mockId+'/feedback')
  }
  
  return (
    <div
  className="border border-gray-200 shadow-md hover:shadow-lg rounded-xl p-5 text-center transition-shadow duration-300 ease-in-out bg-white w-full max-w-sm mx-auto hover:scale-110"
>
  {/* Job Info */}
  <h2 className="font-semibold text-blue-900 text-lg">{interview?.jobPosition}</h2>
  <p className="text-sm text-gray-600 mt-1">{interview?.jobExperience} years of experience</p>
  <p className="text-xs text-gray-400 mt-1 mb-3">Created At: {interview?.createdAt}</p>

  {/* Divider with subtle shadow */}
  <div className="w-5/6 mx-auto h-px bg-gray-200 shadow-sm mb-4" />

  {/* Buttons */}
  <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-2">
    <Button
      onClick={onFeedbackpressClick}
      size="sm"
      className="w-full sm:w-36 border border-blue-600 text-blue-700 bg-transparent hover:bg-blue-50 font-medium transition-all duration-200 cursor-pointer"
    >
      Feedback
    </Button>

    <Button
      onClick={onStart}
      size="sm"
      className="w-full sm:w-36 bg-blue-700 text-white border border-transparent hover:bg-transparent hover:text-blue-700 hover:border-blue-500 font-medium transition-all duration-200 cursor-pointer"
    >
      Start
    </Button>
  </div>
</div>

  )
}

export default InterviewItemCard
