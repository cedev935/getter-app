import AsyncStorage from "@react-native-async-storage/async-storage";

const setDailyGoalsStorage = async (dailyGoals) => {
  try {
    await AsyncStorage.setItem("dailyGoals", JSON.stringify(dailyGoals));
  } catch (error) {
    console.log("error setDailyGoalsStorage", error);
  }
};

const setWeeklyGoalsStorage = async (weeklyGoals) => {
  try {
    await AsyncStorage.setItem("weeklyGoals", JSON.stringify(weeklyGoals));
  } catch (error) {
    console.log("error setWeeklyGoalsStorage", error);
  }
};

const updateSetupCompletedStorage = async () => {
  try {
    await AsyncStorage.setItem("setupCompleted", JSON.stringify(true));
  } catch (error) {
    console.log("error updateSetupCompletedStorage", error);
  }
};

const testResetSetupCompletedStorage = async () => {
  try {
    await AsyncStorage.setItem("setupCompleted", JSON.stringify(false));
  } catch (error) {
    console.log("error testResetSetupCompletedStorage", error);
  }
};

const setDailyOnSubmit = async (
  setDailyGoals,
  setDailyPercent,
  updatedDailyGoals,
  dailyCompleted
) => {
  try {
    setDailyGoals(updatedDailyGoals);
    await AsyncStorage.setItem("dailyGoals", JSON.stringify(updatedDailyGoals));

    const updatedPercent = (dailyCompleted / updatedDailyGoals.length) * 100;
    setDailyPercent(updatedPercent);
    handlePercentCheckBoxStorage(updatedPercent, "day");
  } catch (error) {
    console.log("error setDailyOnSubmit", error);
  }
};

const setWeeklyOnSubmit = async (
  setWeeklyGoals,
  setWeeklyPercent,
  updatedWeeklyGoals,
  weeklyCompleted
) => {
  try {
    setWeeklyGoals(updatedWeeklyGoals);
    await AsyncStorage.setItem(
      "weeklyGoals",
      JSON.stringify(updatedWeeklyGoals)
    );

    const updatedPercent = (weeklyCompleted / updatedWeeklyGoals.length) * 100;
    setWeeklyPercent(updatedPercent);
    handlePercentCheckBoxStorage(updatedPercent, "week");
  } catch (error) {
    console.log("error setWeeklyOnSubmit", error);
  }
};

const handleCheckBoxStorage = async (
  updatedCompleted,
  updatedPercent,
  goalType
) => {
  try {
    if (goalType == "day")
      await AsyncStorage.setItem(
        "dailyCompleted",
        JSON.stringify(updatedCompleted)
      );
    else
      await AsyncStorage.setItem(
        "weeklyCompleted",
        JSON.stringify(updatedCompleted)
      );

    handlePercentCheckBoxStorage(updatedPercent, goalType);
  } catch (error) {
    console.log("error handleCheckBoxStorage", error);
  }
};

const handlePercentCheckBoxStorage = async (updatedPercent, goalType) => {
  try {
    if (goalType == "day")
      await AsyncStorage.setItem(
        "dailyPercent",
        JSON.stringify(updatedPercent)
      );
    else
      await AsyncStorage.setItem(
        "weeklyPercent",
        JSON.stringify(updatedPercent)
      );
  } catch (error) {
    console.log("error handlePercentCheckBoxStorage", error);
  }
};

const handleUpdatePastGoalsStorage = async (
  updatedPastGoals,
  GoalsToStore,
  id,
  goalType
) => {
  try {
    if (goalType == "day") {
      await AsyncStorage.setItem(
        "pastDailyGoals",
        JSON.stringify(updatedPastGoals)
      );
      await AsyncStorage.setItem(id, JSON.stringify(GoalsToStore));
    } else {
      await AsyncStorage.setItem(
        "pastWeeklyGoals",
        JSON.stringify(updatedPastGoals)
      );
      await AsyncStorage.setItem(id, JSON.stringify(GoalsToStore));
    }
  } catch (error) {
    console.log("error handleUpdatePastGoalsStorage", error);
  }
};

const setDailyNotificationTimeStorage = async (dailyNotificationTime) => {
  try {
    await AsyncStorage.setItem(
      "dailyNotificationTime",
      JSON.stringify(dailyNotificationTime)
    );
  } catch (error) {
    console.log("error setDailyNotificationTimeStorage", error);
  }
};

const setWeeklyNotificationTimeStorage = async (weeklyNotificationTime) => {
  try {
    await AsyncStorage.setItem(
      "weeklyNotificationTime",
      JSON.stringify(weeklyNotificationTime)
    );
  } catch (error) {
    console.log("error setWeeklyNotificationTimeStorage", error);
  }
};

const setWeeklyNotificationDayStorage = async (weeklyNotificationDay) => {
  try {
    await AsyncStorage.setItem(
      "weeklyNotificationDay",
      JSON.stringify(weeklyNotificationDay)
    );
  } catch (error) {
    console.log("error setWeeklyNotificationDayStorage", error);
  }
};

const enableDailyNotificationStorage = async () => {
  try {
    await AsyncStorage.setItem("enableDailyNotification", JSON.stringify(true));
  } catch (error) {
    console.log("error enableDailyNotificationStorage", error);
  }
};

const enableWeeklyNotificationStorage = async () => {
  try {
    await AsyncStorage.setItem(
      "enableWeeklyNotification",
      JSON.stringify(true)
    );
  } catch (error) {
    console.log("error enableWeeklyNotificationStorage", error);
  }
};

const disableDailyNotificationStorage = async () => {
  try {
    await AsyncStorage.setItem(
      "enableDailyNotification",
      JSON.stringify(false)
    );
  } catch (error) {
    console.log("error disableDailyNotificationStorage", error);
  }
};

const disableWeeklyNotificationStorage = async () => {
  try {
    await AsyncStorage.setItem(
      "enableWeeklyNotification",
      JSON.stringify(false)
    );
  } catch (error) {
    console.log("error disableWeeklyNotificationStorage", error);
  }
};

const setDailyResetIndicatorStorage = async (dailyResetIndicator) => {
  // used to check if 24 hours have passed
  try {
    await AsyncStorage.setItem(
      "dailyResetIndicator",
      JSON.stringify(dailyResetIndicator)
    );
  } catch (error) {
    console.log("error setDailyResetIndicator", error);
  }
};

const setWeeklyResetIndicatorStorage = async (weeklyResetIndicator) => {
  // used to check if 7 days have passed
  try {
    await AsyncStorage.setItem(
      "weeklyResetIndicator",
      JSON.stringify(weeklyResetIndicator)
    );
  } catch (error) {
    console.log("error setWeeklyResetIndicator", error);
  }
};

export {
  setDailyGoalsStorage,
  setWeeklyGoalsStorage,
  setDailyOnSubmit,
  setWeeklyOnSubmit,
  handleCheckBoxStorage,
  handlePercentCheckBoxStorage,
  handleUpdatePastGoalsStorage,
  updateSetupCompletedStorage,
  testResetSetupCompletedStorage,
  setDailyNotificationTimeStorage,
  setWeeklyNotificationTimeStorage,
  setWeeklyNotificationDayStorage,
  enableDailyNotificationStorage,
  enableWeeklyNotificationStorage,
  disableDailyNotificationStorage,
  disableWeeklyNotificationStorage,
  setDailyResetIndicatorStorage,
  setWeeklyResetIndicatorStorage,
};
