import React, { useState } from "react";
import { View, Button, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AppButton from "../AppButton";

export const TimePicker = ({ time, setTime, buttonTitle }) => {
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || time;
    setShow(Platform.OS === "ios");
    setTime(currentDate);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <View>
        <AppButton
          onPress={() => {
            setShow(true);
          }}
          title={buttonTitle}
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
