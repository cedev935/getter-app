import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

function TextCard({ text, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.detailsContainer}>
          <AppText style={styles.text}>{text}</AppText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: "#6a9cf0",
    marginBottom: 20,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 20,
    paddingVertical: 40,
  },
  text: {
    color: colors.textWhite,
    fontWeight: "bold",
    lineHeight: 30,
    textAlign: "center",
  },
});
export default TextCard;
