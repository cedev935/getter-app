import AsyncStorage from "@react-native-async-storage/async-storage";

const handleDailyReset = async (
  setDailyGoals,
  setDailyCompleted,
  setDailyPercent
) => {
  try {
    await AsyncStorage.removeItem("dailyGoals");
    setDailyGoals([]);
    await AsyncStorage.removeItem("dailyCompleted");
    setDailyCompleted(0);
    await AsyncStorage.removeItem("dailyPercent");
    setDailyPercent(0);
  } catch (error) {
    console.log("error handleDailyReset", error);
  }
};

const handleWeeklyReset = async (
  setWeeklyGoals,
  setWeeklyCompleted,
  setWeeklyPercent
) => {
  try {
    await AsyncStorage.removeItem("weeklyGoals");
    setWeeklyGoals([]);
    await AsyncStorage.removeItem("weeklyCompleted");
    setWeeklyCompleted(0);
    await AsyncStorage.removeItem("weeklyPercent");
    setWeeklyPercent(0);
  } catch (error) {
    console.log("error handleWeeklyReset", error);
  }
};

const handleDeletePastDailyGoals = async (
  pastDailyGoals,
  setPastDailyGoals
) => {
  try {
    for (const g of pastDailyGoals) {
      await AsyncStorage.removeItem(g);
    }
    await AsyncStorage.removeItem("pastDailyGoals");
    setPastDailyGoals([]);
  } catch (error) {
    console.log("error handleDeletePastDailyGoals", error);
  }
};

const handleDeletePastWeeklyGoals = async (
  pastWeeklyGoals,
  setPastWeeklyGoals
) => {
  try {
    for (const g of pastWeeklyGoals) {
      await AsyncStorage.removeItem(g);
    }
    await AsyncStorage.removeItem("pastWeeklyGoals");
    setPastWeeklyGoals([]);
  } catch (error) {
    console.log("error handleDeletePastWeeklyGoals", error);
  }
};

export {
  handleDailyReset,
  handleWeeklyReset,
  handleDeletePastDailyGoals,
  handleDeletePastWeeklyGoals,
};
