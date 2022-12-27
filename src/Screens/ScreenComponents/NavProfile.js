import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionSpecs,
  HeaderStyleInterpolators,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import React from "react";
import { Easing, StatusBar, StyleSheet, Text, View } from "react-native";
import Profile from "./Profile/Profile";
import DetailProfile from "./Profile/DetailProfile";
import DonateScore from "./Profile/DonateScore";
import VerifyDonate from "./Profile/VerifyDonate";
import CalendarSubcribeEvent from "./Profile/CalendarSubcribeEvent";
import PushedCalendar from "./Profile/PushedCalendar";
import QRcodeGenPage from "./Profile/QRcodeGenPage";
import CalendarSubEvent from "./Profile/CalendarSubEvent";
import PushedHistoryCalendar from './Profile/PushedHistoryCalendar';

const Stack = createStackNavigator();

const config = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const closeConfig = {
  animation: "timing",
  config: {
    duration: 200,
    easing: Easing.linear,
  },
};

const customTransition = {
  gestureEnabled: true,
  gestureDirection: "horizontal",
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
          {
            rotate: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: ["180deg", "0deg"],
            }),
          },
          {
            scale: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.7],
                })
              : 1,
          },
        ],
      },
      opacity: current.opacity,
    };
  },
};

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
      headerMode="none"
    >
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen
        name="DonateScore"
        component={DonateScore}
        options={{
          ...customTransition,
        }}
      />

      <Stack.Screen
        name="VerifyDonate"
        component={VerifyDonate}
        options={{
          ...customTransition,
        }}
      />
      <Stack.Screen
        name="DetailProfile"
        component={DetailProfile}
        options={{
          ...customTransition,
        }}
      />
      <Stack.Screen
        name="QRcodeGenPage"
        component={QRcodeGenPage}
        options={{
          ...customTransition,
        }}
      />
      <Stack.Screen
        name="CalendarSubEvent"
        component={CalendarSubEvent}
        options={{
          ...customTransition,
        }}
      />
      <Stack.Screen
        name="CalendarSubcribeEvent"
        component={CalendarSubcribeEvent}
        options={{
          ...customTransition,
        }}
      />
      <Stack.Screen
        name="PushedCalendar"
        component={PushedCalendar}
        options={{
          ...customTransition,
        }}
      />
      <Stack.Screen
      name="PushedHistoryCalendar"
      component={PushedHistoryCalendar}
      options={{
        ...customTransition,
      }}
    />
    </Stack.Navigator>
  );
};

const App = () => {
  return <AppStack />;
};

export default App;
