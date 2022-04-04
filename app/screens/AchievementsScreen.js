import React from "react";
import { StyleSheet } from "react-native";
import Constants from "expo-constants";

import EmptyGoalsWindow from "../components/EmptyGoalsWindow";
import Screen from "../components/Screen";
import colors from "../config/colors";

function AchievementsScreen(props) {
  return (
    <Screen style={styles.container}>
      <EmptyGoalsWindow text="Coming Soon" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight - 25,
    backgroundColor: colors.blueBG4,
    justifyContent: "center",
  },
});

export default AchievementsScreen;
