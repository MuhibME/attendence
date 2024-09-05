import React from 'react'

const TotalStudentsCard = ({studentList}) => {
  return (
    <div className='aspect-auto w-[200px] h-auto mt p-6 mt-3 mb-3 bg-slate-100 rounded-lg'>
        <div><h2 className='font-bold text-xl'>Total Students</h2></div>
        <div><p className='text-lg'>{studentList? `= ${studentList.length}` : 'No students'}</p></div>
    </div>
  )
}

export default TotalStudentsCard;