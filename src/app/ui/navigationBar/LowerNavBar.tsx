'use client';

import { useSession } from "next-auth/react"
import { useDispatch } from 'react-redux';
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function LowerNavigationBar(
) {
  return (
    <nav className="bg-gray-800 text-white h-20 w-full flex items-center justify-between px-8">
    </nav>
  );
}