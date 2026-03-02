import React, { Suspense } from 'react'
import { SmallCalendar } from './_component/small-calender'
import BigCalender from './_component/big-calander'
import { ErrorBoundary } from 'react-error-boundary'
import { PageSkeleton } from '../rooms/_components/details.skeleton'
import { MessageModal } from '../rooms/_components/full-frame'

type Props = {}

const page = (props: Props) => {
    return (
        <ErrorBoundary fallback={<MessageModal title="Error" description="Something went wrong" />}>
            <Suspense fallback={<PageSkeleton />}>
                <div className='flex gap-4'>
            <div className='bg-gray-100 dark:bg-zinc-800 p-4 rounded-lg md:min-w-[269px]'>
                <SmallCalendar />
            <div>
                <h1>Category</h1>
                <p>training</p>
                <p>meeting</p>
                <p>service</p>
            </div>
            </div>
            <div><BigCalender/></div>
        </div>
            </Suspense>
        </ErrorBoundary>
    )
}

export default page