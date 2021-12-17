import { Gender } from "../Enums/gender.enum";

export class UserDTO {
    uuid?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: Date;
    gender?: Gender;
}
