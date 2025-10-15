"use client"
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq, desc } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import InterviewItemCard from './InterviewItemCard';

function InterviewList() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState(null); // Removed TypeScript type
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      GetInterviewList();
    }
  }, [user]);

  const GetInterviewList = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress || ''))
        .orderBy(desc(MockInterview.id));

      setInterviewList(result);
    } catch (error) {
      console.error("Failed to fetch interview list", error);
      setInterviewList([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className='font-bold text-xl my-10'>Previous Interviews</h2>

      {/* Loading State */}
      {loading && <p className="text-gray-500">Loading interviews...</p>}

      {/* No Data Found */}
      {!loading && interviewList?.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          <h3 className="text-xl font-semibold">No Interview Records Found!</h3>
          <p className="text-sm mt-2">Start your first mock interview to see it here.</p>
          <img
            src="/NoDataFound.jpg" // or use an illustration
            alt="No Data"
            className="mx-auto mt-6 w-100"
          />
        </div>
      )}

      {/* Data Present */}
      {!loading && interviewList?.length > 0 && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {interviewList.map((interview, index) => (
            <InterviewItemCard key={index} interview={interview} />
          ))}
        </div>
      )}
    </div>
  );
}

export default InterviewList;
