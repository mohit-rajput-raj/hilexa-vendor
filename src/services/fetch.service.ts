// import { data } from "@/app/(dashboard)/reservation/_components/data"
import { axiosApi } from "@/lib/axios";

export const getReservation = async() => {
    try {
        const res = await axiosApi.get("/vendors/bookings")
        
        return res.data
    } catch (error) {
        return []
    }
}
// export const getRoom
export const getRooms = async()=>{
    try {
        const res = await axiosApi.get("/vendors/room-types", {
            params: {
                "hotelId": "699c08fa14dd3a2de88ddea1"
            }
        })
        return res.data
    } catch (error) {
        return {
            data: [],
            status: 500,
            statusText: 'Error',
            headers: {},
            config: {}
        }
    }
}
export const getRoomById = async(id:string)=>{
    try {
        const res = await axiosApi.get(`/vendors/room-types/${id}`, {
            params: {
                "hotelId": "699c08fa14dd3a2de88ddea1"
            }
        })
        return res.data
    } catch (error) {
        return {
            data: [],
            status: 500,
            statusText: 'Error',
            headers: {},
            config: {}
        }
    }
}