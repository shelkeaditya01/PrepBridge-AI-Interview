"use client"
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react'

function Header(){
    const path=usePathname();
    useEffect(()=>{
        console.log(path);
    },[]);
  return (
    <div className='flex p-4 items-centre justify-between bg-secondary shadow-md'>
      <img src={'/AIMockerlogo.png'} width={160} height={100}></img>
      <ul className='hidden md:flex gap-6'>
        <li className={`mt-4 hover:text-primary hover:font-bold transition-all cursor-pointer
            ${path=='/dashboard' && 'text-primary font-bold'}`}>Dashboard</li>
        <li className={`mt-4 hover:text-primary hover:font-bold transition-all cursor-pointer
            ${path=='/dashboard/questions' && 'text-primary font-bold'}`}>Questions</li>
        <li className={`mt-4 hover:text-primary hover:font-bold transition-all cursor-pointer
            ${path=='/dashboard/upgrade' && 'text-primary font-bold'}`}>Upgrade</li>
        <li className={`mt-4 hover:text-primary hover:font-bold transition-all cursor-pointer
            ${path=='/dashboard/how' && 'text-primary font-bold'}`}>How it Works?</li>
      </ul>
      <UserButton></UserButton>
    </div>
  )
}
export default Header;