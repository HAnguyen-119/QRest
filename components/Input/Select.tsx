import React, { useState } from "react";
import { SelectGroupProps } from "@/constants/Types/function";
import { useThemeContext } from "@/contexts/ThemeContext";
import { TouchableOpacity, View, Text, StyleSheet, Modal, FlatList } from "react-native";
import { createGlobalStyles } from "@/assets/styles/Global.styles";
import { COLORS } from "@/constants/colors";

export default function SelectGroup({ options, selectedValue, onSelect }: SelectGroupProps) {
    const { isDark } = useThemeContext();
    const [isDropdownVisible, setIsDropdownVisible] = useState(false); 
    const globalStyles = createGlobalStyles(isDark)

    const handleSelect = (option: number) => {
        onSelect(option)
        setIsDropdownVisible(false)
    }

    return (
        <View>
            <View style={styles.selectContainer}>
                <TouchableOpacity
                    style={[
                        styles.dropdownButton,
                        globalStyles.background,
                    ]}
                    onPress={() => setIsDropdownVisible(true)} 
                >
                    <Text style={[styles.dropdownButtonText, globalStyles.text]}>
                        {selectedValue} 
                    </Text>
                </TouchableOpacity>
            </View>

            <Modal
                visible={isDropdownVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setIsDropdownVisible(false)} 
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, globalStyles.background]}>
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.optionButton,
                                        styles.optionButtonSelected,
                                    ]}
                                    onPress={() => handleSelect(item)} 
                                >
                                    <Text
                                        style={[
                                            styles.optionText,
                                            styles.optionTextSelected,
                                            globalStyles.text
                                        ]}
                                    >
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    dropdownButton: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginVertical: 10,
        width: 80
    },
    dropdownButtonText: {
        fontSize: 16,
        textAlign: 'center'
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: "80%",
        maxHeight: "50%",
        borderRadius: 8,
        padding: 10,
    },
    optionButton: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    optionButtonSelected: {
        backgroundColor: COLORS.thumbLight,
    },
    optionText: {
        fontSize: 16,
    },
    optionTextSelected: {
        fontWeight: "bold",
        color: "#fff",
    },
    selectContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    }
});