"use client";
import { useQuery } from "@tanstack/react-query";
import {
  getDashboard,
  getReservation,
  getRoomById,
  getRooms,
  getTasks,
  ReservedUsersDetails,
} from "./fetch.service";
import { useCurrentUser } from "./queryes";

export const useGetDashboard = (reservationDays?: number) => {
  return useQuery({
    queryKey: ["user-getDashboard"],
    queryFn: () => getDashboard({ reservationDays }),
    staleTime: 10000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    retry: false,
  });
};
export const useGetReservedUserData = (id: string) => {
  return useQuery({
    queryKey: ["user-ReservedUsersDetails", id],
    queryFn: () => ReservedUsersDetails(id),
    staleTime: 1000000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    retry: false,
    enabled:!!id
  });
};
export const useGetTasks = () => {
  return useQuery({
    queryKey: ["user-getTasks"],
    queryFn: () => getTasks(),
    staleTime: 10000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    retry: false,
  });
};
export const useResevatiosnData = () => {
  return useQuery({
    queryKey: ["user-reservations"],
    queryFn: () => getReservation(),
    staleTime: 10000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    retry: false,
  });
};
export const useAllRooms = () => {
  const { data: user } = useCurrentUser();
  const hotelId = user?.data?.approvedData?.hotelId;

  return useQuery({
    queryKey: ["vendor-getRooms", hotelId],
    queryFn: () => getRooms(hotelId),
    staleTime: 200000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    retry: false,
    enabled: !!hotelId,
  });
};
export const useRoomById = (id: string) => {
  const { data: user } = useCurrentUser();
  const hotelId = user?.data?.approvedData?.hotelId;
  return useQuery({
    queryKey: ["vendor-getRoomById", id, hotelId],
    queryFn: () => getRoomById(id, hotelId),
    staleTime: 200000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    retry: false,
    enabled: !!id && !!hotelId,
  });
};
// export const useGetNewHotels = () => {
//   return useQuery({
//     queryKey:["gethotels_home"],
//     queryFn:()=>getNewHotels(),
//     staleTime: 20000,
//     refetchOnWindowFocus: false,
//     refetchOnMount: false,
//     refetchOnReconnect: true,
//     retry: false
//   })
// };
