import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  AsyncStorage,
  Image,
} from "react-native";
import { styles } from "./Styles";
import MyHeader from "../../../components/MyHeader";
import { useTheme } from "@react-navigation/native";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome5";
import IconOld from "react-native-vector-icons/FontAwesome";
import { Surface } from "react-native-paper";
import Colors from "../../../Constants/Colors";

import DonateScore from "./DonateScore";

const Action = ({ icon, title, screen, navigation, dataSend }) => {
  return (
    <View style={styles.action}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(screen, dataSend);
        }}
      >
        <View style={styles.iconContainer}>
          <View style={styles.iconStyle}>
            <Icon name={icon} size={22} color={Colors.white} />
          </View>
          <View style={styles.viewTitle}>
            <Text style={styles.actionTitle}>{title}</Text>
          </View>
          <Icon
            style={styles.iconRight}
            color={Colors.black}
            size={22}
            name={"chevron-right"}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default function Profile({ route, navigation }) {
  const [infoData, setInfoData] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [phieuKetQua, setPhieuKetQua] = useState(null);

  const getInfoData = async () => {
    let token = await AsyncStorage.getItem("token");
    token = "Bearer " + token;
    const config = {
      headers: { Authorization: token },
    };
    try {
      const res = await axios.get(
        "http://localhost:44369/api/AccountNguoiHienMau",
        config
      );
      console.log(res.data);
      setInfoData(res.data[0].data);
      setAvatar(res.data[1]);
      setPhieuKetQua(res.data[2]);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getInfoData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <MyHeader
        back
        onPressBack={() => navigation.goBack()}
        title={"Quản lý thông tin"}
        right="more-vertical"
        onRightPress={() => console.log("right")}
      />
      <ScrollView
        showVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 29 }}
      >
        {infoData == null ? (
          <Text></Text>
        ) : (
          <Surface style={styles.avaInfo}>
            <View style={styles.profileInfos}>
              <View>
                <Image
                  style={styles.image}
                  source={{ uri: "data:image/png;base64," + avatar }}
                />
              </View>
              <View style={styles.nameSection}>
                <View style={styles.compName}>
                  <Text style={styles.name}> {infoData.hoTen}</Text>
                </View>

                <View style={styles.compBtnInfo}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("DetailProfile", {
                        infoData: infoData,
                        avatar: avatar,
                        phieuKetQua: phieuKetQua,
                      });
                    }}
                  >
                    <Text style={styles.compContentInfoBtn}>
                      Quản lý thông tin cá nhân
                    </Text>
                  </TouchableOpacity>
                  <Text style={{ marginLeft: "5%" }} onPress={getInfoData}>
                    <IconOld size={18} name={"refresh"} />
                  </Text>
                </View>
              </View>
            </View>
          </Surface>
        )}
        <View style={styles.action}>
          <Action
            title={"QR code cá nhân"}
            icon={"qrcode"}
            navigation={navigation}
            screen="QRcodeGenPage"
            dataSend={infoData}
          />
          <Action
            title={"Điểm hiến máu"}
            icon={"user-plus"}
            navigation={navigation}
            screen="DonateScore"
            dataSend={infoData}
          />
          <Action
            title={"Lịch đăng ký hiến máu"}
            icon={"calendar-check"}
            navigation={navigation}
            screen="CalendarSubcribeEvent"
            dataSend={infoData}
          />
          <Action
            title={"Lịch hẹn hiến máu"}
            icon={"calendar-check"}
            navigation={navigation}
            screen="PushedCalendar"
            dataSend={infoData}
          />
          <Action
            title={"Lịch sử đăng ký hiến máu"}
            icon={"calendar-plus"}
            navigation={navigation}
            screen="CalendarSubEvent"
            dataSend={infoData}
          />
          <Action
            title={"Lịch sử hẹn hiến máu"}
            icon={"calendar-plus"}
            navigation={navigation}
            screen="PushedHistoryCalendar"
            dataSend={infoData}
          />

          <Action
            title={"Đăng xuất"}
            icon={"user-times"}
            navigation={navigation}
            screen="VerifyDonate"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
