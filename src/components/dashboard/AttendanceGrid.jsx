"use client";
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import moment from "moment";
import { date } from "drizzle-orm/mysql-core";
import GlobalApi from "@/services/GlobalApi";
import { toast } from "sonner";

const AttendanceGrid = ({ attendanceList, selectedMonth }) => {
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([
    { field: "studentId", filter: true },
    { field: "name", filter: true },
  ]);
  const pagination = true;
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 20, 50, 100];
  useEffect(() => {
    if (attendanceList) {
      // Calculate the number of days in the selected month
      const daysInMonth = (year, month) => new Date(year, month, 0).getDate();
      const numberOfDays = daysInMonth(
        moment(selectedMonth).format("YYYY"),
        moment(selectedMonth).format("MM")
      );
      const daysArray = Array.from({ length: numberOfDays }, (_, i) => i + 1);

      // Generate the column definitions
      const newColDefs = [
        { field: "studentId" },
        { field: "name" },
        ...daysArray.map((date) => ({
          field: date.toString(),
          width: 50,
          editable: true,
        })),
      ];
      setColDefs(newColDefs);

      // Create new row data
      const userList = getUniqueRecord(attendanceList);
      const newRowData = userList.map((user) => {
        const newRow = { ...user };
        daysArray.forEach((day) => {
          newRow[day] = isPresent(user.studentId, day);
        });
        return newRow;
      });

      setRowData(newRowData);
    }
  }, [attendanceList, selectedMonth]);

  const isPresent = (studentId, day) => {
    const result = attendanceList.find(
      (item) => item.day === day && item.studentId === studentId
    );
    return result ? true : false;
  };

  const getUniqueRecord = (list) => {
    const existingRecord = new Set();
    const uniqueRecord = [];

    list.forEach((record) => {
      if (!existingRecord.has(record.studentId)) {
        existingRecord.add(record.studentId);
        uniqueRecord.push(record);
      }
    });

    return uniqueRecord;
  };

  const onMarkAttendence = (day, studentId, presentStatus) => {
    const date = moment(selectedMonth).format("MM/YYYY");
    if (presentStatus) {
      const data = {
        day: day,
        studentId: studentId,
        date: date,
        present: presentStatus,
      };

      GlobalApi.MarKAttendence(data).then((res) => {
        console.log(res),
          toast("Student Id: " + studentId + ", Marked as present");
      });
    } else {
      GlobalApi.DeleteAttendence(studentId, day, date);
      toast("student unmarked");
    }
  };

  return (
    <div>
      <div
        className="ag-theme-quartz" // applying the Data Grid theme
        style={{ height: 500 }} // the Data Grid will fill the size of the parent container
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          onCellValueChanged={(e) =>
            onMarkAttendence(e.colDef.field, e.data.studentId, e.newValue)
          }
        />
      </div>
    </div>
  );
};

export default AttendanceGrid;
