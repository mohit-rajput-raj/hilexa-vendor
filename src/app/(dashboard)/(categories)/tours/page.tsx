import React, { Suspense } from 'react'

import { ErrorBoundary } from 'react-error-boundary'
import { PageSkeleton } from '../rooms/_components/details.skeleton'
import { MessageModal, RoomListing } from '../rooms/_components/RoomsListing'
import { TourListing } from '../rooms/_components/TourListing'

type Props = {}

const page = (props: Props) => {
     return (
          <ErrorBoundary fallback={<MessageModal title="Error" description="Something went wrong" />}>
               <Suspense fallback={<PageSkeleton />}>
                    <TourListing />
               </Suspense>
          </ErrorBoundary>
     )
}

export default page