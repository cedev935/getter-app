import React from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

function KeyboardDismisser({ children }) {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
}

export default KeyboardDismisser;
