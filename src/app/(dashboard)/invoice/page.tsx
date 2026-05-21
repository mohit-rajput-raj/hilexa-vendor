import React, { Suspense } from 'react'
import { InvoiceTbale } from './invoicetable'
import { ErrorBoundary } from 'react-error-boundary'
import { MessageModal } from '../(categories)/rooms/_components/RoomsListing'
import { PageSkeleton } from '../(categories)/rooms/_components/details.skeleton'
import { Verify } from '@/app/(auth)/authMiddleware'

type Props = {}

const Invoice = (props: Props) => {
  return (
    <ErrorBoundary fallback={<MessageModal title="Error" description="Something went wrong" />}>
      <Suspense fallback={<PageSkeleton />}>
        <div><InvoiceTbale /></div>
      </Suspense>
    </ErrorBoundary>
  )
}

export default Invoice


