"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import MonthSelection from "@/components/dashboard/MonthSelection";
import GradeSelection from "@/components/dashboard/GradeSelection";
import GlobalApi from "@/services/GlobalApi";
import moment from "moment";
import StatusList from "@/components/dashboard/StatusList";
import BarChartList from "@/components/dashboard/BarChart";
import PieChartComponent from "@/components/dashboard/PieChartComponent";

const page = () => {
  const { setTheme } = useTheme();
  const [ selectedMonth, setSelectedMonth ] = useState();
  const [ selectedGrade, setSelectedGrade ] = useState();
  const [attendanceList,setAttendanceList] = useState();
  const [totalPresentData,setTotalPresentData]= useState();
  
  
  useEffect(() => {
    getTotalPresentByDay()
    getStudentAttendance()
  }, [selectedMonth,selectedGrade]);

  
  const getStudentAttendance = ()=>{
    GlobalApi.GetAttendenceList(selectedGrade,moment(selectedMonth).format('MM/YYYY')).then(res=>{
      setAttendanceList(res.data);
    })
  }



  const getTotalPresentByDay=()=>{
    GlobalApi.TotalPresentByDay(moment(selectedMonth).format('MM/YYYY'),selectedGrade).then(res=>{
      setTotalPresentData(res.data)
    })
  }


  
  return (
    <div className="p-10">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl">Dashboard</h2>
        <div className="flex items-center gap-4">
          <MonthSelection selectedMonth={(value)=>setSelectedMonth(value)} />
          <GradeSelection selectedGrade={(value)=>setSelectedGrade(value)} />
        </div>
      </div>
      <StatusList attendanceList={attendanceList}/>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
        <BarChartList attendanceList={attendanceList} totalPresentData={totalPresentData} />
        <PieChartComponent attendanceList={attendanceList}/>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default page;
