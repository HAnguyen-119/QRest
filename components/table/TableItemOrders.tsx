import { useThemeContext } from "@/contexts/ThemeContext";
import { View, Image, Text, TouchableOpacity, ScrollView, ImageSourcePropType } from "react-native";

import { TableProps } from "@/constants/Types/table";
import { createTableItemStyles } from "@/assets/styles/table/TableItemOrders.styles";

import doubleTable from '@/assets/images/table-2.png'
import quadrupleTable from '@/assets/images/table-4.png'
import hextupleTable from '@/assets/images/table-6.png'
import octupleTable from '@/assets/images/table 8.png'
import { createGlobalStyles } from "@/assets/styles/Global.styles";
import { COLORS } from "@/constants/colors";

export default function TableItemOrders({ capacity, id, name, status, isSelected, onSelect } : TableProps & {isSelected: boolean, onSelect: (id: number) => void}) {
    const { isDark } = useThemeContext()
    const styles = createTableItemStyles(isDark)
    const globalStyles = createGlobalStyles(isDark)
        
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
        <TouchableOpacity style={[styles.container, globalStyles.borderColor]} onPress={() => onSelect(id)}>
            <View style={styles.imageContainer}>
                <Image source={source} style={styles.image}/>
            </View>
            <View style={[styles.tableInfo ]}>
                <Text style={[globalStyles.textBold, styles.tableName]}>{name}</Text>
                <Text style={{color: COLORS.reserveButton}}>{status}</Text>
            </View>
            {isSelected && <View style={styles.checkbox}><Text style={styles.checkboxTick}>✔</Text></View>}
        </TouchableOpacity>
    )
}