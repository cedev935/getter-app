import React, { useState } from "react";
import { CheckBox, StyleSheet } from "react-native";

import React from "react";
import { StyleSheet } from "react-native";

function CheckBox(props) {
  const [check, setCheck] = useState(false);

  return <CheckBox center checked={check} onPress={() => setCheck(!check)} />;
}

export default CheckBox;
