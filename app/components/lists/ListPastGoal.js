import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import AppText from "../AppText";
import colors from "../../config/colors";
import PastGoalsDetailsScreen from "../modals/PastGoalsDetailsScreen";
import { getPastGoalStorage } from "../../storage/getters";

function ListPastGoal({ item, type, setBlurBackground }) {
  const [modalVisible, setModalVisible] = useState(false);

  const [pastSetOfGoals, setPastSetOfGoals] = useState([]);

  useEffect(() => {
    getPastGoalStorage(item.toString(), setPastSetOfGoals);
  }, []);

  return (
    <>
      <PastGoalsDetailsScreen
        pastSetOfGoals={pastSetOfGoals}
        visible={modalVisible}
        date={item.toString()}
        onClose={() => {
          setModalVisible(false);
          setBlurBackground(false);
        }}
      />
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
          setBlurBackground(true);
        }}
        style={styles.container}
      >
        <View style={styles.innerContainer}>
          <AppText style={styles.title}>{item.toString()}</AppText>
          <FontAwesome
            style={styles.expandIcon}
            name="expand"
            size={25}
            color={colors.green}
          />
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  checkBox: {
    marginHorizontal: -15,
  },
  container: {
    padding: 15,
    backgroundColor: colors.veryFadedWhite,
    borderRadius: 10,
    overflow: "hidden",
  },

  expandIcon: {
    justifyContent: "center",
  },

  title: {
    marginLeft: 5,
    color: colors.textWhite,
    width: "92%",
    fontSize: 17,
  },

  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    padding: 6,
    height: 35,
    paddingLeft: 5,
  },
});

export default ListPastGoal;
