import { ImageSourcePropType } from "react-native"
import { MenuItemIDProps } from "./menuitem"
import { ComboItemProps } from "./order"

export type GetData = 'orders' | 'foods' | 'categories' | 'tables' | 'combos' 
                    | 'reservations' | 'completed_orders' | 'pending_orders'

export interface UtilsPriceProps {
    data: MenuItemIDProps[] | ComboItemProps[],
    id: number,
    quantity: number
}

// selectgroupoption props
export interface SelectGroupProps {
  options: number[],
  selectedValue: number,
  onSelect: (value: number) => void
}

export interface ToggleType {
  src: ImageSourcePropType,
  width: number,
  height: number,
  count: number | null,
}