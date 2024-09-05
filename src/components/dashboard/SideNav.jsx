'use client'
import React from 'react'
import Image from 'next/image';
import { GraduationCap, Hand, LayoutIcon, Settings } from 'lucide-react';
import { Separator } from '../ui/separator';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const Menus = [
    {
        id:1,
        name:'Dashboard',
        icon:LayoutIcon,
        path:'/dashboard'
    },
    {
        id:2,
        name:'Students',
        icon:GraduationCap,
        path:'/dashboard/students'
    },
    {
        id:3,
        name:'Attendence',
        icon:Hand,
        path:'/dashboard/attendance'
    },
    {
        id:4,
        name:'Settings',
        icon:Settings,
        path:'/dashboard/Settings'
    },
] 




const SideNav = () => {
  const {user} = useKindeBrowserClient();
  const pathname = usePathname();
    return (
    <div className='border shadow-md h-screen p-5'>
        <Image src={'/logo.svg'} alt='logo' width={180} height={50}/>
        <Separator className='my-5'/>
        {Menus.map((menu,index)=>(
            <Link key={index} href={menu.path}>
                <div  >
                    <h2 className={`flex items-center gap-3 p-4 text-md text-slate-500 hover:bg-primary hover:text-white rounded-xl cursor-pointer m-2 ${pathname==menu.path && 'bg-primary/65 text-white' }`}><menu.icon/> <span>{menu.name}</span></h2>
                </div>
            </Link>
        ))}
        <div className='flex gap-2 items-center fixed bottom-4'>
            <Image src={user?.picture} width={35} height={35} alt='user' className='rounded-full'/>
            <div >
                <h2 className='text-sm font-bold'>{user?.given_name} {user?.family_name}</h2>
                <h2 className='text-xs text-slate-300'>{user?.email}</h2>
            </div>
        </div>
    </div>
  )
}

export default SideNav;