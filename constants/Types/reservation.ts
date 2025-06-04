import { RestaurantTableProps } from "./table";

export interface ReservationProps {
    id: number,
    bookingTime: Date,
    arrivalTime: Date,
    numberOfGuests: number,
    deposit: number,
    customerName: string,
    customerPhone: string,
    tableReservations: [{ id: number, restaurantTable: RestaurantTableProps }],
    confirmed: boolean,
}

export interface ReservationFormProps {
    visible: boolean,
    setVisible: (visible: boolean) => void 
}

export interface ReservationListProps {
    data: ReservationProps[]
}