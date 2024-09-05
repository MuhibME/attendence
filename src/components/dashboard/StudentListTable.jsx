import React, { useEffect, useState } from "react";
// grid
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { Button } from "../ui/button";
import { Search, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import GlobalApi from "@/services/GlobalApi";
import { toast } from "sonner";

const StudentListTable = ({ studentList, refreshData }) => {
  const pagination = true;
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 20, 50, 100];

  const [searchInput, setSearchInput] = useState("");

  // custom button
  const CustomTrashButton = ({ data }) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant="destructive">
            <Trash />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              record and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => DeleteRecord(data?.id)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  // row data
  const [rowData, setRowData] = useState([]);

  // col data
  const [colDefs, setColDefs] = useState([
    { field: "id", filter: true },
    { field: "name", filter: true },
    { field: "num", filter: true },
    { field: "action", cellRenderer:CustomTrashButton}, // Fixed typo here
  ]);


  useEffect(() => {
    // only when studentList is available
    studentList && setRowData(studentList);
  }, [studentList]);

  const DeleteRecord = (id) => {
    GlobalApi.DeleteStudentRecord(id).then((res) => {
      if (res) {
        toast("Record Deleted");
        refreshData();
      }
    });
  };

  return (
    <div className="my-7">
      <div
        className="ag-theme-quartz"
        style={{ height: 500 }}
      >
        <div className="p-2 rounded-lg border shadow-sm flex mb-4 max-w-sm gap-2">
          <Search />
          <input
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
            type="text"
            placeholder="Search Anything"
            className="outline-none w-full"
          />
        </div>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          quickFilterText={searchInput} // Corrected searchInput name
         
        />
      </div>
    </div>
  );
};

export default StudentListTable;
