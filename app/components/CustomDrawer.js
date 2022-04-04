import React from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import colors from "../config/colors";

function CustomDrawer(props) {
  return (
    // <View style={{ flex: 1, width: 100 }}>
    <ImageBackground
      source={require("../assets/blue_background5.jpg")}
      style={{
        flex: 1,
        justifyContent: "center",
        paddingTop: Constants.statusBarHeight,
      }}
    >
      <View style={{ backgroundColor: colors.white, top: -24 }}>
        <Image
          source={require("../assets/logo.png")}
          resizeMode="stretch"
          style={styles.logo}
        ></Image>
      </View>

      <DrawerContentScrollView style={{ top: -24 }} {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 170,
    width: "100%",
    right: 5,
  },
});

export default CustomDrawer;
