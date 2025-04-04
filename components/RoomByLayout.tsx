import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import TableView from "./Table";
import { useEffect, useState } from "react";

import { styles } from '../assets/styles/RoomByLayout.styles'
import { useFetch } from "@/hooks/useFetch";
import { TableStatus } from "@/constants/types";

export default function RoomByLayout() {
    const [layout, setLayout] = useState<TableStatus[][]>([])
    // const [loading, setLoading] = useState(true)
    const {data, loading, error} = useFetch(1, '/api/') //do smth

    let d: TableStatus[][] = [
        ['available', 'reserved', 'available'],
        ['occupied', 'reserved', 'occupied'],
        ['available', 'available', 'available']
    ]
    useEffect(() => {
        setLayout(d)
    }, [])

    if (loading) {
        return <ActivityIndicator size='large' color='#0000ff' style={styles.loading}/>
    }
    return (
        <View style={styles.container}>
            {layout.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                    {row.map((status, colIndex) => (
                        <TableView key={colIndex} status={status}/>
                    ))}
                </View>
            ))}
        </View>
    );
}

