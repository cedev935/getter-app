import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";

function SettingSubsectionSeperator(props) {
  return (
    <>
      <View style={styles.container} />
      <View style={{ paddingTop: 10 }} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: colors.slightlyFadedWhite,
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: "95%",
    alignSelf: "center",
    paddingTop: 10,
  },
});

export default SettingSubsectionSeperator;
