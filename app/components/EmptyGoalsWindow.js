import React from "react";
import { StyleSheet } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

function EmptyGoalsWindow({ text = "Not Available" }) {
  return <AppText style={styles.text}>{text}</AppText>;
}

const styles = StyleSheet.create({
  text: {
    color: colors.fadedWhite,
    textAlign: "center",
    fontSize: 25,
    bottom: 5,
  },
});

export default EmptyGoalsWindow;
