import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import colors from "../config/colors";

function CircularProgressIndicator({
  value,
  title,
  activeStrokeColor,
  activeStrokeSecondaryColor,
  inActiveStrokeColor,
}) {
  return (
    <View style={styles.container}>
      <CircularProgress
        radius={50}
        value={value}
        textColor="#222"
        fontSize={20}
        valueSuffix={"%"}
        title={title}
        titleStyle={{ fontWeight: "bold", color: colors.blueBG3, fontSize: 17 }}
        activeStrokeColor={activeStrokeColor}
        activeStrokeSecondaryColor={activeStrokeSecondaryColor}
        inActiveStrokeColor={inActiveStrokeColor}
        inActiveStrokeOpacity={0.2}
        inActiveStrokeWidth={6}
        duration={1000}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CircularProgressIndicator;
