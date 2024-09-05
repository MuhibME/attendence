'use client'
import AddNewStudents from '@/components/AddNewStudents';
import StudentListTable from '@/components/dashboard/StudentListTable';
import TotalStudentsCard from '@/components/TotalStudents Card';
import GlobalApi from '@/services/GlobalApi';
import React, { useEffect, useState } from 'react'



const Students = () => {
  const [studentList,setStudentList] = useState([])

  const GetAllStudents = ()=>{
    GlobalApi.GetAllStudent().then(res=> setStudentList(res.data))
  }

  useEffect(()=>{
    GetAllStudents()
  },[])

  return (
    <div className='p-7'>
      <h2 className='font-bold text-2xl items-center flex justify-between'>
        Students
      <AddNewStudents  refreshData={GetAllStudents}/>
      </h2>
      <TotalStudentsCard studentList={studentList} />
      <StudentListTable studentList={studentList} refreshData={GetAllStudents}/>
    </div>
  )
}

export default Students;