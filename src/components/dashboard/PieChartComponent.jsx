import { getUniqueRecord } from "@/services/service";
import { PieChart } from "lucide-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Pie, ResponsiveContainer } from "recharts";

const PieChartComponent = ({ attendanceList }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (attendanceList) {
      const uniqueRecords = getUniqueRecord(attendanceList);
      const total = uniqueRecords.length;

      const today = moment().format("D");
      const presentPercCalc =
        (attendanceList.length / (total * Number(today))) * 100;
      setData([
        {
          name: "Present",
          value: Number(presentPercCalc.toFixed(1)),
          fill: "#8884d8",
        },
        {
          name: "Absent",
          value: Number(100 - presentPercCalc.toFixed(1)),
          fill: "#82ca9d",
        },
      ]);
    }
  }, [attendanceList]);

  return (
    <div className="border p-5 rounded-lg">
      <h2 className="font-bold text-lg my-2">Monthly Attendence</h2>
      <ResponsiveContainer width={"100%"} height={300}>
        <PieChart width={730} height={250}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            label
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
