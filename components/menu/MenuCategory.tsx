import {TouchableOpacity, Text} from "react-native";

import { useThemeContext } from "@/contexts/ThemeContext";
import { createAdminStyles } from "@/assets/styles/admin/Admin.styles";
import {useState} from "react";
import {COLORS} from "@/constants/colors";
import Icon from "../Icon/Icon";
import { CATEICON } from "@/constants/size";

// @ts-ignore
export default function MenuCategory({content, handlePress, selectingCategory}) {
    const { isDark } = useThemeContext()
    const adminStyles = createAdminStyles(isDark)


    return (
        <TouchableOpacity style={[adminStyles.menuCategory,
                                {backgroundColor: selectingCategory === content ?
                                        (isDark ? COLORS.light : COLORS.dark) : (isDark ? COLORS.dark : COLORS.light)}]}
                          onPress={() => {
                              handlePress(content);
                          }}>
            <Text style={[adminStyles.text, {color: selectingCategory === content ?
                    (isDark ? COLORS.dark : COLORS.light) : (isDark ? COLORS.light : COLORS.dark)}]}>{content}</Text>
        </TouchableOpacity>
    )
}