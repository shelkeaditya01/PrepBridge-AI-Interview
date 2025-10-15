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
    <div className='border shadow-sm rounded-lg p-4 text-center'>
      <h2 className='font-bold text-blue-900'>{interview?.jobPosition}.</h2>
      <h2 className='text-sm text-gray-600'>{interview?.jobExperience} years of Experience.</h2>
      <h2 className='text-xs text-gray-400'>Created At: {interview?.createdAt}.</h2>

      <div className='flex justify-between mt-2'>
        <Button onClick={onFeedbackpressClick} size="sm" className="border border-blue-600 text-blue-800 bg-transparent hover:bg-blue-50 cursor-pointer w-40">
          Feedback</Button>

        <Button onClick={onStart} size="sm" className="w-40 border border-transparent bg-blue-800 text-white cursor-pointer hover:bg-transparent hover:text-blue-800 hover:border-blue-500">Start</Button>
      </div>
    </div>
  )
}

export default InterviewItemCard
