import React from "react";
import { Text, StyleSheet, TouchableHighlight } from "react-native";

import colors from "../config/colors";

function AppButton({ title, onPress, buttonStyle }) {
  return (
    <TouchableHighlight
      underlayColor={colors.green}
      style={[styles.button, buttonStyle]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#246EE9",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    marginVertical: 8,
    width: "85%",
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default AppButton;
