'use client'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from './ui/input';
  
import { useForm } from "react-hook-form"
import GlobalApi from '@/services/GlobalApi';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';




const AddNewStudents = ({refreshData}) => {
    const [open,setOpen] = useState(false);
    const [grades,setGrades] = useState([]);
    const [loading,setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
      } = useForm()
    
    const onSubmit = (data)=>{
        setLoading(true)
        GlobalApi.CreateNewStuents(data).then(res =>{
            console.log(res);

            if(res.data){
                setLoading(false)
                refreshData()
                toast('Student Added')
                setOpen(false);
                reset();
            }else{
                setLoading(false)
                toast('Something went wrong')
            }
        });
    }

    useEffect(()=>{
        GetAllGradeList();
    },[])

    const GetAllGradeList = ()=>{ 
        GlobalApi.GetAllGrades().then(res=>setGrades(res.data))
    }

    
      
    return (
    <div>
        <Button onClick={()=>{setOpen(true)}} >Add New Student</Button>
            <Dialog open={open}> 
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
                <DialogDescription>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='py-3'>
                        <label >
                            Full Name
                        </label>
                            <Input placeholder='Name'
                            {...register('name',{required:true})}
                            />
                    </div>

                    <div className='py-3 flex flex-col'>
                        <label >
                            Grade
                        </label>
                        <select className='p-3 border rounded-lg' {...register('grade',{required:true})}>
                            {grades.map((item)=>(
                                <option key={item.id} value={item.grade}>{item.grade}</option>
                            ))}
                        </select>
                    </div>
                    <div className='py-3'>
                        <label >
                            contact num
                        </label>
                            <Input placeholder='num' {...register('num')}/>
                    </div>
                    <div className='flex gap-4 justify-end items-center mt-5'>
                        <Button type="button" onClick={()=>setOpen(false)} variant='ghost'>Cancel</Button>
                        <Button  type='submit' disabled={loading} >{loading? <Loader2 className='animate-spin'/> :'Save'}</Button>
                    </div>
                    </form>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
            </Dialog>

    </div>
  )
}

export default AddNewStudents;