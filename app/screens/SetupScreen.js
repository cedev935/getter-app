import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import * as Notifications from "expo-notifications";

import colors from "../config/colors";
import { TimePickerButton } from "../components/time/TimePickerButton";
import AppPicker from "../components/AppPicker";
import {
  updateSetupCompletedStorage,
  setDailyNotificationTimeStorage,
  setWeeklyNotificationTimeStorage,
  setWeeklyNotificationDayStorage,
  enableDailyNotificationStorage,
  enableWeeklyNotificationStorage,
  setDailyResetIndicatorStorage,
  setWeeklyResetIndicatorStorage,
} from "../storage/setters";
import { getDailyNotificationTimeStorage } from "../storage/getters";
import { requestPermissionsAsync } from "expo-notifications";
import useAuth from "../auth/useAuth";
import {
  cancelAllScheduledNotifications, // delete this later
  scheduleFirstDailyNotification,
  scheduleSecondDailyNotification,
  scheduleThirdDailyNotification,
  scheduleFirstWeeklyNotification,
  scheduleSecondWeeklyNotification,
  scheduleThirdWeeklyNotification,
} from "../notifications/notifications";
import { findDate } from "../config/findDate";

const days = [
  { label: "Sunday", value: 1 },
  { label: "Monday", value: 2 },
  { label: "Tuesday", value: 3 },
  { label: "Wednesday", value: 4 },
  { label: "Thursday", value: 5 },
  { label: "Friday", value: 6 },
  { label: "Saturday", value: 7 },
];

function SetupScreen({ navigation }) {
  const [dailyNotificationTime, setDailyNotificationTime] = useState(
    new Date(Date.now())
  );
  const [weeklyNotificationTime, setWeeklyNotificationTime] = useState(
    new Date(Date.now())
  );
  const [weeklyNotificationDay, setWeeklyNotificationDay] = useState(days[0]);

  const { setupCompleted, setSetupCompleted, complete } = useAuth();

  useEffect(() => {
    registerForPushNotification().then((token) => console.log(token));
    // cancelAllScheduledNotifications();
  }, []);

  const registerForPushNotification = async () => {
    const { status } = await requestPermissionsAsync();
    if (status != "granted") {
      const { status } = await requestPermissionsAsync();
    }
    if (status !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    return token;
  };

  const scheduleNotifications = () => {
    const dailyHour = dailyNotificationTime.getHours();
    const dailyMinute = dailyNotificationTime.getMinutes();
    const weeklyHour = weeklyNotificationTime.getHours();
    const weeklyMinute = weeklyNotificationTime.getMinutes();

    scheduleFirstDailyNotification(dailyHour, dailyMinute);
    scheduleSecondDailyNotification(dailyHour, dailyMinute);
    scheduleThirdDailyNotification(dailyHour, dailyMinute);
    scheduleFirstWeeklyNotification(
      weeklyHour,
      weeklyMinute,
      weeklyNotificationDay.value
    );
    scheduleSecondWeeklyNotification(
      weeklyHour,
      weeklyMinute,
      weeklyNotificationDay.value
    );
    scheduleThirdWeeklyNotification(
      weeklyHour,
      weeklyMinute,
      weeklyNotificationDay.value
    );
  };

  return (
    <ImageBackground
      source={require("../assets/f.jpg")} // d, f, g
      resizeMode="cover"
      style={{ flex: 1, justifyContent: "center" }}
    >
      <View style={styles.detailsContainer}>
        <AppText style={styles.text}>
          Pick a time to receive the daily notification:
        </AppText>
        <TimePickerButton
          time={dailyNotificationTime}
          setTime={setDailyNotificationTime}
          buttonTitle={dailyNotificationTime.toTimeString().substring(0, 5)}
          buttonStyle={{ width: "40%", alignSelf: "center", marginTop: -20 }}
        />
        <AppText style={[styles.text, { bottom: 30 }]}>
          Pick a day and time to receive the weekly notification:
        </AppText>
        <View style={[styles.weekTimeContainer, { bottom: 15 }]}>
          <AppPicker
            selectedItem={weeklyNotificationDay}
            onSelectItem={(item) => setWeeklyNotificationDay(item)}
            items={days}
            icon="apps"
            placeholder="Day"
            pickerStyle={{ width: "60%" }}
          />
          <TimePickerButton
            time={weeklyNotificationTime}
            setTime={setWeeklyNotificationTime}
            buttonTitle={weeklyNotificationTime.toTimeString().substring(0, 5)}
            buttonStyle={{
              width: "80%",
              alignSelf: "center",
              marginRight: -25,
            }}
          />
        </View>
        <AppText style={styles.comment}>
          *We highly recommend you to set it as early as possible during the day
        </AppText>
      </View>

      <View style={styles.nextButtonContainer}>
        <AppButton
          title="Finish"
          onPress={() => {
            setDailyNotificationTimeStorage(dailyNotificationTime);
            setWeeklyNotificationTimeStorage(weeklyNotificationTime);
            setWeeklyNotificationDayStorage(weeklyNotificationDay);
            enableDailyNotificationStorage();
            enableWeeklyNotificationStorage();
            scheduleNotifications();
            setDailyResetIndicatorStorage(dailyNotificationTime);

            let date = new Date();
            const addition = findDate(weeklyNotificationDay.value);
            date.setDate(date.getDate() - ((date.getDay() + addition) % 7));
            date.setHours(
              weeklyNotificationTime.getHours(),
              weeklyNotificationTime.getMinutes()
            );

            console.log("setup weekly date", date);
            setWeeklyResetIndicatorStorage(date);

            complete();
          }}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  nextButtonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 30,
    alignItems: "center",
  },
  detailsContainer: {
    // rgba(156, 196, 240, 0.9)
    height: "50%",
    width: "95%",
    backgroundColor: "rgba(256, 256, 256, 0.9)",
    borderRadius: 20,
    padding: 20,
    paddingTop: 30,
    position: "absolute",
    alignSelf: "center",
  },
  comment: {
    fontSize: 14,
    paddingBottom: 5,
    color: colors.black,
  },
  container: {
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  weekTimeContainer: {
    flexDirection: "row",
  },
  text: {
    color: colors.black,
  },
});

export default SetupScreen;
