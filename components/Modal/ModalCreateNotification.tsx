import { COLORS } from "@/constants/colors";
import { fetchAPI } from "@/services/fetchAPI";
import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function ModalCreateNotification({ visible, onClose, onSubmit, placeholder = "Enter text..." }) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    fetchAPI.sendNotification(input); // Add this line
    onSubmit(input);
    setInput("");
    onClose();
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Incident Report</Text>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder={placeholder}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onClose} style={styles.button}>
              <Text style={styles.button}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.button}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: COLORS.light,
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: "Josefin-Sans"
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: "100%",
    padding: 10,
    marginBottom: 20,
    fontFamily: "Josefin-Sans"
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    fontFamily: "Josefin-Sans"
  },
  button: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    fontFamily: "Josefin-Sans"
  },
});