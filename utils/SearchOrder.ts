import { SearchOrderProps } from "@/constants/Types/order";

export const SearchOrder = ({ tables, searchValue }: SearchOrderProps) => {
    let res = false
    for (let i = 0; i < tables.length; i++) {
        if (tables[i].restaurantTable.name.toLowerCase().startsWith(searchValue.toLowerCase())) {
            res = true
        }
    }
    return res
}