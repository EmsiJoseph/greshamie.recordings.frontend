import React from 'react';
import Image from 'next/image';
import SideImage from '@/public/sideimage.svg';
import Logo from '@/public/logo.png';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-col items-center justify-center bg-white p-10">
      <Image src={Logo} alt="Logo" className="mb-4" />
      <h1 className="font-bold text-l">GRESHAM HOUSE RECORDINGS</h1>
      <div className="my-4"></div>
      <h1 className="font-semibold text-3xl">Welcome back!</h1>
      <div className="my-4"></div>
      {children}
      </div>
      <div className="w-1/2 flex items-center justify-center bg-green-500">
      <Image src={SideImage} alt="Side Image" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
