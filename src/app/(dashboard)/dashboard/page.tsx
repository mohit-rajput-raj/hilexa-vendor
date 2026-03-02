'use client'
import { ChartAreaInteractive } from '@/components/chart-area-interactive'
import { DataTable } from '@/components/data-table'
import { SectionCards } from '@/components/section-cards'
import { useCurrentUser } from '@/services/queryes'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  const {data} = useCurrentUser();
  if(!data){
    return <div>loading</div>
  }
  return (
    <div className='flex'>
      <div className='w-full'>
        <SectionCards />
      </div>
    </div>

  )
}

export default page