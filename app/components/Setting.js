import React from "react";
import { StyleSheet, Switch, TouchableHighlight } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";
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

function Setting({
  onPress,
  title,
  value,
  isSwitch,
  setSwitchValue,
  enableSwitchStorage,
  disableSwitchStorage,
  type,
  notificationTime,
  notificationDay,
}) {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={styles.settingContainer}
      underlayColor={colors.fadedWhite}
    >
      <>
        <AppText style={styles.settingName}>{title}</AppText>
        {isSwitch ? (
          <Switch
            value={value}
            onValueChange={(newValue) => {
              if (newValue) {
                enableSwitchStorage();
                setSwitchValue(true);
                if (type == "day") {
                  scheduleFirstDailyNotification(
                    notificationTime.getHours(),
                    notificationTime.getMinutes()
                  );
                  scheduleSecondDailyNotification(
                    notificationTime.getHours(),
                    notificationTime.getMinutes()
                  );
                  scheduleThirdDailyNotification(
                    notificationTime.getHours(),
                    notificationTime.getMinutes()
                  );
                } else {
                  scheduleFirstWeeklyNotification(
                    notificationTime.getHours(),
                    notificationTime.getMinutes(),
                    notificationDay.value
                  );
                  scheduleSecondWeeklyNotification(
                    notificationTime.getHours(),
                    notificationTime.getMinutes(),
                    notificationDay.value
                  );
                  scheduleThirdWeeklyNotification(
                    notificationTime.getHours(),
                    notificationTime.getMinutes(),
                    notificationDay.value
                  );
                }
              } else {
                disableSwitchStorage();
                setSwitchValue(false);
                if (type == "day") {
                  cancelFirstDailyNotification();
                  cancelSecondDailyNotification();
                  cancelThirdDailyNotification();
                } else {
                  cancelFirstWeeklyNotification();
                  cancelSecondWeeklyNotification();
                  cancelThirdWeeklyNotification();
                }
              }
            }}
            style={styles.switch}
          />
        ) : (
          <AppText style={styles.settingValue}>{value}</AppText>
        )}
      </>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  settingValue: {
    right: 20,
    position: "absolute",
    top: 22,
    color: colors.light,
    fontSize: 15,
    fontWeight: "bold",
  },
  settingName: {
    color: colors.light,
    fontSize: 15,
  },

  settingContainer: {
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  switch: {
    right: 20,
    position: "absolute",
    top: 10,
  },
});

export default Setting;
