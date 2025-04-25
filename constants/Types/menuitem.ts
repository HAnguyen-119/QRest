import { CategoryProps } from "./category";

export interface MenuItemProps {
    category: CategoryProps,
    description: string,
    imageUrl: string,
    name: string,
    price: number,
    quantity: number // sucks
}

export interface MenuItemIDProps {
    id: number
    category: CategoryProps,
    description: string,
    imageUrl: string,
    name: string,
    price: number,
    quantity: number // sucks
}