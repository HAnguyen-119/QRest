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
    tableReservations: TableReservations[],
    reservationStatus: ReservationStatus
}

export interface TableReservations {
    id: number,
    restaurantTable: RestaurantTableProps
}

export interface ReservationDataPostProps {
    arrivalTime: Date,
    numberOfGuests: number,
    deposit: string,
    customerName: string,
    customerPhone: string,
    restaurantTableNames: string[],
    reservationStatus: ReservationStatus
}

export interface ReservationFormProps {
    visible: boolean,
    setVisible: (visible: boolean) => void
    setReservationId: (id: number | null) => void
}

export interface ReservationListProps {
    data: ReservationProps[]
    refetch: () => void
    isCashier: boolean
    setReservationId: (id: number | null) => void
    setReservationListVisible: (visible: boolean) => void
}

export interface CreateReservationProps {
    containerVisible: boolean,
    setContainerVisible: (visible: boolean) => void
    refetch: () => void
}