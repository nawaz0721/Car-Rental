const devUrl = 'http://localhost:4000/';
export const BASE_URL = devUrl

export const AppRoutes = {
    register: devUrl + "auth/register",
    login: devUrl + "auth/login",
    logout: devUrl + "auth/logout",
    manageCar: devUrl + "car/cars",
    bookCar: devUrl + "bookcar/bookcar",
    getBookings: devUrl + "bookcar/getBookings",
    updateBooking: devUrl + "bookcar/updateBooking",
   
}