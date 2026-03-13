import  { Suspense } from "react";
import { CustomerReviewsSection } from "./_components/customer-review-card";
// import { ReviewsMap } from "./_components/map-section";
import { OverallRating } from "./_components/overall-rating";
import { ReviewStatistics } from "./_components/review-statics";
import { ErrorBoundary } from "react-error-boundary";
import { MessageModal } from "../rooms/_components/full-frame";
import { PageSkeleton } from "../rooms/_components/details.skeleton";
// import { ChartBarMultiple } from './_components/review-statics'
import { Verify } from '@/app/(auth)/authMiddleware'

const page = () => {
  return (
    <ErrorBoundary
      fallback={
        <MessageModal title="Error" description="Something went wrong" />
      }
    >
      <Suspense fallback={<PageSkeleton />}>
        <div className="space-y-6 ">
          <div className="grid lg:grid-cols-2 gap-6 ">
            <ReviewStatistics />
            <OverallRating />
          </div>
          {/* <ReviewsMap /> */}

          <div className="grid lg:grid-cols-3 gap-6 w-full"></div>

          <CustomerReviewsSection />
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};

export default page;
