'use client'
import React, { Suspense, useEffect } from "react";
import { SmallCalendar } from "./_component/small-calender";
import BigCalender from "./_component/big-calander";
import { ErrorBoundary } from "react-error-boundary";
import { PageSkeleton } from "../rooms/_components/details.skeleton";
import { MessageModal } from "../rooms/_components/full-frame";
import MainCalenderFrame, { ItemGroupExample } from "./_component/hotel-types";
import { Verify } from "@/app/(auth)/authMiddleware";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/services/queryes";

type Props = {};

const page = (props: Props) => {
  const router = useRouter()
    useEffect(()=>{
      if( localStorage.getItem("accessToken") !== null){
        router.push("/dashboard")
      }
    },[])
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
