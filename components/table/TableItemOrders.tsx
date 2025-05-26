import { useThemeContext } from "@/contexts/ThemeContext";
import { View, Image, Text, TouchableOpacity, ScrollView, ImageSourcePropType } from "react-native";

import { TableProps } from "@/constants/Types/table";
import { createTableItemStyles } from "@/assets/styles/table/TableItemOrders.styles";

import doubleTable from '@/assets/images/table-2.png'
import quadrupleTable from '@/assets/images/table-4.png'
import hextupleTable from '@/assets/images/table-6.png'
import octupleTable from '@/assets/images/table 8.png'

export default function TableItemOrders({ capacity, id, name, status, isSelected, onSelect } : TableProps & {isSelected: boolean, onSelect: (id: number) => void}) {
    const { isDark } = useThemeContext()
    const styles = createTableItemStyles(isDark)
        
    let source: ImageSourcePropType = doubleTable;
    switch (capacity) {
        case 2:
            source = doubleTable
            break
        case 4:
            source = quadrupleTable
            break
        case 6:
            source = hextupleTable
            break
        case 8: 
            source = octupleTable
            break
    }

    return(
        <TouchableOpacity style={[styles.container]} onPress={() => onSelect(id)}>
            <View style={styles.imageContainer}>
                <Image source={source} style={styles.image}/>
            </View>
            <View>
                <Text>{name}</Text>
                <Text>{status}</Text>
            </View>
            {isSelected && <View style={styles.checkbox}><Text style={styles.checkboxTick}>✔</Text></View>}
        </TouchableOpacity>
    )
}