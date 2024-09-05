import { pgTable, varchar, integer, serial, boolean } from 'drizzle-orm/pg-core';

export const GRADES = pgTable('grades', {
    id: serial('id').primaryKey(), // Use integer for non-auto-incrementing IDs
    grade: varchar('grade', { length: 5 }).notNull(),
});



// schema for students

export const STUDENTS = pgTable('students',{
    id:serial('id').primaryKey(),
    name:varchar('name',{length:20}).notNull(),
    grade : varchar('grade',{length:5}),
    num:integer('num',{length:11}),
});


// schema for Attendence table

export const ATTENDANCE = pgTable('attendance',{
    id:serial('id',{length:11}).primaryKey(),
    studentId:integer('studentId',{length:11}).notNull(),
    present:boolean('present').default(false),
    day:integer('day',{length:11}).notNull(), //22nd
    date: varchar('date',{length:20}).notNull()  // 05/2024
});