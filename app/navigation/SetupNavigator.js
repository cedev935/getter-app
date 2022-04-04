import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SetupScreen from "../screens/SetupScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import ExplanationScreen from "../screens/ExplanationScreen";

const Stack = createStackNavigator();

const SetupNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="Explanation" component={ExplanationScreen} />
    <Stack.Screen name="Setup" component={SetupScreen} />
  </Stack.Navigator>
);

export default SetupNavigator;
