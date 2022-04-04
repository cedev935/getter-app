import React, { useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

import AppButton from "../components/AppButton";
import TextCard from "../components/TextCard";
import colors from "../config/colors";
import { useFocusEffect } from "@react-navigation/native";

function ExplanationScreen({ navigation }) {
  const text1 =
    "We're going to guide you through our app's setup. You will be done within two shakes of a lamb's tail!";
  const text2 =
    "getter will help you achieve your daily and weekly goals in a very simple manner";
  const text3 =
    "Every morning you will be asked to type your daily goals for that day. You will be updated later in the day of your progress so far.";
  const text4 =
    "In the same way, you will be asked every week what your goals are for that week. You will be updated every few days of your progress.";
  const text5 =
    "So let's set up your preferred times to receive our notifications";

  const [text, setText] = useState(text1);
  const [phase, setPhase] = useState(1);

  useFocusEffect(
    // loads everytime I open the drawer tab
    React.useCallback(() => {
      setPhase(1);
      setText(text1);
    }, [])
  );

  return (
    <ImageBackground
      source={require("../assets/f.jpg")} // d, f, g
      resizeMode="cover"
      style={{ flex: 1, justifyContent: "center" }}
    >
      <View style={styles.cardContainer}>
        <TextCard text={text}></TextCard>
      </View>

      <View style={styles.buttonContainer}>
        <AppButton
          title="next"
          onPress={() => {
            if (phase == 1) setText(text2);
            if (phase == 2) setText(text3);
            if (phase == 3) setText(text4);
            if (phase == 4) setText(text5);
            if (phase >= 5) navigation.navigate("Setup");
            setPhase(phase + 1);
          }}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 30,
    alignItems: "center",
  },
  cardContainer: {
    padding: 20,
    position: "absolute",
    alignSelf: "center",
  },
  container: {
    justifyContent: "center",
    backgroundColor: colors.white,
  },
});

export default ExplanationScreen;
