import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Foundation, MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useFocusEffect } from "@react-navigation/native";

import { ListGoal, ListItemSeparator } from "../components/lists";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import CircularProgressIndicator from "../components/CircularProgressIndicator";
import GoalDetails from "../components/modals/GoalDetails";
import AddDailyGoalScreen from "../components/modals/AddDailyGoalScreen";
import colors from "../config/colors";
import AddWeeklyGoalScreen from "../components/modals/AddWeeklyGoalScreen";
import EmptyGoalsWindow from "../components/EmptyGoalsWindow";
import { findDate } from "../config/findDate";

import {
  getDailyGoals,
  getDailyCompleted,
  getDailyPercent,
  getWeeklyGoals,
  getWeeklyCompleted,
  getWeeklyPercent,
  getPastDailyGoals,
  getPastWeeklyGoals,
  getDailyNotificationTimeStorage,
  getWeeklyNotificationTimeStorage,
  getDailyResetIndicatorStorage,
  getWeeklyResetIndicatorStorage,
  getWeeklyNotificationDayStorage,
} from "../storage/getters";

import {
  setDailyGoalsStorage,
  setWeeklyGoalsStorage,
  setDailyOnSubmit,
  setWeeklyOnSubmit,
  handleUpdatePastGoalsStorage,
  setDailyResetIndicatorStorage,
  setWeeklyResetIndicatorStorage,
} from "../storage/setters";

import { handleDailyReset, handleWeeklyReset } from "../storage/destructors";

function HomeScreen({ navigation }) {
  const [dailyGoals, setDailyGoals] = useState([]);
  const [weeklyGoals, setWeeklyGoals] = useState([]);

  const [dailyPercent, setDailyPercent] = useState(0);
  const [weeklyPercent, setWeeklyPercent] = useState(0);

  const [dailyCompleted, setDailyCompleted] = useState(0);
  const [weeklyCompleted, setWeeklyCompleted] = useState(0);

  const [dailyGoalDetailsVisible, setDailyGoalDetailsVisible] = useState(false);
  const [weeklyGoalDetailsVisible, setWeeklyGoalDetailsVisible] =
    useState(false);

  const [addDailyScreenVisible, setAddDailyScreenVisible] = useState(false);
  const [addWeeklyScreenVisible, setAddWeeklyScreenVisible] = useState(false);

  const [currentDailyGoalDetails, setCurrentDailyGoalDetails] = useState(null);
  const [currentWeeklyGoalDetails, setCurrentWeeklyGoalDetails] =
    useState(null);

  const [pastDailyGoals, setPastDailyGoals] = useState([]);
  const [pastWeeklyGoals, setPastWeeklyGoals] = useState([]);

  const [dailyEditModalVisible, setDailyEditModalVisible] = useState(false);
  const [weeklyEditModalVisible, setWeeklyEditModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentGoalInEdit, setCurrentGoalInEdit] = useState(null);

  // const [dailyNotificationTime, setDailyNotificationTime] = useState(
  //   new Date()
  // );
  // const [weeklyNotificationTime, setWeeklyNotificationTime] = useState(
  //   new Date()
  // );

  const [weeklyNotificationDay, setWeeklyNotificationDay] = useState(null);

  const [dailyResetIndicator, setDailyResetIndicator] = useState(new Date());
  const [weeklyResetIndicator, setWeeklyResetIndicator] = useState(new Date());

  useEffect(() => {
    getDailyGoals(setDailyGoals);
    getDailyCompleted(setDailyCompleted);
    getDailyPercent(setDailyPercent);
    getWeeklyGoals(setWeeklyGoals);
    getWeeklyCompleted(setWeeklyCompleted);
    getWeeklyPercent(setWeeklyPercent);
    // getDailyResetIndicatorStorage(setDailyResetIndicator);
  }, []);

  useFocusEffect(
    // loads everytime I open the drawer tab
    React.useCallback(() => {
      getPastDailyGoals(setPastDailyGoals);
      getPastWeeklyGoals(setPastWeeklyGoals);
      // getDailyNotificationTimeStorage(setDailyNotificationTime);
      // getWeeklyNotificationTimeStorage(setWeeklyNotificationTime);

      getDailyResetIndicatorStorage(setDailyResetIndicator).then((date) => {
        const dailyTimeInterval = (new Date() - date) / (1000 * 60 * 60);
        if (dailyTimeInterval > 24) {
          getDailyGoals(setDailyGoals).then((goals) => {
            handleUpdatePastDailyGoals(goals);
          });
        }
      });
      getWeeklyResetIndicatorStorage(setWeeklyResetIndicator).then((date) => {
        const weeklyTimeInterval = (new Date() - date) / (1000 * 60 * 60);
        if (weeklyTimeInterval > 24 * 7) {
          getWeeklyGoals(setWeeklyGoals).then((goals) => {
            getWeeklyNotificationDayStorage(setWeeklyNotificationDay).then(
              (day) => {
                handleUpdatePastWeeklyGoals(goals, day);
              }
            );
          });
        }
      });
    }, [])
  );

  const handleOrderGoalsList = (updatedGoals) => {
    let highPriorityGoals = [];
    let uncompletedGoals = [];
    let completedGoals = [];

    for (const goal of updatedGoals) {
      if (goal.highPriority && !goal.completed) {
        highPriorityGoals.push(goal);
        continue;
      }
      if (!goal.completed) {
        uncompletedGoals.push(goal);
        continue;
      }
      completedGoals.push(goal);
    }

    const orderedUpdatedGoals = [
      ...highPriorityGoals,
      ...uncompletedGoals,
      ...completedGoals,
    ];

    return orderedUpdatedGoals;
  };

  const handleOnDailySubmit = (
    title,
    description,
    duration,
    beginAt,
    highPriority,
    completed
  ) => {
    const goal = {
      id: Date.now(),
      title,
      description,
      duration,
      beginAt,
      highPriority,
      completed,
    };

    const updatedDailyGoals = [...dailyGoals, goal];

    const orderedUpdatedGoals = handleOrderGoalsList(updatedDailyGoals);

    setDailyOnSubmit(
      setDailyGoals,
      setDailyPercent,
      orderedUpdatedGoals,
      dailyCompleted
    );
  };

  const handleOnWeeklySubmit = (
    title,
    description,
    duration,
    day,
    highPriority,
    completed
  ) => {
    const goal = {
      id: Date.now(),
      title,
      description,
      duration,
      day,
      highPriority,
      completed,
    };

    const updatedWeeklyGoals = [...weeklyGoals, goal];
    const orderedUpdatedGoals = handleOrderGoalsList(updatedWeeklyGoals);

    setWeeklyOnSubmit(
      setWeeklyGoals,
      setWeeklyPercent,
      orderedUpdatedGoals,
      weeklyCompleted
    );
  };

  const handleUpdatePastDailyGoals = (goals) => {
    let date = new Date();
    const id = dailyResetIndicator.toDateString();

    date.setHours(
      dailyResetIndicator.getHours(),
      dailyResetIndicator.getMinutes()
    );
    setDailyResetIndicator(date);
    setDailyResetIndicatorStorage(date);

    let TodaysGoals = [];
    for (const g of goals) {
      const add = {
        id: g.id,
        title: g.title,
        completed: g.completed,
      };
      TodaysGoals.push(add);
    }

    const updatedPastDailyGoals = [...pastDailyGoals, id];
    setPastDailyGoals(updatedPastDailyGoals);

    handleUpdatePastGoalsStorage(updatedPastDailyGoals, TodaysGoals, id, "day");
    handleDailyReset(setDailyGoals, setDailyCompleted, setDailyPercent);
  };

  const handleUpdatePastWeeklyGoals = (goals, day) => {
    let date = new Date();

    const weekEndDate = new Date();
    weekEndDate.setDate(weeklyResetIndicator.getDate() + 7);
    const id =
      weeklyResetIndicator.toDateString() + " - " + weekEndDate.toDateString();

    const addition = day ? findDate(day.value) : null; // the addition lets us find the date of the last day of the week in order to set weeklyNotificationDay

    date.setDate(date.getDate() - ((date.getDay() + addition) % 7));

    date.setHours(
      weeklyResetIndicator.getHours(),
      weeklyResetIndicator.getMinutes()
    );
    setWeeklyResetIndicator(date);
    setWeeklyResetIndicatorStorage(date);

    let ThisWeeksGoals = [];
    for (const g of goals) {
      const add = {
        id: g.id,
        title: g.title,
        completed: g.completed,
      };
      ThisWeeksGoals.push(add);
    }

    const updatedPastWeeklyGoals = [...pastWeeklyGoals, id];
    setPastWeeklyGoals(updatedPastWeeklyGoals);

    handleUpdatePastGoalsStorage(
      updatedPastWeeklyGoals,
      ThisWeeksGoals,
      id,
      "week"
    );
    handleWeeklyReset(setWeeklyGoals, setWeeklyCompleted, setWeeklyPercent);
  };

  const handleOnDailyGoalEdit = (
    id,
    title,
    description,
    duration,
    beginAt,
    highPriority,
    completed
  ) => {
    dailyGoals.filter((g) => {
      if (g.id === id) {
        g.title = title;
        g.description = description;
        g.duration = duration;
        g.beginAt = beginAt;
        g.highPriority = highPriority;
        g.completed = completed;
        const orderedUpdatedGoals = handleOrderGoalsList(dailyGoals);
        setDailyGoals(orderedUpdatedGoals);
        setDailyGoalsStorage(orderedUpdatedGoals);
      }
    });
  };

  const handleOnWeeklyGoalEdit = (
    id,
    title,
    description,
    duration,
    day,
    highPriority,
    completed
  ) => {
    weeklyGoals.filter((g) => {
      if (g.id === id) {
        g.title = title;
        g.description = description;
        g.duration = duration;
        g.day = day;
        g.highPriority = highPriority;
        g.completed = completed;
        const orderedUpdatedGoals = handleOrderGoalsList(weeklyGoals);
        setWeeklyGoals(orderedUpdatedGoals);
        setWeeklyGoalsStorage(orderedUpdatedGoals);
      }
    });
  };

  const openDailyEditModal = () => {
    setDailyEditModalVisible(true);
    setIsEdit(true);
  };

  const openWeeklyEditModal = () => {
    setWeeklyEditModalVisible(true);
    setIsEdit(true);
  };

  const closeDailyEditModal = () => {
    setDailyEditModalVisible(false);
    setIsEdit(false);
  };

  const closeWeeklyEditModal = () => {
    setWeeklyEditModalVisible(false);
    setIsEdit(false);
  };

  return (
    <>
      <AddDailyGoalScreen
        visible={dailyEditModalVisible}
        onClose={closeDailyEditModal}
        onSubmit={handleOnDailyGoalEdit}
        isEdit={isEdit}
        goal={currentGoalInEdit}
      />
      <AddWeeklyGoalScreen
        visible={weeklyEditModalVisible}
        onClose={closeWeeklyEditModal}
        onSubmit={handleOnWeeklyGoalEdit}
        isEdit={isEdit}
        goal={currentGoalInEdit}
      />
      <Screen
        style={{
          paddingTop: Constants.statusBarHeight - 10,
          backgroundColor: colors.blueBG4,
        }}
      >
        <View style={{ marginTop: 50, flex: 1 }}>
          <AddDailyGoalScreen
            onClose={() => setAddDailyScreenVisible(false)}
            onSubmit={handleOnDailySubmit}
            visible={addDailyScreenVisible}
          />
          <AddWeeklyGoalScreen
            onClose={() => setAddWeeklyScreenVisible(false)}
            onSubmit={handleOnWeeklySubmit}
            visible={addWeeklyScreenVisible}
          />
          <View style={styles.chartContainer}>
            <CircularProgressIndicator
              value={dailyPercent}
              activeStrokeColor={"#C25AFF"}
              activeStrokeSecondaryColor={colors.green}
              inActiveStrokeColor={"#2465FD"}
              title={"day"}
            />
            <CircularProgressIndicator
              value={weeklyPercent}
              activeStrokeColor={"#2465FD"}
              activeStrokeSecondaryColor={"#C25AFF"}
              inActiveStrokeColor={"#2465FD"}
              title={"week"}
            />
          </View>

          <View style={styles.dailyList}>
            <View style={styles.titleContainer}>
              <AppText style={styles.title}>Daily Goals</AppText>
              <TouchableWithoutFeedback
                onPress={() => setAddDailyScreenVisible(true)}
              >
                <Foundation
                  name={"page-add"}
                  size={30}
                  color={colors.textWhite}
                  style={styles.icon}
                />
              </TouchableWithoutFeedback>

              {/* <TouchableWithoutFeedback
                onPress={() => {
                  handleUpdatePastDailyGoals(dailyGoals);
                }}
              >
                <MaterialCommunityIcons
                  name={"clock"}
                  size={40}
                  color={colors.black}
                  style={[styles.icon, { right: 40 }]}
                />
              </TouchableWithoutFeedback> */}
            </View>
            <View
              style={[
                styles.listContainer,
                dailyGoals.length == 0 ? { justifyContent: "center" } : null,
              ]}
            >
              <GoalDetails
                visible={dailyGoalDetailsVisible}
                setVisible={setDailyGoalDetailsVisible}
                goal={currentDailyGoalDetails}
              />
              {dailyGoals.length == 0 ? (
                <EmptyGoalsWindow text="no goals have been set yet" />
              ) : null}
              {!dailyGoalDetailsVisible && dailyGoals.length > 0 ? (
                <View>
                  <FlatList
                    data={dailyGoals} // Need to make it visible when there are more than 3 items in the FlatList
                    keyExtractor={(item) => item.id.toString()}
                    ItemSeparatorComponent={ListItemSeparator}
                    renderItem={({ item }) => (
                      <ListGoal
                        item={item}
                        onExpandPress={() => {
                          setDailyGoalDetailsVisible(true);
                          setCurrentDailyGoalDetails(item);
                        }}
                        goals={dailyGoals}
                        setGoals={setDailyGoals}
                        totalCompleted={dailyCompleted}
                        setTotalCompleted={setDailyCompleted}
                        setTotalPercent={setDailyPercent}
                        type={"day"}
                        editModalVisible={dailyEditModalVisible}
                        setEditModalVisible={setDailyEditModalVisible}
                        openEditModal={openDailyEditModal}
                        setCurrentGoalInEdit={setCurrentGoalInEdit}
                        handleOrderGoalsList={handleOrderGoalsList}
                      />
                    )}
                  />
                </View>
              ) : null}
            </View>
          </View>
          <View style={styles.weeklyList}>
            <View style={styles.titleContainer}>
              <AppText style={styles.title}>Weekly Goals</AppText>
              <TouchableWithoutFeedback
                onPress={() => setAddWeeklyScreenVisible(true)}
              >
                <Foundation
                  name={"page-add"}
                  size={30}
                  color={colors.textWhite}
                  style={styles.icon}
                />
              </TouchableWithoutFeedback>
              {/* <TouchableWithoutFeedback
                onPress={() => {
                  handleUpdatePastWeeklyGoals(weeklyGoals);
                }}
              >
                <MaterialCommunityIcons
                  name={"clock"}
                  size={40}
                  color={colors.black}
                  style={[styles.icon, { right: 40 }]}
                />
              </TouchableWithoutFeedback> */}
            </View>
            <View
              style={[
                styles.listContainer,
                weeklyGoals.length == 0
                  ? { justifyContent: "center", bottom: 5 }
                  : null,
              ]}
            >
              <GoalDetails
                visible={weeklyGoalDetailsVisible}
                setVisible={setWeeklyGoalDetailsVisible}
                goal={currentWeeklyGoalDetails}
              />
              {weeklyGoals.length == 0 ? (
                <EmptyGoalsWindow text="no goals have been set yet" />
              ) : null}
              {!weeklyGoalDetailsVisible && weeklyGoals.length > 0 ? (
                <View>
                  <FlatList
                    data={weeklyGoals} // Need to make it visible when there are more than 3 items in the FlatList
                    keyExtractor={(item) => item.id.toString()}
                    ItemSeparatorComponent={ListItemSeparator}
                    renderItem={({ item }) => (
                      <ListGoal
                        item={item}
                        onExpandPress={() => {
                          setWeeklyGoalDetailsVisible(true);
                          setCurrentWeeklyGoalDetails(item);
                        }}
                        goals={weeklyGoals}
                        setGoals={setWeeklyGoals}
                        totalCompleted={weeklyCompleted}
                        setTotalCompleted={setWeeklyCompleted}
                        setTotalPercent={setWeeklyPercent}
                        type={"week"}
                        editModalVisible={weeklyEditModalVisible}
                        setEditModalVisible={setWeeklyEditModalVisible}
                        openEditModal={openWeeklyEditModal}
                        setCurrentGoalInEdit={setCurrentGoalInEdit}
                        handleOrderGoalsList={handleOrderGoalsList}
                        style={{
                          flex: 1,
                          justifyContent: "center",
                          paddingTop: Constants.statusBarHeight,
                        }}
                      />
                    )}
                  />
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    top: 8,
    flex: 1,
    backgroundColor: "rgba(245, 249, 254, 0.6)",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 10,
  },
  dailyList: {
    marginTop: 10,
    flex: 2,
  },
  icon: {
    position: "absolute",
    right: 12,
    alignSelf: "center",
  },
  listContainer: {
    height: "79%",
    // alignItems: "center",
  },
  weeklyList: {
    bottom: 5,
    flex: 2,
  },
  title: {
    position: "absolute",
    width: "100%",
    alignSelf: "center",
    fontWeight: "bold",
    textAlign: "center",
    color: "rgba(256,256,256, 0.9)",
  },
  titleContainer: { flexDirection: "row", height: "20%" },
});

export default HomeScreen;
