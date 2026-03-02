import { z } from "zod";

export const NewRoomSchema = z.object({
  roomNumber: z.string().min(1, "First name is required").optional(),
  roomFloor: z.string().min(1, "Last name is required").optional(),
  roomType: z.string().min(1, "Last name is required").optional(),
  roomCapacity: z.string().min(1, "Last name is required").optional(),
  roomPricePerNight: z.string().min(1, "Last name is required").optional(),
  roomDescription: z.string().min(1, "Last name is required").optional(),
  bedType: z.string().min(1, "Last name is required").optional(),
  roomSize: z.string().min(1, "Last name is required").optional(),
  amenities: z.array(z.string()).optional(),
  view: z.array(z.string()).optional(),
  accessibilityFeatures: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
  reservationStatus: z.string().optional(),
});

export type NewRoomProps = z.infer<typeof NewRoomSchema>;