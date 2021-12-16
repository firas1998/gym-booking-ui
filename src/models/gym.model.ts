import { Booking } from "./booking.model";

export interface Gym {
    id?: number;
    uuid?: string;
    name?: string;
    address?: string;
    maxVisitors?: number;
    bookings?: Booking[];
    createdOn?: string;
    updatedOn?: string;
}