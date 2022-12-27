import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionSpecs,
  HeaderStyleInterpolators,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import React from "react";
import { Easing, StatusBar, StyleSheet, Text, View } from "react-native";
import SubEventDefault from "./EventDefault/SubEventDefault";
import Login from "./LogReg/Login";
import RootStack from "../../Navigation/RootStack";
import DetailEvent from "./Home/DetailEvent";
import PushCalendar from "./EventDefault/PushCalendar";
import DetailHistorySubcribeEvent from "./Profile/DetailHistorySubcribeEvent";
import DetailPushedCalendarHistory from './Profile/DetailPushedCalendarHistory';
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
      // apply for all screen
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
      headerMode="none"
    >
      <Stack.Screen name="Login" component={Login} />

      <Stack.Screen
        name="RootStack"
        component={RootStack}
        options={{
          ...customTransition,
        }}
      />
      <Stack.Screen name="DetailEvent" component={DetailEvent} />
      <Stack.Screen name="SubEventDefault" component={SubEventDefault} />
      <Stack.Screen name="PushCalendar" component={PushCalendar} />
      <Stack.Screen
        name="DetailHistorySubcribeEvent"
        component={DetailHistorySubcribeEvent}
       
      />
      <Stack.Screen
      name="DetailPushedCalendarHistory"
      component={DetailPushedCalendarHistory}
     
    />
    </Stack.Navigator>
  );
};

const AppNav = () => {
  return <AppStack />;
};

export default AppNav;
