import { Gender } from "@/http/Enums/gender.enum";
import { Booking } from "./booking.model";

export interface User {
    id?: number;
    uuid?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    gender?: Gender;
    bookingsCreated?: Booking[];
    createdOn?: string;
    updatedOn?: string;
}