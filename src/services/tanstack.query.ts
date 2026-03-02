'use client'
import { useQuery } from "@tanstack/react-query"
import { getReservation, getRoomById, getRooms } from "./fetch.service"

export const useResevatiosnData = () => {
    return useQuery({
        queryKey: ["user-reservations"],
        queryFn: () => getReservation(),
        staleTime: 10000,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: true,
        retry: false
    })
}
export const useAllRooms = () => {
    return useQuery({
        queryKey: ["vendor-getRooms"],
        queryFn: () => getRooms(),
        staleTime: 200000,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: true,
        retry: false
    })
}
export const useRoomById = (id:string) => {
    return useQuery({
        queryKey: ["vendor-getRoomById", id],
        queryFn: () => getRoomById(id),
        staleTime: 200000,
        enabled: !!id,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: true,
        retry: false
    })
}
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