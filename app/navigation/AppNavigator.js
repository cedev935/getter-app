import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

import HomeScreen from "../screens/HomeScreen";
import HistoryScreen from "../screens/HistoryScreen";
import AchievementsScreen from "../screens/AchievementsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import colors from "../config/colors";
import CustomDrawer from "../components/CustomDrawer";
import { Ionicons } from "@expo/vector-icons";
import navigation from "./rootNavigation";

const Drawer = createDrawerNavigator();

const handleNavigationUponNotificationPress = () => {
  Notifications.addNotificationResponseReceivedListener((notification) => {
    navigation.navigate("Home");
  });
};

export default function AppNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: colors.blueBG4 },
        headerStatusBarHeight: Constants.statusBarHeight,
        headerTitle: "",
        headerTransparent: true,
        drawerActiveBackgroundColor: "rgba(78, 201, 176, 0.6)",
        // drawerActiveTintColor: colors.white,
        // drawerInactiveTintColor: "#6cd2bd",
        drawerContentStyle: { backgroundColor: colors.royalBlueLight },
        drawerLabelStyle: {
          color: colors.textWhite,
          fontWeight: "bold",
          fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
          fontSize: 17,
          marginLeft: -20,
        },

        headerTintColor: colors.textWhite, // menu button color
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: () => (
            <Ionicons name="home-outline" size={22} color={colors.white} />
          ),
        }}
      />
      <Drawer.Screen
        name="History"
        component={HistoryScreen}
        options={{
          drawerIcon: () => (
            <Ionicons name="timer-outline" size={22} color={colors.white} />
          ),
        }}
      />
      <Drawer.Screen
        name="Achievements"
        component={AchievementsScreen}
        options={{
          drawerIcon: () => (
            <Ionicons
              name="md-star-half-outline"
              size={22}
              color={colors.white}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: () => (
            <Ionicons name="settings-outline" size={22} color={colors.white} />
          ),
          headerTransparent: false,
          headerTitle: "Settings",
        }}
      />
    </Drawer.Navigator>
  );
}

export { handleNavigationUponNotificationPress };
