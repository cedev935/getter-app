import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as Notifications from "expo-notifications";

import navigationTheme from "./app/navigation/navigationTheme";
import SetupNavigator from "./app/navigation/SetupNavigator";
import AppNavigator from "./app/navigation/AppNavigator";
import { getSetupCompleted } from "./app/storage/getters";
import { testResetSetupCompletedStorage } from "./app/storage/setters";
import AuthContext from "./app/auth/context";
import { navigationRef } from "./app/navigation/rootNavigation";

export default function App() {
  const [setupCompleted, setSetupCompleted] = useState(true);

  useEffect(() => {
    // testResetSetupCompletedStorage();
    // Notifications.cancelAllScheduledNotificationsAsync();
    getSetupCompleted(setSetupCompleted);
  }, []);

  return (
    // the Provider wrapper allows all the sub components inside it to inherit the object "{ setupCompleted, setSetupCompleted }" by context
    <AuthContext.Provider value={{ setupCompleted, setSetupCompleted }}>
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        {setupCompleted ? <AppNavigator /> : <SetupNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
