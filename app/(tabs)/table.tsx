import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import TableView from "../../components/Table";
import { useEffect, useState } from "react";

type TableStatus = 'reserved' | 'occupied' | 'available' | 'unknown'

export default function Table() {
    const [layout, setLayout] = useState<TableStatus[][]>([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            //get api data

            const data: TableStatus[][] = [
                ['available', 'reserved', 'available'],
                ['occupied', 'reserved', 'occupied'],
                ['available', 'available', 'available']
            ]
            setLayout(data)
            setLoading(false)
        }
        fetchData()
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loading: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})