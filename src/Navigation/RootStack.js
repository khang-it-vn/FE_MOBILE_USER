import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon, { Icons } from "../components/Icons";
import Screen from "../Screens/Screen";
import Colors from "../Constants/Colors";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Home from "../Screens/ScreenComponents/Home/Home";
import Profiles from "../Screens/ScreenComponents/Profile/Profile";
import NavProfile from "../Screens/ScreenComponents/NavProfile";
import DetailEvent from "../Screens/ScreenComponents/Home/DetailEvent";
import { createStackNavigator } from "@react-navigation/stack";
import EventDefault from '../Screens/ScreenComponents/EventDefault/EventDefault';
const Tab = createMaterialTopTabNavigator();

const TabArr = [
  {
    route: "Home",
    label: "Home",
    type: Icons.Ionicons,
    activeIcon: "grid",
    inActiveIcon: "grid-outline",
    component: Home,
  },
  {
    route: "EventDefault",
    label: "EventDefault",
    type: Icons.MaterialCommunityIcons,
    activeIcon: "heart-plus",
    inActiveIcon: "heart-plus-outline",
    component: EventDefault,
  },
  {
    route: "Search",
    label: "Search",
    type: Icons.MaterialCommunityIcons,
    activeIcon: "timeline-plus",
    inActiveIcon: "timeline-plus-outline",
    component: Screen,
  },

  {
    route: "NavProfile",
    label: "NavProfile",
    type: Icons.FontAwesome,
    activeIcon: "user-circle",
    inActiveIcon: "user-circle-o",
    component: NavProfile,
  },
];
const Stack = createStackNavigator();
export default function RootStack() {
  return (
    <React.Fragment>
      <Tab.Navigator
        tabBarPosition="bottom"
        screenOptions={{
          swipeEnabled: false,
          tabBarShowLabel: false,
          tabBarIndicatorStyle: {
            position: "absolute",
            top: 0,
            height: 6,
            backgroundColor: Colors.lightRed,
          },
          tabBarItemStyle: { flexDirection: "row" },
          // tabBarStyle: { backgroundColor: 'powderblue' },
          // tabBarScrollEnabled: true,
          tabBarActiveTintColor: Colors.lightRed,
          tabBarInactiveTintColor: Colors.lightRed,
        }}
      >
        {TabArr.map((_, index) => {
          return (
            <Tab.Screen
              key={index}
              name={_.route}
              component={_.component}
              options={{
                tabBarIcon: ({ color, size, focused }) => (
                  <Icon
                    name={focused ? _.activeIcon : _.inActiveIcon}
                    type={_.type}
                    size={size}
                    color={color}
                  />
                ),
              }}
            />
          );
        })}
      </Tab.Navigator>
    </React.Fragment>
  );
}
