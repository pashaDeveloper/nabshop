import React from 'react'
import StaticsImages from './Statics'
import { data } from '@/utils/showcaseStatic';

const Right = () => {
  return (
    <div className=" flex-1 h-full py-8 md:py-8  flex justify-end items-center bg-purple-200 rounded-primary relative">

      <StaticsImages items = {data} />
    </div>
  )
}

export default Right