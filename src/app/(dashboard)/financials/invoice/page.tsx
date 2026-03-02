import React, { Suspense } from 'react'
import { InvoiceTbale } from './invoicetable'
import { ErrorBoundary } from 'react-error-boundary'
import { MessageModal } from '../../rooms/_components/full-frame'
import { PageSkeleton } from '../../rooms/_components/details.skeleton'

type Props = {}

const Invoice = (props: Props) => {
  return (
     <ErrorBoundary fallback={<MessageModal title="Error" description="Something went wrong" />}>
          <Suspense fallback={<PageSkeleton />}>
    <div><InvoiceTbale/></div>
          </Suspense>
     </ErrorBoundary>
  )
}

export default Invoice


