import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "../../config/colors";

function GoalDetails({ visible, setVisible, goal }) {
  if (visible) {
    return (
      <View style={styles.container}>
        <View style={styles.detailsContainer}>
          <Text style={[styles.text, styles.title]}>{goal.title}</Text>
          {goal.description ? (
            <Text style={styles.text}>{goal.description}</Text>
          ) : null}
          {new Date(goal.duration).toTimeString().substring(0, 5) != "00:00" ? (
            <Text style={styles.text}>
              Duration: {new Date(goal.duration).toTimeString().substring(0, 5)}
            </Text>
          ) : null}
          {goal.day ? <Text style={styles.text}>Day: {goal.day}</Text> : null}
          {goal.beginAt &&
          new Date(goal.beginAt).toTimeString().substring(0, 5) != "00:00" ? (
            <Text style={styles.text}>
              Begin at: {new Date(goal.beginAt).toTimeString().substring(0, 5)}
            </Text>
          ) : null}
        </View>
        <View>
          <TouchableOpacity
            style={styles.exitIcon}
            onPress={() => {
              setVisible(!visible);
            }}
          >
            <Feather // add a delete button
              name="x"
              size={35}
              color={colors.textWhite}
            />
          </TouchableOpacity>
        </View>
        {goal.highPriority ? (
          <Text style={styles.highPriority}>High Priority</Text>
        ) : null}
      </View>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    flexDirection: "row",
    padding: 10,
    paddingTop: 0,
    height: "100%",
    width: "98%",
    borderWidth: 1,
    borderColor: colors.veryFadedWhite,
    backgroundColor: colors.blueBG2,
    borderRadius: 20,
    borderTopRightRadius: 0,
  },
  detailsContainer: {
    width: "85%",
    paddingLeft: 7,
  },
  exitIcon: {
    padding: 10,
    right: -5,
    bottom: -5,
  },
  highPriority: {
    color: colors.danger,
    position: "absolute",
    bottom: 30,
    right: 30,
    fontWeight: "bold",
  },
  text: {
    padding: 10,
    color: colors.textWhite,
  },
  title: {
    color: colors.textWhite,
    fontWeight: "bold",
    fontSize: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.slightlyFadedWhite,
    width: "95%",
  },
});

export default GoalDetails;
