import React from "react";
import { Image, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

import Screen from "../components/Screen";
import colors from "../config/colors";
import AppButton from "../components/AppButton";

function WelcomeScreen({ navigation }) {
  return (
    <Screen style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        resizeMode="contain"
        style={styles.logo}
      ></Image>
      <LottieView
        style={styles.welcome}
        autoPlay
        loop
        source={require("../assets/animations/welcome.json")}
      />
      <View style={styles.buttonContainer}>
        <AppButton
          title="Begin"
          onPress={() => navigation.navigate("Explanation")}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 30,
    alignItems: "center",
  },
  container: {
    backgroundColor: colors.white,
  },
  logo: {
    aspectRatio: 0.9,
    marginLeft: 65,
    marginTop: -30,
  },
  welcome: {
    position: "absolute",
    bottom: 30,
  },
});

export default WelcomeScreen;
