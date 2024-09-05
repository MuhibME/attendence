'use client'
import AttendanceGrid from "@/components/dashboard/AttendanceGrid";
import GradeSelection from "@/components/dashboard/GradeSelection";
import MonthSelection from "@/components/dashboard/MonthSelection";
import { Button } from "@/components/ui/button";
import GlobalApi from "@/services/GlobalApi";
import moment from "moment";
import React, { useState } from "react";

const Attendence = () => {
  const [selectedGrade,setSelectedGrade] = useState();
  const [selectedMonth,setSelectedMonth] = useState();
  const [attendanceList,setAttendandeList] = useState([]);

  const onSearchHandler = ()=>{
    
    const month = moment(selectedMonth).format('MM/YYYY')
    GlobalApi.GetAttendenceList(selectedGrade,month).then(res =>{
      console.log(res)
      setAttendandeList(res.data)
    })

  }
  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">Attendance</h2>
      {/* search option */}

      <div className="flex flex-row gap-4 p-5 rounded-lg shadow-sm border-2 items-center">
        <div className="flex gap-2 items-center">
          <label>Select Month:</label>
          <MonthSelection selectedMonth={(value)=>setSelectedMonth(value)} />
        </div>
        <div className="flex gap-2 items-center">
          <label>Select Grade:</label>
          <GradeSelection selectedGrade={(value)=>setSelectedGrade(value)} />
        </div>
        <Button
        onClick={()=>onSearchHandler()}
        >Search</Button>
      </div>
      {/* Student Attendence Grid */}
      <AttendanceGrid attendanceList={attendanceList} selectedMonth={selectedMonth}/>
    </div>
  );
};

export default Attendence;
