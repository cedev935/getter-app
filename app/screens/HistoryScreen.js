import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useFocusEffect } from "@react-navigation/native";

import { ListItemSeparator } from "../components/lists";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import colors from "../config/colors";
import ListPastGoal from "../components/lists/ListPastGoal";
import { getPastDailyGoals, getPastWeeklyGoals } from "../storage/getters";

import {
  handleDeletePastDailyGoals,
  handleDeletePastWeeklyGoals,
} from "../storage/destructors";
import { displayDeleteAlert } from "../alerts/deleteAlert";

function HistoryScreen({ navigation }) {
  const [pastDailyGoals, setPastDailyGoals] = useState([]); // arrays of keys (dates)
  const [pastWeeklyGoals, setPastWeeklyGoals] = useState([]);

  const [blurBackground, setBlurBackground] = useState(false);

  useFocusEffect(
    // loads everytime I open the drawer tab
    React.useCallback(() => {
      getPastDailyGoals(setPastDailyGoals);
      getPastWeeklyGoals(setPastWeeklyGoals);
    }, [])
  );

  return (
    <Screen
      style={[
        {
          paddingTop: Constants.statusBarHeight + 5,
          backgroundColor: colors.blueBG4,
        },
        blurBackground ? styles.blurBackground : { zIndex: 0 }, // I set some random style that doesn't change anything if blurBG is false
      ]}
    >
      <View style={styles.dailyList}>
        <View style={styles.titleContainer}>
          <AppText style={styles.title}>Past Daily Goals</AppText>
          <TouchableWithoutFeedback
            onPress={() => {
              displayDeleteAlert(
                "This will delete all previous daily goals data",
                () => {
                  handleDeletePastDailyGoals(pastDailyGoals, setPastDailyGoals);
                }
              );
            }}

            // popup to delete all past daily goals
          >
            <AntDesign
              name="delete"
              size={25}
              color={colors.danger}
              style={styles.deleteIcon}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={pastDailyGoals} // Need to make it visible when there are more than 3 items in the FlatList
            keyExtractor={(item) => item.toString()}
            ItemSeparatorComponent={ListItemSeparator}
            renderItem={({ item }) => (
              <ListPastGoal
                item={item}
                type={"day"}
                setBlurBackground={setBlurBackground}
              />
            )}
          />
        </View>
      </View>
      <View style={styles.weeklyList}>
        <View style={[styles.titleContainer, { marginLeft: 5 }]}>
          <AppText style={styles.title}>Past Weekly Goals</AppText>
          <TouchableWithoutFeedback
            onPress={() => {
              displayDeleteAlert(
                "This will delete all previous weekly goals data",
                () => {
                  handleDeletePastWeeklyGoals(
                    pastWeeklyGoals,
                    setPastWeeklyGoals
                  );
                }
              );
            }}
          >
            <AntDesign
              name="delete"
              size={25}
              color={colors.danger}
              style={styles.deleteIcon}
            />
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.listContainer}>
          <FlatList
            data={pastWeeklyGoals} // Need to make it visible when there are more than 3 items in the FlatList
            keyExtractor={(item) => item.toString()}
            ItemSeparatorComponent={ListItemSeparator}
            renderItem={({ item }) => (
              <ListPastGoal
                item={item}
                type={"week"}
                setBlurBackground={setBlurBackground}
              />
            )}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  blurBackground: {
    opacity: 0.7,
    // backgroundColor: colors.medium,
  },
  dailyList: {
    flex: 1,
  },
  deleteIcon: {
    alignSelf: "center",
    right: 7,
  },

  weeklyList: {
    flex: 1,
  },
  title: {
    width: "100%",
    alignSelf: "center",
    fontWeight: "bold",
    textAlign: "center",
    color: colors.textWhite,
    width: "90%",
    paddingLeft: 35,
  },
  titleContainer: { flexDirection: "row", height: "18%" },
  listContainer: {
    height: "80%",
  },
});

export default HistoryScreen;
