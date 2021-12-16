import { Constants } from "@/Constants";
import { Booking } from "@/models/booking.model";
import { Gym } from "@/models/gym.model";
import { User } from "@/models/user.model";
import axios, { AxiosResponse, Method } from "axios";
import { BookingDTO } from "./DTOs/booking.dto";
import { UserDTO } from "./DTOs/user.dto";
import * as firebase from "firebase/auth";
import store from "@/store";
import router from "@/router";

export async function login(code: string, confirmationResult: firebase.ConfirmationResult) {

    let result: firebase.UserCredential;
    try {
        result = await confirmationResult.confirm(code);
        console.log(result);
    } catch (error) {
        console.log(error);
        store.commit("setAuthenticated", { authenticated: false });
        return false;
    }
    store.commit("setAuthenticated", { authenticated: true });
    return true;
}

export async function logout() {
    return null;
}

export async function createUser(user: UserDTO): Promise<User> {
    const response = await request("POST", Constants.CREATE_USER_ENDPOINT, user);
    store.commit('setUser', { user: response.data });

    return response.data;
}

export async function me(): Promise<User> {
    const response = await request("GET", Constants.GET_USER_ENDPOINT);
    store.commit('setUser', { user: response.data });

    return response.data;
}

export async function getGyms(): Promise<Gym[]> {
    const response = await request("GET", Constants.ALL_GYMS_ENDPOINT);

    return response.data;
}

export async function getGymById(gymId: string): Promise<Gym> {
    const response = await request("GET", Constants.GYM_ENDPOINT(gymId));

    return response.data;
}

export async function getBookingById(bookingId: string): Promise<Booking> {
    const response = await request("GET", Constants.BOOKING_ENDPOINT(bookingId));

    return response.data;
}

export async function getBookingsByGymId(gymId: string): Promise<Booking[]> {
    const response = await request("GET", Constants.GYM_BOOKINGS_ENDPOINT(gymId));

    return response.data;
}

export async function getMyBookings(): Promise<Booking[]> {
    const response = await request("GET", Constants.BOOKINGS_ENDPOINT);

    return response.data;
}

export async function book(bookingDTO: BookingDTO): Promise<Booking> {
    const response = await request("POST", Constants.BOOK_ENDPOINT, bookingDTO);

    return response.data;
}

export async function updateBooking(bookingId: string, bookingDTO: BookingDTO): Promise<Booking> {
    const response = await request("PATCH", Constants.UPDATE_BOOKING_ENDPOINT(bookingId), bookingDTO);

    return response.data;
}

export async function deleteBooking(bookingId: string): Promise<Booking> {
    const response = await request("DELETE", Constants.DELETE_BOOKING_ENDPOINT(bookingId));

    return response.data;
}

async function request(
    method: Method,
    endpoint: string,
    data?: any
): Promise<AxiosResponse<any>> {
    if (!firebase.getAuth().currentUser) {
        router.push({
            name: 'Login',
            params: {
                error: 'true',
                errorMessage: 'Your session has expired please login again.'
            }
        })
    }
    console.log(await firebase.getAuth().currentUser?.getIdToken());
    const url = `${process.env.VUE_APP_API_URL}/${endpoint}`;
    const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${await firebase.getAuth().currentUser?.getIdToken()}`
    };

    return axios.request({
        method: method,
        url: url,
        headers: headers,
        data: data,
    });
}
