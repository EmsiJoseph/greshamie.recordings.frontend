import React from 'react';
import Image from 'next/image';
import SideImage from '@/public/sideimage.svg';
import Logo from '@/public/logo.png';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-white p-10 flex-shrink-0 min-h-screen md:min-h-0">
        <Image src={Logo} alt="Logo" className="mb-4" />
        <h1 className="font-bold text-l">GRESHAM HOUSE RECORDINGS</h1>
        
        {children}
      </div>
      <div className="hidden md:flex w-full md:w-1/2 items-center justify-center bg-green-500">
        <Image src={SideImage} alt="Side Image" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
