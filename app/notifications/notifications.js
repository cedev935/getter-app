import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { handleNavigationUponNotificationPress } from "../navigation/AppNavigator";

function cancelAllScheduledNotifications() {
  Notifications.cancelAllScheduledNotificationsAsync();
}

// Daily Notification handlers

async function scheduleFirstDailyNotification(hour, minute) {
  try {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Let's set up our goals for today",
        body: "It's gonna be a great day!",
      },
      trigger: {
        hour: hour,
        minute: minute,
        repeats: true,
      },
    });
    handleNavigationUponNotificationPress();
    await AsyncStorage.setItem("firstDailyNotificationIdentifier", id);
  } catch (error) {
    console.log("scheduleFirstDailyNotification", error);
  }
}

async function cancelFirstDailyNotification() {
  try {
    const result = await AsyncStorage.getItem(
      "firstDailyNotificationIdentifier"
    );
    if (result !== null) {
      await Notifications.cancelScheduledNotificationAsync(result);
    }
  } catch (error) {
    console.log("cancelFirstDailyNotification", error);
  }
}

async function scheduleSecondDailyNotification(hour, minute) {
  let midDay = hour + 10;
  if (hour >= 14) midDay = parseInt((hour + 10) % 23) - 1;

  try {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Today is coming to a close",
        body: "Let's check our progress so far",
      },
      trigger: {
        hour: midDay,
        minute: minute,
        repeats: true,
      },
    });
    handleNavigationUponNotificationPress();
    await AsyncStorage.setItem("secondDailyNotificationIdentifier", id);
  } catch (error) {
    console.log("scheduleSecondDailyNotification", error);
  }
}

async function cancelSecondDailyNotification() {
  try {
    const result = await AsyncStorage.getItem(
      "secondDailyNotificationIdentifier"
    );
    if (result !== null) {
      await Notifications.cancelScheduledNotificationAsync(result);
    }
  } catch (error) {
    console.log("cancelSecondDailyNotification", error);
  }
}

async function scheduleThirdDailyNotification(hour, minute) {
  let DayEnd = hour + 13;
  if (hour >= 11) DayEnd = parseInt((hour + 13) % 23) - 1;

  try {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "We are done for today!",
        body: "Let's check if we finished all of our goals",
      },
      trigger: {
        hour: DayEnd,
        minute: minute,
        repeats: true,
      },
    });
    handleNavigationUponNotificationPress();
    await AsyncStorage.setItem("thirdDailyNotificationIdentifier", id);
  } catch (error) {
    console.log("scheduleThirdDailyNotification", error);
  }
}

async function cancelThirdDailyNotification() {
  try {
    const result = await AsyncStorage.getItem(
      "thirdDailyNotificationIdentifier"
    );
    if (result !== null) {
      await Notifications.cancelScheduledNotificationAsync(result);
    }
  } catch (error) {
    console.log("cancelThirdDailyNotification", error);
  }
}

// Weekly Notification handlers

async function scheduleFirstWeeklyNotification(hour, minute, weekday) {
  try {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Let's set up our goals for this week",
        body: "What do you to accomplish in the next few days?",
      },
      trigger: {
        weekday: weekday,
        hour: hour,
        minute: minute,
        repeats: true,
      },
    });
    handleNavigationUponNotificationPress();
    await AsyncStorage.setItem("firstWeeklyNotificationIdentifier", id);
  } catch (error) {
    console.log("scheduleFirstWeeklyNotification", error);
  }
}

async function cancelFirstWeeklyNotification() {
  try {
    const result = await AsyncStorage.getItem(
      "firstWeeklyNotificationIdentifier"
    );
    if (result !== null) {
      await Notifications.cancelScheduledNotificationAsync(result);
    }
  } catch (error) {
    console.log("cancelFirstWeeklyNotification", error);
  }
}

async function scheduleSecondWeeklyNotification(hour, minute, weekday) {
  let midWeek = weekday + 3;
  if (weekday >= 5) midWeek = parseInt((weekday + 3) % 7);

  try {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "We are halfway into the week",
        body: "Let's check our progress",
      },
      trigger: {
        weekday: midWeek,
        hour: hour,
        minute: minute,
        repeats: true,
      },
    });
    handleNavigationUponNotificationPress();
    await AsyncStorage.setItem("secondWeeklyNotificationIdentifier", id);
  } catch (error) {
    console.log("scheduleSecondWeeklyNotification", error);
  }
}

async function cancelSecondWeeklyNotification() {
  try {
    const result = await AsyncStorage.getItem(
      "secondWeeklyNotificationIdentifier"
    );
    if (result !== null) {
      await Notifications.cancelScheduledNotificationAsync(result);
    }
  } catch (error) {
    console.log("cancelSecondWeeklyNotification", error);
  }
}

async function scheduleThirdWeeklyNotification(hour, minute, weekday) {
  let weekEnd = weekday + 6;
  if (weekday >= 2) weekEnd = parseInt((weekday + 6) % 7);

  try {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "We are done for this week!",
        body: "Let's check if we finished all of our goals",
      },
      trigger: {
        weekday: weekEnd,
        hour: hour,
        minute: minute,
        repeats: true,
      },
    });
    handleNavigationUponNotificationPress();
    await AsyncStorage.setItem("thirdWeeklyNotificationIdentifier", id);
  } catch (error) {
    console.log("scheduleThirdWeeklyNotification", error);
  }
}

async function cancelThirdWeeklyNotification() {
  try {
    const result = await AsyncStorage.getItem(
      "thirdWeeklyNotificationIdentifier"
    );
    if (result !== null) {
      await Notifications.cancelScheduledNotificationAsync(result);
    }
  } catch (error) {
    console.log("cancelThirdWeeklyNotification", error);
  }
}

export {
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
};
