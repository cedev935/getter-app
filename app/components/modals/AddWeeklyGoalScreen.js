import React, { useState, useEffect } from "react";
import { StyleSheet, Modal, View } from "react-native";

import AppButton from "../AppButton";
import KeyboardDismisser from "../KeyboardDismisser";
import AppTextInput from "../AppTextInput";
import AppText from "../AppText";
import { TimePickerButton } from "../time/TimePickerButton";
import { CheckBox } from "react-native-elements";
import colors from "../../config/colors";

const extraSpace =
  "                                                                                       ";

function AddWeeklyGoalScreen({
  onSubmit,
  onClose,
  isEdit,
  visible = false,
  goal,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [day, setDay] = useState("");
  const [highPriority, setHighPriority] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleOnChangeText = (value, field) => {
    if (field === "title") setTitle(value);
    if (field === "description") setDescription(value);
    if (field === "day") setDay(value);
  };

  const handleSubmit = () => {
    if (!title.trim()) return onClose();

    if (isEdit) {
      onSubmit(
        goal.id,
        title,
        description,
        duration,
        day,
        highPriority,
        completed,
        Date.now()
      );
    } else {
      onSubmit(title, description, duration, day, highPriority, completed);
      resetFields();
    }
    onClose();
  };

  const resetFields = () => {
    setTitle("");
    setDescription("");
    setDuration(new Date(new Date().setHours(0, 0, 0, 0)));
    setDay("");
    setHighPriority(false);
    setCompleted(false);
  };

  useEffect(() => {
    if (isEdit) {
      setTitle(goal.title);
      setDescription(goal.description);
      setDuration(goal.duration);
      setDay(goal.day);
      setHighPriority(goal.highPriority);
      setCompleted(goal.completed);
    }
  }, [isEdit]);

  return (
    <Modal
      animationType="slide"
      visible={visible}
      statusBarTranslucent={true}
      onRequestClose={onClose}
    >
      <KeyboardDismisser>
        <View style={styles.container}>
          <AppTextInput
            value={title}
            maxLength={30}
            name="title"
            placeholder={"Title" + extraSpace}
            width="100%"
            onChangeText={(text) => handleOnChangeText(text, "title")}
            autoFocus
          />

          <AppTextInput
            value={description}
            maxLength={100}
            multiline
            name="description"
            numberOfLines={4}
            placeholder={"Description" + extraSpace}
            width="100%"
            onChangeText={(text) => handleOnChangeText(text, "description")}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AppText style={{ left: 5 }}>Duration:</AppText>
            <TimePickerButton
              time={duration}
              setTime={setDuration} // new Date(duration.getTime()).toTimeString().substring(0,5)
              buttonTitle={
                typeof duration == "string"
                  ? new Date(duration).toTimeString().substring(0, 5)
                  : duration.toTimeString().substring(0, 5)
              }
              buttonStyle={{ width: "70%", left: 15 }}
            />

            <AppTextInput
              value={day}
              maxLength={15}
              name="day"
              placeholder={"Day" + extraSpace}
              width="40%"
              onChangeText={(text) => handleOnChangeText(text, "day")}
            />
          </View>
          <CheckBox
            checked={highPriority}
            title="High Priority"
            uncheckedColor={colors.dark2}
            checkedColor={colors.light}
            containerStyle={[
              { borderRadius: 20 },
              highPriority
                ? { backgroundColor: colors.red }
                : { backgroundColor: colors.light },
            ]}
            textStyle={[
              { right: 5, bottom: 2 },
              highPriority ? { color: colors.white } : { color: colors.dark2 },
            ]}
            onPress={() => setHighPriority(!highPriority)}
          />

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AppButton
              onPress={handleSubmit}
              title="submit"
              buttonStyle={{
                marginRight: 10,
                width: "45%",
              }}
            />
            <AppButton
              onPress={() => {
                resetFields();
              }}
              title="reset fields"
              buttonStyle={{
                marginLeft: 10,
                width: "45%",
              }}
            ></AppButton>
          </View>
        </View>
      </KeyboardDismisser>
    </Modal>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 5,
    width: "45%",
  },
  container: {
    padding: 10,
    paddingTop: 40,
    alignItems: "center",
  },
});

export default AddWeeklyGoalScreen;
