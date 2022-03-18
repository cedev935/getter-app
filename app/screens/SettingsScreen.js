import React, { useEffect, useState } from "react";
import { Button, FlatList, Modal, Platform, StyleSheet } from "react-native";
import Constants from "expo-constants";
import DateTimePicker from "@react-native-community/datetimepicker";

import Screen from "../components/Screen";
import colors from "../config/colors";
import AppText from "../components/AppText";
import {
  setDailyNotificationTimeStorage,
  setWeeklyNotificationTimeStorage,
  setWeeklyNotificationDayStorage,
  enableDailyNotificationStorage,
  enableWeeklyNotificationStorage,
  disableDailyNotificationStorage,
  disableWeeklyNotificationStorage,
  setDailyResetIndicatorStorage,
  setWeeklyResetIndicatorStorage,
} from "../storage/setters";
import {
  getDailyNotificationTimeStorage,
  getWeeklyNotificationTimeStorage,
  getWeeklyNotificationDayStorage,
  getEnableDailyNotificationStorage,
  getEnableWeeklyNotificationStorage,
} from "../storage/getters";
import {
  cancelAllScheduledNotifications,
  scheduleFirstDailyNotification,
  cancelFirstDailyNotification,
  scheduleSecondDailyNotification,
  cancelSecondDailyNotification,
  scheduleThirdDailyNotification,
  cancelThirdDailyNotification,
  scheduleFirstWeeklyNotification,
  cancelFirstWeeklyNotification,
  scheduleSecondWeeklyNotification,
  cancelSecondWeeklyNotification,
  scheduleThirdWeeklyNotification,
  cancelThirdWeeklyNotification,
} from "../notifications/notifications";
import Setting from "../components/Setting";
import SettingSubsectionSeperator from "../components/SettingSubsectionSeperator";
import PickerItem from "../components/PickerItem";
import { findDate } from "../config/findDate";
import { displayModificationAlert } from "../alerts/modificationAlert";

const days = [
  { label: "Sunday", value: 1 },
  { label: "Monday", value: 2 },
  { label: "Tuesday", value: 3 },
  { label: "Wednesday", value: 4 },
  { label: "Thursday", value: 5 },
  { label: "Friday", value: 6 },
  { label: "Saturday", value: 7 },
];

function SettingsScreen(props) {
  const [dailyNotificationTime, setDailyNotificationTime] = useState(
    new Date(Date.now())
  );
  const [weeklyNotificationTime, setWeeklyNotificationTime] = useState(
    new Date(Date.now())
  );
  const [weeklyNotificationDay, setWeeklyNotificationDay] = useState(null);

  const [showDailyNotificationTimePicker, setShowDailyNotificationTimePicker] =
    useState(false);
  const [
    showWeeklyNotificationTimePicker,
    setShowWeeklyNotificationTimePicker,
  ] = useState(false);
  const [showWeeklyNotificationDayPicker, setShowWeeklyNotificationDayPicker] =
    useState(false);

  const [enableDailyNotification, setEnableDailyNotification] = useState(true);

  const [enableWeeklyNotification, setEnableWeeklyNotification] =
    useState(true);

  const [dayPickerModalVisible, setDayPickerModalVisible] = useState(false);

  const [weeklyResetIndicator, setWeeklyResetIndicator] = useState(new Date());

  useEffect(() => {
    getDailyNotificationTimeStorage(setDailyNotificationTime);
    getWeeklyNotificationTimeStorage(setWeeklyNotificationTime);
    getWeeklyNotificationDayStorage(setWeeklyNotificationDay);
    getEnableDailyNotificationStorage(setEnableDailyNotification);
    getEnableWeeklyNotificationStorage(setEnableWeeklyNotification);
  }, []);

  const onChangeDailyNotificationTime = (event, selectedTime) => {
    const currentTime = selectedTime || dailyNotificationTime;
    setShowDailyNotificationTimePicker(Platform.OS === "ios");
    if (selectedTime) {
      // if selectedTime isn't null, it means we selected a time and pressed "ok"

      displayModificationAlert(
        "Modifying reset time might delete current progress",
        () => {
          setDailyNotificationTime(currentTime);
          setDailyNotificationTimeStorage(currentTime);
          setDailyResetIndicatorStorage(currentTime);

          // Gotta first cancel the notifications before changing the time
          cancelFirstDailyNotification();
          cancelSecondDailyNotification();
          cancelThirdDailyNotification();

          if (enableDailyNotification) {
            scheduleFirstDailyNotification(
              currentTime.getHours(),
              currentTime.getMinutes()
            );
            scheduleSecondDailyNotification(
              currentTime.getHours(),
              currentTime.getMinutes()
            );
            scheduleThirdDailyNotification(
              currentTime.getHours(),
              currentTime.getMinutes()
            );
          }
          let date = new Date();
          date.setHours(currentTime.getHours(), currentTime.getMinutes());
          console.log("settings daily date", date);
          setDailyResetIndicatorStorage(date);
        }
      );
    }
  };

  const onChangeWeeklyNotificationTime = (event, selectedTime) => {
    const currentTime = selectedTime || weeklyNotificationTime;
    setShowWeeklyNotificationTimePicker(Platform.OS === "ios");
    if (selectedTime) {
      displayModificationAlert(
        "Modifying reset time might delete current progress",
        () => {
          setWeeklyNotificationTime(currentTime);
          setWeeklyNotificationTimeStorage(currentTime);
          setWeeklyResetIndicatorStorage(currentTime);

          cancelFirstWeeklyNotification();
          cancelSecondWeeklyNotification();
          cancelThirdWeeklyNotification();

          if (enableWeeklyNotification) {
            scheduleFirstWeeklyNotification(
              currentTime.getHours(),
              currentTime.getMinutes(),
              weeklyNotificationDay.value
            );
            scheduleSecondWeeklyNotification(
              currentTime.getHours(),
              currentTime.getMinutes(),
              weeklyNotificationDay.value
            );
            scheduleThirdWeeklyNotification(
              currentTime.getHours(),
              currentTime.getMinutes(),
              weeklyNotificationDay.value
            );
          }
          let date = new Date();
          const addition = findDate(weeklyNotificationDay.value);
          date.setDate(date.getDate() - ((date.getDay() + addition) % 7));

          date.setHours(currentTime.getHours(), currentTime.getMinutes());
          console.log("setting weekly date", date);
          setWeeklyResetIndicatorStorage(date);
        }
      );
    }
  };

  return (
    <Screen
      style={{
        paddingTop: Constants.statusBarHeight - 10,
        backgroundColor: colors.blueBG2,
      }}
    >
      {showDailyNotificationTimePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dailyNotificationTime}
          mode={"time"}
          is24Hour={true}
          display="default"
          onChange={onChangeDailyNotificationTime}
        />
      )}
      {showWeeklyNotificationTimePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={weeklyNotificationTime}
          mode={"time"}
          is24Hour={true}
          display="default"
          onChange={onChangeWeeklyNotificationTime}
        />
      )}

      <Modal
        visible={dayPickerModalVisible}
        animationType="slide"
        onRequestClose={() => setDayPickerModalVisible(false)}
      >
        <Screen style={{ height: 200 }}>
          <Button
            title="Close"
            onPress={() => setDayPickerModalVisible(false)}
          />
          <FlatList
            data={days}
            keyExtractor={(item) => item.value.toString()}
            renderItem={({ item }) => (
              <PickerItem
                label={item.label}
                onPress={() => {
                  displayModificationAlert(
                    "Modifying reset time might delete current progress",
                    () => {
                      setWeeklyNotificationDay(item);
                      setWeeklyNotificationDayStorage(item);

                      let date = new Date();
                      const addition = findDate(item.value);
                      date.setDate(
                        date.getDate() - ((date.getDay() + addition) % 7)
                      );

                      date.setHours(
                        weeklyNotificationTime.getHours(),
                        weeklyNotificationTime.getMinutes()
                      );
                      console.log("setting weekly date", date);
                      setWeeklyResetIndicatorStorage(date);

                      setDayPickerModalVisible(false);
                    }
                  );
                }}
              />
            )}
          />
        </Screen>
      </Modal>

      <AppText style={styles.sectionTitle}>Notifications</AppText>
      <Setting
        title="Receive Daily Notifications"
        value={enableDailyNotification}
        isSwitch={true}
        setSwitchValue={setEnableDailyNotification}
        enableSwitchStorage={enableDailyNotificationStorage}
        disableSwitchStorage={disableDailyNotificationStorage}
        type="day"
        notificationTime={dailyNotificationTime}
      />
      <Setting
        title="Daily Reset Time"
        value={dailyNotificationTime.toTimeString().substring(0, 5)}
        onPress={() => {
          setShowDailyNotificationTimePicker(true);
        }}
      />
      <SettingSubsectionSeperator />
      <Setting
        title="Receive Weekly Notifications"
        value={enableWeeklyNotification}
        isSwitch={true}
        setSwitchValue={setEnableWeeklyNotification}
        enableSwitchStorage={enableWeeklyNotificationStorage}
        disableSwitchStorage={disableWeeklyNotificationStorage}
        type="week"
        notificationTime={weeklyNotificationTime}
        notificationDay={weeklyNotificationDay}
      />
      <Setting
        title="Weekly Reset Time"
        value={weeklyNotificationTime.toTimeString().substring(0, 5)}
        onPress={() => {
          setShowWeeklyNotificationTimePicker(true);
        }}
      />
      <Setting
        title="Weekly Reset Day"
        value={weeklyNotificationDay ? weeklyNotificationDay.label : null}
        onPress={() => {
          setDayPickerModalVisible(true);
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    color: "#ffdc9d",
    fontWeight: "bold",
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
});

export default SettingsScreen;
