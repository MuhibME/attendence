'use client'
import Image from "next/image";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import MonthSelection from "@/components/dashboard/MonthSelection";
import { useTheme } from "next-themes";




export default function Home() {
 


  useEffect(()=>{
    redirect('/api/auth/login?post_login_redirect_url=/dashboard')
  },[]);
  return (
    <main>
     
    </main>
  );
}
