import { ReservationProps } from "@/constants/Types/reservation";

export const GetTablesReservation = (reservation: ReservationProps) => {
    const tableList = reservation.tableReservations
    let tableString = ''

    for (let i = 0; i < tableList.length; i++) {
        tableString += tableList[i].restaurantTable.name + ', '
    }

    return tableString.slice(0, tableString.length - 2)
}