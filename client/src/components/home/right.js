import React from 'react'
import StaticsImages from './Statics'
import { data } from '@/utils/showcaseStatic';
import Image from "next/image";

const Right = () => {
  return (
    <div className=" flex-1 h-full md:py-8  flex justify-end items-center bg-red-100 rounded-primary relative">

      <StaticsImages items = {data} />
    </div>
  )
}

export default Right