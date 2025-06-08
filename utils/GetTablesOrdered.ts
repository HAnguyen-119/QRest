import { TableReservations } from "@/constants/Types/reservation";

export const GetTablesOrdered = (tableData: TableReservations[]) => {
    let tables: number[] = []
    tableData.forEach((table) => {
        tables = tables.length == 0 ? [table.restaurantTable.id] : [...tables, table.restaurantTable.id]
    })
    return tables
}