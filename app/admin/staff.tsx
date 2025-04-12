import {FlatList, Text, View} from "react-native";
import {useState} from "react";
import {createAdminStyles} from "@/assets/styles/admin/Admin.styles";
import Searcher from "@/components/menu/Searcher";
import StaffInfo from "@/components/staff/StaffInfo";
import StaffPositions from "@/components/staff/StaffPositions";
import { useScrollAnimated } from '@/contexts/ScrollContext'
import Animated from 'react-native-reanimated'
import { useThemeContext } from "@/contexts/ThemeContext";


export default function Staff() {
    const [position, setPosition] = useState<string>("All");
    const [search, setSearch] = useState<string>("");

    const { isDark } = useThemeContext()
    const adminStyles = createAdminStyles(isDark)

    const { scrollHandler } = useScrollAnimated()

    const items = data.filter(item =>
        (position === 'All' || item.position === position)
        && item.name.toLowerCase().includes(search.toLowerCase()));
    // @ts-ignore
    const renderItem = ({item}) => { return (
        <StaffInfo id={item.id}
                  imageUrl={item.imageUrl}
                  name={item.name}
                   age={item.age}
                   address={item.address}
                   phone={item.phone}
                   email={item.email}
                  position={item.position}
                  experience={item.experience}
                    salary={item.salary}>
        </StaffInfo>)
    }

    const handlePosition = (pos: string) => {
        setPosition(pos);
    }

    const handleSearch = (search: string) => {
        setSearch(search);
    }

    return (
        <View style={adminStyles.staffContainer}>
            <Searcher onSearch={handleSearch} children={null}/>
            <StaffPositions handlePosition={handlePosition} />
            <Animated.FlatList
                style={adminStyles.staffInfoContainer}
                data={items}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={1}
                onScroll={scrollHandler}
                scrollEventThrottle={16} 
            />
        </View>
    )
}

export const data = [
    {id: '1', imageUrl: "https://hotelandcatering.com/wp-content/uploads/2018/10/chef-adam-schorr.jpg", name: "Alex", age: 20, address: "Hanoi", phone: "0123456789", email:"abc@gmail.com", position: "Chef", experience: "Food", salary: "Food"},
    {id: '2', imageUrl: "https://i.ex-cdn.com/vietnamfinance.vn/files/news/2024/05/11/gordon-ramsay-1319.jpeg", name: "Gordon Ramsay", age: 20, address: "Hanoi", phone: "0123456789", email:"abc@gmail.com", position: "Chef", experience: "Food", salary: "Food"},
    {id: '3', imageUrl: "https://cafefcdn.com/203337114487263232/2024/6/11/8e383b3e382b3e383b3e38395e382aae383b3e981b8e6898be382a8e38397e383ade383b32dsc07011-1024x683-1718079893324-1718079893710111638780-1718090158091-17180901585751813407605.jpg", name: "Cong Phuong", age: 20, address: "Hanoi", phone: "0123456789", email:"abc@gmail.com", position: "Chef", experience: "Food", salary: "Food"},
    {id: '4', imageUrl: "https://wenewsenglish.pk/wp-content/uploads/2022/11/Ronaldo-2.jpg", name: "Ronaldo", age: 20, address: "Hanoi", phone: "0123456789", email:"abc@gmail.com", position: "Cashier", experience: "Food", salary: "Food"},
    {id: '5', imageUrl: "https://estudyando.com/wp-content/uploads/2025/03/lionel-messi.webp", name: "Messi", age: 20, address: "Hanoi", phone: "0123456789", email:"abc@gmail.com", position: "Cashier", experience: "Food", salary: "Food"},
    {id: '6', imageUrl: "https://img.freepik.com/premium-photo/portrait-handsome-young-waiter-tuxedo-showing-beef-steak-dish-plate-white-wall_171337-54319.jpg", name: "Bob", age: 20, address: "Hanoi", phone: "0123456789", email:"abc@gmail.com", position: "Waiter", experience: "Food", salary: "Food"},
    {id: '7', imageUrl: "https://img.freepik.com/premium-photo/portrait-waitress-serving-food-customers-bar-restaurant_778980-3613.jpg", name: "Christie", age: 20, address: "Hanoi", phone: "0123456789", email:"abc@gmail.com", position: "Waiter", experience: "Food", salary: "Food"},
    {id: '8', imageUrl: "https://img.freepik.com/premium-photo/portrait-waitress-serving-food-customers-bar-restaurant_778980-3614.jpg", name: "Emily", age: 20, address: "Hanoi", phone: "0123456789", email:"abc@gmail.com", position: "Waiter", experience: "Food", salary: "Food"},
    {id: '9', imageUrl: "https://media.istockphoto.com/id/1365404980/photo/happy-man-working-as-a-cashier-at-a-cafe.jpg?s=612x612&w=0&k=20&c=iaU8YR2ci4tZuWnuPTX8owpDdGvHHUJbQyznh4jKAqE=", name: "Henry", age: 20, address: "Hanoi", phone: "0123456789", email:"abc@gmail.com", position: "Cashier", experience: "Food", salary: "Food"},
]