import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
  FlatList,
} from "react-native";
import axios from "axios";
import MyHeader from "../../../components/MyHeader";
import { styles } from "./PushedCalendarStyles";
import { Animations } from "../../../Constants/Animations";
import * as Animatable from "react-native-animatable";
import Styles from "../../../common/Styles";
import moment from "moment";

export default function PushedCalendar({ route, navigation }) {
  const [data, setData] = useState([]);

  const getData = async () => {
    let token = await AsyncStorage.getItem("token");
    token = "Bearer " + token;
    const config = {
      headers: { Authorization: token },
    };
    try {
      const res = await axios.get(
        "http://localhost:44369/api/NguoiHienMau/DetailPushCalendar",
        config
      );
      setData(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.content}>
      <MyHeader
        back
        onPressBack={() => navigation.goBack()}
        title={"Lịch hẹn hiến máu"}
        right="more-vertical"
        onRightPress={() => console.log("right")}
      />

      <FlatList
        data={data}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item }) => (
          <View style={[styles.row]}>
            <View style={[styles.compTitle, styles.centerText]}>
              <Text style={{ fontSize: 18 }}>{item.diemHienMauCoDinh.dc}</Text>
            </View>
            <View style={{ flexDirection: "row", width: 400 }}>
              <View
                style={
                  ([styles.column], { width: 280, justifyContent: "center" })
                }
              >
                <Text
                  style={{
                    fontSize: 18,
                    textAlign: "center",
                  }}
                >
                  {moment(new Date(item.ngayHenHien)).format(
                    "h:m a, DD/MM/YYYY"
                  )}
                </Text>
              </View>
              <View style={[styles.column, { width: 110 }]}>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#F57",
                    borderRadius: 15,
                  }}
                  onPress={async () => {
                    let token = await AsyncStorage.getItem("token");
                    token = "Bearer " + token;
                    const config = {
                      headers: { Authorization: token },
                    };
                    console.log(item.iD_DC);
                    console.log(item.ngayHenHien);
                    try {
                      const res = await axios.post(
                        "http://localhost:44369/api/NguoiHienMau/SubEventDefault",
                        {
                          iD_DC: item.iD_DC,
                          ngayHenHien: item.ngayHenHien,
                        },
                        config
                      );
                      console.log(res.data);
                      getData();
                    } catch (error) {
                      console.log(error.message);
                    }
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: "white",
                      margin: 3,
                      textAlign: "center",
                    }}
                  >
                    Hủy lịch hẹn
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}
