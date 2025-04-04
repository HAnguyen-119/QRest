import React from "react";
import { View, Text, StyleSheet } from 'react-native'

type TableViewProps = {
    status: 'reserved' | 'occupied' | 'available' | 'unknown'
}

export default function TableView({ status }: TableViewProps) {
    let statusStyle
    let statusText
    switch (status) {
        case 'reserved': 
            statusStyle = styles.reserved
            statusText = 'Reserved'
            break
        case 'occupied': 
            statusStyle = styles.occupied
            statusText = 'Occupied'
            break
        case 'available': 
            statusStyle = styles.available
            statusText = 'Available'
            break
        default:
            statusStyle = styles.unknown
            statusText = 'Unknown'
        
    }
    return (
        <View style={[styles.table, statusStyle]}>
            <Text style={styles.text}>{statusText}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    table: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    reserved: {},
    occupied: {},
    available: {},
    unknown: {},
    text: {}
})