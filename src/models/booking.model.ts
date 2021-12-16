import { Gym } from "./gym.model";
import { User } from "./user.model";

export interface Booking {
    id?: number;
    uuid?: string;
    creator?: User;
    gym?: Gym;
    time?: string;
    createdOn?: string;
    updatedOn?: string;
}