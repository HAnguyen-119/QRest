import { StyleSheet } from 'react-native';
import {COLORS} from "@/constants/colors";

export const createAdminTableStyles = (isDark: boolean) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDark ? COLORS.dark : COLORS.light
        },
    
        tableContainer: {
            flex: 1,
            display: 'flex',
            flexDirection: "row",
            flexWrap: 'wrap',
        },

        searchContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            width: '100%'
        },
    
        categories: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: 15,
            alignItems: "center"
        },
    
        blur: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 2,
            backgroundColor: isDark ? COLORS.light : COLORS.dark,
            opacity: 0.5
        }
    })
        
}
