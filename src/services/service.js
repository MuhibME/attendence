export const getUniqueRecord = (list) => {
  const uniqueRecordMap = new Map();
if(list){
  list.forEach((record) => {
    if (!uniqueRecordMap.has(record.studentId)) {
      uniqueRecordMap.set(record.studentId, record);
    }
  });}

  return Array.from(uniqueRecordMap.values());
};
