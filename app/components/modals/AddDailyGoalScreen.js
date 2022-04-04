import React, { useState, useEffect } from "react";
import { StyleSheet, Modal, View } from "react-native";

import AppButton from "../AppButton";
import KeyboardDismisser from "../KeyboardDismisser";
import AppTextInput from "../AppTextInput";
import { CheckBox } from "react-native-elements";
import colors from "../../config/colors";
import { TimePickerButton } from "../time/TimePickerButton";
import AppText from "../AppText";

const extraSpace =
  "                                                                                       ";

function AddDailyGoalScreen({
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
  const [beginAt, setBeginAt] = useState(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [highPriority, setHighPriority] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleOnChangeText = (value, field) => {
    if (field === "title") setTitle(value);
    if (field === "description") setDescription(value);
  };

  const handleSubmit = () => {
    if (!title.trim()) return onClose();

    if (isEdit) {
      onSubmit(
        goal.id,
        title,
        description,
        duration,
        beginAt,
        highPriority,
        completed,
        Date.now()
      );
    } else {
      onSubmit(title, description, duration, beginAt, highPriority, completed);
      resetFields();
    }
    onClose();
  };

  const resetFields = () => {
    setTitle("");
    setDescription("");
    setDuration(new Date(new Date().setHours(0, 0, 0, 0)));
    setBeginAt(new Date(new Date().setHours(0, 0, 0, 0)));
    setHighPriority(false);
    setCompleted(false);
  };

  useEffect(() => {
    if (isEdit) {
      setTitle(goal.title);
      setDescription(goal.description);
      setDuration(goal.duration);
      setBeginAt(goal.beginAt);
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
            name="title" // the placeholders have a bunch of extra spaces because otherwise the keyboard wouldnt pop in certain areas.
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
          <View style={{ flexDirection: "row", alignItems: "center", left: 8 }}>
            {/* <AppTextInput
              value={duration}
              maxLength={5}
              name="duration"
              placeholder={"Duration" + extraSpace}
              width="40%"
              onChangeText={(text) => handleOnChangeText(text, "duration")}
            />
            <AppTextInput
              value={beginAt}
              maxLength={5}
              name="beginAt"
              placeholder={"Begin At" + extraSpace}
              width="40%"
              onChangeText={(text) => handleOnChangeText(text, "beginAt")}
            /> */}
            <AppText>Duration:</AppText>

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

            <AppText>Begin At:</AppText>

            {beginAt ? (
              <TimePickerButton
                time={beginAt}
                setTime={setBeginAt}
                buttonTitle={
                  typeof beginAt == "string"
                    ? new Date(beginAt).toTimeString().substring(0, 5)
                    : beginAt.toTimeString().substring(0, 5)
                }
                buttonStyle={{ width: "70%", left: 15 }}
              />
            ) : null}
          </View>
          {/* <AppTextInput
            value={highPriority}
            maxLength={5}
            name="highPriority"
            placeholder={"High Priority" + extraSpace}
            width="100%"
            onChangeText={(text) => handleOnChangeText(text, "highPriority")}
          /> */}

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

export default AddDailyGoalScreen;
