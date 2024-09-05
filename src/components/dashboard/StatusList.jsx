import React, { useEffect, useState } from "react";
import TotalStudentsCard from "../TotalStudents Card";
import Card from "./Card";
import { GraduationCap, TrendingDown, TrendingUp } from "lucide-react";
import { getUniqueRecord } from "@/services/service";
import moment from "moment";

const StatusList = ({ attendanceList }) => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [presentPerc, setPresentPerc] = useState(0);

  useEffect(() => {
    if (attendanceList) {
      const uniqueRecords = getUniqueRecord(attendanceList);
      const total = uniqueRecords.length;
      setTotalStudents(total);

      const today = moment().format("D");
      const presentPercCalc =
        (attendanceList.length / (total * Number(today))) * 100;
      setPresentPerc(presentPercCalc.toFixed(2));
    }
  }, [attendanceList]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 m-6">
      <Card
        icon={<GraduationCap />}
        title={"Total Students"}
        value={totalStudents}
      />
      <Card
        icon={<TrendingUp />}
        title={"Total Present"}
        value={presentPerc+'%'}
      />
      <Card
        icon={<TrendingDown />}
        title={"Total % Absent %"}
        value={(100 - presentPerc).toFixed(2)+'%'}
      />
    </div>
  );
};

export default StatusList;
