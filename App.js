import * as SplashScreen from "expo-splash-screen";
import { I18n } from "i18n-js";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useReducer,
} from "react";
import { createContext } from "react";
import { StyleSheet, View } from "react-native";
import { AUthReducer, Inital_State } from "./app/Authreducer";
import PersonalJobProvider from "./app/Pages/personalJobProvider";
import CompanyJobProvider from "./app/Pages/companyjobprovider";
import Jobmainselect from "./app/Pages/jobprovider/Jobtermchoose";
import translations from "./app/Pages/translations";
import Root from "./app/Rootstack/Rootstack";
import { doSomethingWithInput, changeLanguage } from "./app/util/util.js";
export const LocalizationContext = createContext();
export const AuthContext = createContext();

//To make the splash screen to stay
SplashScreen.preventAutoHideAsync();
const i18n = new I18n(translations);
export default function App() {
  const [language, setlanguage] = useState("en");
  const [userDetails, setuserdetails] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);
  const [state, dispatch] = useReducer(AUthReducer, Inital_State);

  //for otp frontEnd

  //to get the localize at first
  const localizationContext = useMemo(
    () => ({
      t: (scope, options) => i18n.t(scope, { language, ...options }),
      language,
      setlanguage,
      userDetails: userDetails,
      setuserdetails: (userDetails) => setuserdetails(userDetails),
    }),
    [language, userDetails]
  );

  const authContext = useMemo(
    () => ({
      isdetails: () => {
        dispatch({ type: "IS_Deatils_given" });
      },
      getstate: () => {
        console.log(state);
      },
    }),
    [state]
  );
  console.log("i called");
  i18n.locale = language;
  //to run at first

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={styles.main} onLayout={onLayoutRootView}>
      <LocalizationContext.Provider value={localizationContext}>
        <AuthContext.Provider value={{ state, dispatch }}>
          <Root />
        </AuthContext.Provider>
      </LocalizationContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
