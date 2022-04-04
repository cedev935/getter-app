import React, { useState } from "react";
import { View, Button, Platform, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AppButton from "../AppButton";

export const TimePickerButton = ({
  time,
  setTime,
  buttonTitle,
  buttonStyle,
}) => {
  const [show, setShow] = useState(false);

  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShow(Platform.OS === "ios");
    setTime(currentTime);
  };

  return (
    <View style={styles.container}>
      <View>
        <AppButton
          onPress={() => {
            setShow(true);
          }}
          title={buttonTitle}
          buttonStyle={buttonStyle}
        />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={time}
          mode={"time"}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
});
