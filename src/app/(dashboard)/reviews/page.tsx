import React from 'react'
import { CustomerReviewsSection } from './_components/customer-review-card'
import { TotalCustomers } from './_components/totalCustomesrs'
import { ReviewsMap } from './_components/map-section'
import { OverallRating } from './_components/overall-rating'
import { ReviewStatistics } from './_components/review-statics'
// import { ChartBarMultiple } from './_components/review-statics'

type Props = {}

const page = (props: Props) => {
    return (
        <div className="space-y-6 ">

      <div className="grid lg:grid-cols-2 gap-6 ">
        <ReviewStatistics />
        <OverallRating />
      </div>
          <ReviewsMap />


      <div className="grid lg:grid-cols-3 gap-6 w-full">
        
      </div>

      <CustomerReviewsSection />

    </div>
    )
}

export default page