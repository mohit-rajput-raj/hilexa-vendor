import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { MessageModal } from '../(categories)/rooms/_components/full-frame'
import { PageSkeleton } from '../(categories)/rooms/_components/details.skeleton'
import { GuestDataTable } from './_components/datatable'
import { Verify } from '@/app/(auth)/authMiddleware'

type Props = {}

const page = (props: Props) => {
    return (
        <ErrorBoundary fallback={<MessageModal title="Error" description="Something went wrong" />}>
            <Suspense fallback={<PageSkeleton />}>
                <div className='bg-background pt-4 rounded-2xl'><GuestDataTable /></div>
            </Suspense>
        </ErrorBoundary>
    )
}

export default page