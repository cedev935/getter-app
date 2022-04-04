import AsyncStorage from "@react-native-async-storage/async-storage";

const getDailyGoals = async (setDailyGoals) => {
  try {
    const result = await AsyncStorage.getItem("dailyGoals");
    let dg = JSON.parse(result);
    if (dg !== null) {
      for (const g of dg) {
        g.duration = new Date(g.duration);
        g.beginAt = new Date(g.beginAt);
      }
      setDailyGoals(dg);
      return dg;
    }
  } catch (error) {
    console.log("error getDailyGoals", error);
  }
};

const getDailyCompleted = async (setDailyCompleted) => {
  try {
    const result = await AsyncStorage.getItem("dailyCompleted");
    if (result !== null) setDailyCompleted(JSON.parse(result));
  } catch (error) {
    console.log("error getDailyCompleted", error);
  }
};

const getDailyPercent = async (setDailyPercent) => {
  try {
    const result = await AsyncStorage.getItem("dailyPercent");
    if (result !== null) setDailyPercent(JSON.parse(result));
  } catch (error) {
    console.log("error getDailyPercent", error);
  }
};

const getWeeklyGoals = async (setWeeklyGoals) => {
  try {
    const result = await AsyncStorage.getItem("weeklyGoals");
    let wg = JSON.parse(result);
    if (wg !== null) {
      for (const g of wg) {
        g.duration = new Date(g.duration);
      }
      setWeeklyGoals(wg);
      return wg;
    }
  } catch (error) {
    console.log("error getWeeklyGoals", error);
  }
};

const getWeeklyCompleted = async (setWeeklyCompleted) => {
  try {
    const result = await AsyncStorage.getItem("weeklyCompleted");
    if (result !== null) setWeeklyCompleted(JSON.parse(result));
  } catch (error) {
    console.log("error getWeeklyCompleted", error);
  }
};

const getWeeklyPercent = async (setWeeklyPercent) => {
  try {
    const result = await AsyncStorage.getItem("weeklyPercent");
    if (result !== null) setWeeklyPercent(JSON.parse(result));
  } catch (error) {
    console.log("error getWeeklyPercent", error);
  }
};

const getPastDailyGoals = async (setPastDailyGoals) => {
  try {
    const result = await AsyncStorage.getItem("pastDailyGoals");
    if (result !== null) {
      setPastDailyGoals(JSON.parse(result));
      return JSON.parse(result);
    } else {
      setPastDailyGoals([]);
      return [];
    }
  } catch (error) {
    console.log("error getPastDailyGoals", error);
  }
};

const getPastWeeklyGoals = async (setPastWeeklyGoals) => {
  try {
    const result = await AsyncStorage.getItem("pastWeeklyGoals");
    if (result !== null) {
      setPastWeeklyGoals(JSON.parse(result));
      return JSON.parse(result);
    } else {
      setPastWeeklyGoals([]);
      return [];
    }
  } catch (error) {
    console.log("error getPastWeeklyGoals", error);
  }
};

const getSetupCompleted = async (setSetupCompleted) => {
  try {
    const result = await AsyncStorage.getItem("setupCompleted");
    if (result !== null) setSetupCompleted(JSON.parse(result));
    else setSetupCompleted(false);
  } catch (error) {
    console.log("error getSetupCompleted", error);
  }
};

const getPastGoalStorage = async (goalId, setPastSetOfGoals) => {
  try {
    const result = await AsyncStorage.getItem(goalId);
    if (result !== null) setPastSetOfGoals(JSON.parse(result)); // maybe will need else
  } catch (error) {
    console.log("error getPastGoalStorage", error);
  }
};

const getDailyNotificationTimeStorage = async (setDailyNotificationTime) => {
  try {
    const result = await AsyncStorage.getItem("dailyNotificationTime");
    if (result !== null) setDailyNotificationTime(new Date(JSON.parse(result)));
  } catch (error) {
    console.log("error getDailyNotificationTimeStorage", error);
  }
};

const getWeeklyNotificationTimeStorage = async (setWeeklyNotificationTime) => {
  try {
    const result = await AsyncStorage.getItem("weeklyNotificationTime");
    if (result !== null)
      setWeeklyNotificationTime(new Date(JSON.parse(result)));
  } catch (error) {
    console.log("error getWeeklyNotificationTimeStorage", error);
  }
};

const getWeeklyNotificationDayStorage = async (setWeeklyNotificationDay) => {
  try {
    const result = await AsyncStorage.getItem("weeklyNotificationDay");
    if (result !== null) {
      setWeeklyNotificationDay(JSON.parse(result));
      return JSON.parse(result);
    }
  } catch (error) {
    console.log("error getWeeklyNotificationDayStorage", error);
  }
};

const getEnableDailyNotificationStorage = async (
  setEnableDailyNotification
) => {
  try {
    const result = await AsyncStorage.getItem("enableDailyNotification");
    if (result !== null) setEnableDailyNotification(JSON.parse(result));
  } catch (error) {
    console.log("error getEnableDailyNotificationStorage", error);
  }
};

const getEnableWeeklyNotificationStorage = async (
  setEnableWeeklyNotification
) => {
  try {
    const result = await AsyncStorage.getItem("enableWeeklyNotification");
    if (result !== null) setEnableWeeklyNotification(JSON.parse(result));
  } catch (error) {
    console.log("error getEnableWeeklyNotificationStorage", error);
  }
};

const getDailyResetIndicatorStorage = async (setDailyResetIndicator) => {
  try {
    const result = await AsyncStorage.getItem("dailyResetIndicator");
    if (result !== null) {
      setDailyResetIndicator(new Date(JSON.parse(result)));
      return new Date(JSON.parse(result));
    }
    return null;
  } catch (error) {
    console.log("error getDailyResetIndicator", error);
  }
};

const getWeeklyResetIndicatorStorage = async (setWeeklyResetIndicator) => {
  try {
    const result = await AsyncStorage.getItem("weeklyResetIndicator");
    if (result !== null) {
      setWeeklyResetIndicator(new Date(JSON.parse(result)));
      return new Date(JSON.parse(result));
    }
    return null;
  } catch (error) {
    console.log("error getWeeklyResetIndicator", error);
  }
};

export {
  getDailyGoals,
  getDailyCompleted,
  getDailyPercent,
  getWeeklyGoals,
  getWeeklyCompleted,
  getWeeklyPercent,
  getPastDailyGoals,
  getPastWeeklyGoals,
  getSetupCompleted,
  getPastGoalStorage,
  getDailyNotificationTimeStorage,
  getWeeklyNotificationTimeStorage,
  getWeeklyNotificationDayStorage,
  getEnableDailyNotificationStorage,
  getEnableWeeklyNotificationStorage,
  getDailyResetIndicatorStorage,
  getWeeklyResetIndicatorStorage,
};
