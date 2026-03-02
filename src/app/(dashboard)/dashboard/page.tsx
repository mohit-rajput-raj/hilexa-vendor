'use client'
import { ChartAreaInteractive } from '@/components/chart-area-interactive'
import { DataTable } from '@/components/data-table'
import { SectionCards } from '@/components/section-cards'
import { useCurrentUser } from '@/services/queryes'
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { MessageModal } from '../rooms/_components/full-frame'
import { PageSkeleton } from '../rooms/_components/details.skeleton'

type Props = {}

const page = (props: Props) => {
  const {data} = useCurrentUser();
  if(!data){
    return <div>loading</div>
  }
  return (
    <ErrorBoundary fallback={<MessageModal title="Error" description="Something went wrong" />}>
      <Suspense fallback={<PageSkeleton />}>
        <div className='flex'>
      <div className='w-full'>
        <SectionCards />
      </div>
    </div>
      </Suspense>
    </ErrorBoundary>

  )
}

export default page