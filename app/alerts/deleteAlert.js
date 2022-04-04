import { Alert } from "react-native";

export const displayDeleteAlert = (body, handleOnDelete) => {
  Alert.alert(
    "Are You Sure?",
    body,
    [
      {
        text: "Delete",
        onPress: handleOnDelete,
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
