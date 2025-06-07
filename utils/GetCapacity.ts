import { GetCapacityProps } from "@/constants/Types/table";

export const GetCapacity = ({ tableData, tableName }: GetCapacityProps) => {
    let res = -1
    for (let i = 0; i < tableData.length; i++) {
        if (tableData[i].name === tableName) {
            res = tableData[i].capacity
            break
        }
    }
    return res
}