import { Alert } from "react-native";

export const displayModificationAlert = (body, handleOnModification) => {
  Alert.alert(
    "Are You Sure?",
    body,
    [
      {
        text: "Modify",
        onPress: handleOnModification,
      },
      {
        text: "Cancel",
      },
    ],
    {
      cancelable: true,
    }
  );
};
