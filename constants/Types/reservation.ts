import { RestaurantTableProps } from "./table";

export type ReservationStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'

export interface ReservationProps {
    id: number,
    bookingTime: Date,
    arrivalTime: Date,
    numberOfGuests: number,
    deposit: number,
    customerName: string,
    customerPhone: string,
    tableReservations: [{ id: number, restaurantTable: RestaurantTableProps }],
    reservationStatus: ReservationStatus
}

export interface ReservationDataPostProps {
    arrivalTime: Date,
    numberOfGuests: number,
    deposit: string,
    customerName: string,
    customerPhone: string,
    restaurantTableIds: number[],
    reservationStatus: ReservationStatus
}

export interface ReservationFormProps {
    visible: boolean,
    setVisible: (visible: boolean) => void 
}

export interface ReservationListProps {
    data: ReservationProps[]
}