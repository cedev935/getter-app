import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../../config/colors";
import AppText from "../AppText";

function ListPastGoalDetails({ item }) {
  return (
    <View style={styles.container}>
      <AppText style={styles.text}>{item.title}</AppText>
      {item.completed ? (
        <FontAwesome
          style={{ paddingLeft: 20 }}
          name="check-square-o"
          size={20}
          color={colors.green}
        />
      ) : (
        <MaterialIcons
          style={{ paddingLeft: 20 }}
          name="check-box-outline-blank"
          size={20}
          color={colors.textWhite}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    padding: 6,
    height: 65,
    paddingLeft: 15,
    backgroundColor: colors.veryFadedWhite,
  },
  text: {
    width: "80%",
    color: colors.textWhite,
  },
});

export default ListPastGoalDetails;
