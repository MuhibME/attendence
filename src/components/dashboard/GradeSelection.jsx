'use client'
import GlobalApi from "@/services/GlobalApi";
import React, { useEffect, useState } from "react";

const GradeSelection = ({selectedGrade}) => {
    const [grades,setGrades] = useState([]);
    useEffect(()=>{
        GetAllGradeList();
    },[])
    const GetAllGradeList = ()=>{
        GlobalApi.GetAllGrades().then(res=>setGrades(res.data))
    }
  return (
    <div>
      <select
        className="p-2 border rounded-lg"
        onChange={(e)=>selectedGrade(e.target.value)}
      >
        <option value='none'>none</option>
        <option value='5th'>5th</option>
        <option value='6th'>6th</option>
        <option value='7th'>7th</option>
      </select>
    </div>
  );
};

export default GradeSelection;
