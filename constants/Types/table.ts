
export type TableStatus = 'RESERVED' | 'OCCUPIED' | 'AVAILABLE'

export interface RestaurantTableProps {
    id: number,
    name: string,
    capacity: number,
    status: TableStatus
}

export interface TableProps {
    capacity: number,
    id: number,
    name: string,
    status: string
}


export interface AdminTableProps {
    capacity: number,
    name: string,
    status: string
}

export interface GetCapacityProps {
    tableData: TableProps[]
    tableName: string
}