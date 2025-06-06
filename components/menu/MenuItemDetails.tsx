import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { createMenuStyles } from "@/assets/styles/menu/Menu.styles";
import Animated from "react-native-reanimated";
import { useThemeContext } from "@/contexts/ThemeContext";
import DeleteConfirmView from "@/components/admin/DeleteConfirmView";
import { useState } from "react";
import {COLORS} from "@/constants/colors";

// @ts-ignore
export default function MenuItemDetails({ data, id, handleBack, handleEdit, handleDelete, containerStyle }) {

  const item = data.find((item: { id: number; }) => item.id === id);

  const [isDelete, setIsDelete] = useState<boolean>(false);

  const { isDark } = useThemeContext()
  const menuStyles = createMenuStyles(isDark)
  return (
    <Animated.View style={containerStyle}>
      <TouchableOpacity style={menuStyles.backButton} onPress={handleBack}>
        <Text style={menuStyles.text}>Back</Text>
      </TouchableOpacity>
      <View style={menuStyles.imageContainer}>
        <Image style={menuStyles.image} source={{ uri: item?.imageUrl }}></Image>
      </View>
      <View style={menuStyles.nameContainer}>
        <Text style={[menuStyles.text, menuStyles.name]}>{item?.name}</Text>
      </View>
      <View style={menuStyles.detailsContainer}>
        <Text style={[menuStyles.text, {color: COLORS.dark, fontSize: 20}]}>{item?.description}</Text>
        <Text style={menuStyles.text}>{item?.ingredients}</Text>
        <TouchableOpacity style={menuStyles.editButton} onPress={handleEdit}>
          <Text style={menuStyles.text}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={menuStyles.editButton} onPress={() => { setIsDelete(true) }}>
          <Text style={menuStyles.text}>Delete</Text>
        </TouchableOpacity>
      </View>
      {isDelete && (
        <DeleteConfirmView
          name={item?.name}
          content={"menu item"}
          handleDelete={() => { handleDelete(id); setIsDelete(false) }}
          handleCancel={() => setIsDelete(false)}
        ></DeleteConfirmView>
      )}
    </Animated.View>
  )
}

