import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { PageSkeleton } from "../rooms/_components/details.skeleton";
import { MessageModal } from "../rooms/_components/full-frame";
import MainCalenderFrame from "./_component/hotel-types";

type Props = {};

const page = (props: Props) => {
  
  return (
    <ErrorBoundary
      fallback={
        <MessageModal title="Error" description="Something went wrong" />
      }
    >
      <Suspense fallback={<PageSkeleton />}>
        <div className="flex gap-4 w-full">
          <MainCalenderFrame/>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};

export default page;
