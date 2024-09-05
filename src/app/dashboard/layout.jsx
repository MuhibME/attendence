'use client'
import React from 'react'
import SideNav from '@/components/dashboard/SideNav'
import Header from '@/components/dashboard/Header';

const layout = ({children}) => {
  return (
    <main>
        <div className='md:w-64 fixed hidden md:block'>
            <SideNav/>        
        </div>
        <div className='md:ml-64'>
            <Header/>
            {children}
        </div>
    </main>
  )
}

export default layout;