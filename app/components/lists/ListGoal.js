import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "../AppText";
import colors from "../../config/colors";
import { CheckBox } from "react-native-elements";
import ListItemDeleteAction from "./ListItemDeleteAction";
import {
  handleCheckBoxStorage,
  setDailyGoalsStorage,
  setWeeklyGoalsStorage,
} from "../../storage/setters";
import { displayDeleteAlert } from "../../alerts/deleteAlert";

function ListGoal({
  item,
  onExpandPress,
  goals,
  setGoals,
  totalCompleted,
  setTotalCompleted,
  setTotalPercent,
  type,
  openEditModal,
  setCurrentGoalInEdit,
  handleOrderGoalsList,
}) {
  const updateGoalsStorage = (updatedGoals) => {
    setGoals(updatedGoals);
    if (type == "day") setDailyGoalsStorage(updatedGoals);
    else setWeeklyGoalsStorage(updatedGoals);
  };

  const handleOnDeleteGoal = () => {
    const completed = item.completed;
    const updatedGoals = goals.filter((g) => g.id !== item.id);

    setGoals(updatedGoals);
    if (type == "day") {
      setDailyGoalsStorage(updatedGoals);
      if (completed) setCompletedAndPercent(-1, updatedGoals);
      else setCompletedAndPercent(0, updatedGoals);
    } else {
      setWeeklyGoalsStorage(updatedGoals);
      if (completed) setCompletedAndPercent(-1, updatedGoals);
      else setCompletedAndPercent(0, updatedGoals);
    }
  };

  const handleUpdateCheckbox = () => {
    item.completed = !item.completed;
    const filteredGoals = goals.filter((g) => g.id !== item.id);
    let updatedGoals = [...filteredGoals, item];
    const orderedUpdatedGoals = handleOrderGoalsList(updatedGoals);
    updateGoalsStorage(orderedUpdatedGoals);

    if (item.completed) setCompletedAndPercent(1, goals);
    else setCompletedAndPercent(-1, goals);
  };

  const setCompletedAndPercent = (num, updatedGoals) => {
    const updatedCompleted = totalCompleted + num;
    setTotalCompleted(updatedCompleted);

    let updatedPercent = 0; // making sure we don't divide by 0. otherwise we get "NaN"
    if (updatedGoals.length > 0)
      updatedPercent = (updatedCompleted / updatedGoals.length) * 100;

    setTotalPercent(updatedPercent);
    handleCheckBoxStorage(updatedCompleted, updatedPercent, type);
  };

  return (
    // MUST WRAP Swipeable with GestureHandlerRootView, or Swipeable won't work!
    <>
      <View
        style={[
          styles.container,
          { borderWidth: item.highPriority ? 0.25 : 0 },
        ]}
      >
        <GestureHandlerRootView>
          <Swipeable
            renderRightActions={() => (
              <ListItemDeleteAction
                onPress={() =>
                  displayDeleteAlert(
                    "Your goal will be deleted",
                    handleOnDeleteGoal
                  )
                }
              />
            )}
          >
            <View style={styles.innerContainer}>
              <View style={styles.checkBox}>
                <CheckBox
                  checked={item.completed}
                  onPress={handleUpdateCheckbox}
                  checkedColor={colors.green}
                />
              </View>
              <TouchableOpacity
                underlayColor={colors.danger}
                style={styles.detailsContainer}
                onPress={onExpandPress}
              >
                <AppText style={styles.title} numberOfLines={1}>
                  {item.title}
                </AppText>
                <MaterialCommunityIcons
                  style={styles.chevronIcon}
                  name="chevron-down"
                  size={25}
                  color={colors.textWhite}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setCurrentGoalInEdit(item);
                  openEditModal();
                }}
                style={styles.editIcon}
              >
                <MaterialCommunityIcons
                  name="pencil"
                  size={20}
                  color={colors.green}
                />
              </TouchableOpacity>
            </View>
          </Swipeable>
        </GestureHandlerRootView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  checkBox: {
    marginHorizontal: -20,
    paddingRight: 10,
  },
  container: {
    borderRadius: 10,
    overflow: "hidden",
    borderColor: colors.danger,
  },
  chevronIcon: {
    left: 20,
  },
  editIcon: {
    paddingVertical: 16,
  },
  innerContainer: {
    alignItems: "center",
    flexDirection: "row",
    padding: 6,
    height: 65,
    paddingLeft: 15,
    backgroundColor: colors.veryFadedWhite,
  },
  detailsContainer: { flexDirection: "row", paddingVertical: 14 },

  title: {
    fontWeight: "bold",
    width: "75%",
    marginLeft: 5,
    color: "rgba(256,256,256, 0.9)",
  },
});

export default ListGoal;
