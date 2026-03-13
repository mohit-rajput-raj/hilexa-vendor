'use client'

import { SectionCards } from "@/components/section-cards";
import { useCurrentUser } from "@/services/queryes";
import React, { Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { MessageModal } from "../rooms/_components/full-frame";
import { PageSkeleton } from "../rooms/_components/details.skeleton";
import { HotelDashboard } from "./_components/charts";
import { RatingAndTasks } from "./_components/tasks";
import { useGetDashboard, useGetTasks } from "@/services/tanstack.query";
import { Verify } from "@/app/(auth)/authMiddleware";
import { useRouter } from "next/navigation";

type Props = {};
export type DashboardData = {
  stats: Stats;
  roomSummary: RoomSummary;
  revenueChart: RevenueChartItem[];
  reservationChart: ReservationChartItem[];
  recentBookings: RecentBooking[];
};

export type Stats = {
  newBookings: number;
  todayCheckIns: number;
  todayCheckOuts: number;
  totalRevenue: number;
};

export type RoomSummary = {
  totalRooms: number;
  occupiedRooms: number;
  availableRooms: number;
};

export type RevenueChartItem = {
  month: number;
  revenue: number;
};

export type ReservationChartItem = {
  date: string;
  booked: number;
  cancelled: number;
};

export type RecentBooking = {
  bookingReference: string;
  guestName: string;
  room: string;
  checkIn: string;
  checkOut: string;
  status: "confirmed" | "pending" | "cancelled";
};
const page = (props: Props) => {
  
  
  const { data } = useCurrentUser();
  
  const { data: s, isLoading } = useGetDashboard();
    

  if (isLoading) return <PageSkeleton />;

  const dash = s?.data || {
    roomSummary: {},
    recentBookings: [],
    revenueChart: [],
  };

  return (
    <ErrorBoundary
      fallback={
        <MessageModal title="Error" description="Something went wrong" />
      }
    >
      <Suspense fallback={<PageSkeleton />}>
        <div className="md:flex-row flex flex-col gap-5 ">
          <div className="w-full space-y-6 ">
            <SectionCards dash={dash} />
            <HotelDashboard />
          </div>
          <div className="min-w-[300px]">
            <RatingAndTasks />
          </div>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};

export default page;
