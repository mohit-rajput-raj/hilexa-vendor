// import { data } from "@/app/(dashboard)/reservation/_components/data"
import { NewRoomProps } from "@/app/(dashboard)/rooms/new/zod-schema";
import { axiosApi } from "@/lib/axios";

export const addRooms = async (data: NewRoomProps) => {
  const res = await axiosApi.post("/room-types/auto", data);
  return res.data;
};
export const getDashboard = async (params?: { reservationDays?: number }) => {
  try {
    const res = await axiosApi.get(`/vendors/dashboard`, { params });

    return res.data;
  } catch (error) {
    return error;
  }
};

export const getCheckout = async (id: string) => {
  try {
    const res = await axiosApi.get(`/vendors/bookings/${id}/check-out`);

    return res.data;
  } catch (error) {
    return error;
  }
};

export const getTasks = async () => {
  try {
    const res = await axiosApi.get("/vendors/tasks");

    return res.data;
  } catch (error) {
    return [];
  }
};
export const createTsk = async (data: {
  title: string;
  description: string;
  status: string;
  dueDate: Date | undefined;
}) => {
  const res = await axiosApi.post("/vendors/tasks", data);
  return res.data;
};

export const ReservedUsersDetails =async (id:string)=>{
  const res = await axiosApi(`/vendors/bookings/${id}`)
  return res.data;
}
export const updateTask = async ({
  data,
  id,
}: {
  id: string;
  data: {
    title?: string;
    description?: string;
    status: string;
    dueDate?: Date | undefined;
  };
}) => {
  const res = await axiosApi.patch(`/vendors/tasks/${id}`, data);
  return res.data;
};
export const deleteTask = async (id: string) => {
  const res = await axiosApi.delete(`/vendors/tasks/${id}`);
  return res.data;
};
export const getReservation = async () => {
  try {
    const res = await axiosApi.get("/vendors/bookings");

    return res.data;
  } catch (error) {
    return [];
  }
};
export const getRooms = async (hotelId: string) => {
  try {
    const res = await axiosApi.get("/vendors/room-types", {
      params: {
        hotelId: hotelId,
      },
    });
    return res.data;
  } catch (error) {
    return {
      data: [],
      status: 500,
      statusText: "Error",
      headers: {},
      config: {},
    };
  }
};
export const getRoomById = async (id: string, hotelId: string) => {
  try {
    const res = await axiosApi.get(`/vendors/room-types/${id}`, {
      params: {
        hotelId: hotelId,
      },
    });
    return res.data;
  } catch (error) {
    return {
      data: [],
      status: 500,
      statusText: "Error",
      headers: {},
      config: {},
    };
  }
};
