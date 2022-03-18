import { useContext } from "react";

import AuthContext from "./context";
import {
  updateSetupCompletedStorage,
  testResetSetupCompletedStorage,
} from "../storage/setters";

export default useAuth = () => {
  const { setupCompleted, setSetupCompleted } = useContext(AuthContext);

  const complete = () => {
    setSetupCompleted(true);
    updateSetupCompletedStorage();
  };

  const uncomplete = () => {
    setSetupCompleted(false);
    testResetSetupCompletedStorage();
  };

  return { setupCompleted, complete, uncomplete };
};
