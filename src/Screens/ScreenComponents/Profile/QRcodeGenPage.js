import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import MyHeader from "../../../components/MyHeader";
import { StyleSheet, View, Text } from "react-native";
import QRCode from "react-native-qrcode-svg";
export default function QRcodeGenPage({ route, navigation }) {
  console.log(route.params);

  return (
    <View style={styles.main}>
      <MyHeader
        back
        onPressBack={() => navigation.goBack()}
        title={"QR code cá nhân"}
        right="more-vertical"
        onRightPress={() => console.log("right")}
      />

      <View style={styles.container}>
        <View>
          <Text>
            UID: {route.params.uid}
            {"\n"}
          </Text>
        </View>
        <View>
          <QRCode value={route.params.uid} size={250} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  main:{
    backgroundColor: 'white',
    height: '100%'
  }
});
