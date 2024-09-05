import axios from "axios";

const GetAllGrades= ()=>axios.get('/api/grade');

const CreateNewStuents= (data)=>axios.post('/api/student',data);

const GetAllStudent= ()=>axios.get('/api/student');

const DeleteStudentRecord = (id)=>axios.delete('/api/student?id='+id)

const GetAttendenceList = (grade,month)=>axios.get(`/api/attendance?grade=${grade}&month=${month}`)

const MarKAttendence = (data)=>axios.post('/api/attendance',data)

const DeleteAttendence =(studentId,day,date)=>{axios.delete(`/api/attendance/?studentId=${studentId}&day=${day}&date=${date}`)}

const TotalPresentByDay =(date,grade)=>axios.get(`/api/dashboard?grade${grade}&date=${date}`)


export default {
    GetAllGrades,
    CreateNewStuents,
    GetAllStudent,
    DeleteStudentRecord,
    GetAttendenceList,
    MarKAttendence,
    DeleteAttendence,
    TotalPresentByDay
}