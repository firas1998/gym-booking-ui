export const Constants = {
    JWT_KEY: 'GYM_BOOKING_JWT',
    CREATE_USER_ENDPOINT: 'user/create',
    GET_USER_ENDPOINT: 'user',
    ALL_GYMS_ENDPOINT: 'gyms/all',
    GYM_ENDPOINT: (gymUUID: string) => {
        return `gym/${gymUUID}`;
    },
    BOOKINGS_ENDPOINT: 'bookings',
    BOOK_ENDPOINT: 'book',
    BOOKING_ENDPOINT: (bookingUUID: string) => {
        return `booking/${bookingUUID}`;
    },
    DELETE_BOOKING_ENDPOINT: (bookingUUID: string) => {
        return `booking/${bookingUUID}`;
    },
    GYM_BOOKINGS_ENDPOINT: (gymUUID: string) => {
        return `bookings/gym/${gymUUID}`;
    },
    UPDATE_BOOKING_ENDPOINT: (bookingUUID: string) => {
        return `booking/${bookingUUID}/update`;
    },
    DATE_TIME_FORMAT: 'YYYY-MM-DD HH:mm:ss ZZ',
    DATE_FORMAT: 'YYYY-MM-DD',
}
