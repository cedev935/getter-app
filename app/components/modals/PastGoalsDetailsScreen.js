import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import AppText from "../AppText";
import { ListItemSeparator } from "../lists";
import ListPastGoalDetails from "../lists/ListPastGoalDetails";
import colors from "../../config/colors";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

function PastGoalsDetailsScreen({ date, pastSetOfGoals, visible, onClose }) {
  return (
    <View style={styles.container}>
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={onClose}
      >
        <TouchableOpacity // the TouchableOpacity and TouchableWithoutFeedback and the View below with onStartShouldSetResponder are for closing the modal on background press
          onPressOut={onClose}
          activeOpacity={1}
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback>
            <View style={styles.insideContainer}>
              <View style={styles.topContainer}>
                <AppText
                  style={[
                    styles.title,
                    date.length > 20 ? { fontSize: 15 } : null,
                  ]}
                >
                  {date}
                </AppText>
                <TouchableOpacity style={styles.exitIcon} onPress={onClose}>
                  <Feather name="x" size={25} color={colors.white} />
                </TouchableOpacity>
              </View>
              <View onStartShouldSetResponder={() => true} style={{ flex: 1 }}>
                <FlatList
                  data={pastSetOfGoals} // Need to make it visible when there are more than 3 items in the FlatList
                  keyExtractor={(item) => item.id.toString()}
                  ItemSeparatorComponent={ListItemSeparator}
                  renderItem={({ item }) => <ListPastGoalDetails item={item} />}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  exitIcon: {
    width: "10%",
    right: -15,
  },
  insideContainer: {
    height: "37%",
    top: deviceHeight * 0.28,
    width: "80%",
    left: deviceWidth * 0.1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.blueBG2,
    borderRadius: 20,
    borderColor: colors.white,
    borderWidth: 2,
  },
  title: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.light,
    fontWeight: "bold",
    width: "80%",
    color: colors.textWhite,
  },
  topContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
});

export default PastGoalsDetailsScreen;

{
  /* <FontAwesome
              style={{ paddingLeft: 20 }}
              name="check-square-o"
              size={25}
              color={colors.medium}
            /> */
}
