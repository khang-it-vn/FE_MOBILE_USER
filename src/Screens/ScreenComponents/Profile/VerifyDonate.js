import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  AsyncStorage
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { styles } from "./VerifyDonateStyles";
import MyHeader from "../../../components/MyHeader";
import moment from "moment";
import axios from 'axios';

export default function DonateScore({ route, navigation }) {
  const [data, setData] = useState(null);
  const [typeData, setTypeData] = useState( null);
  const [expireTime, setExpireTime] = useState(null);

  const getDataVerifyHealth = async () => {
    let token = await AsyncStorage.getItem("token");
    token = "Bearer " + token;
    const config = {
      headers: { Authorization: token },
    };
    try {
      const res = await axios.get(
        "http://localhost:44369/api/NguoiHienMau",
        config
      );
      console.log(res.data);
      setData(res.data[0].data);
      setTypeData(res.data[1]);
    } catch (error) {
      console.log(error.message);
    }
  };
  const expireTimeOfVerify = () => {
    let then = 

    setExpireTime(then);
  };
  useEffect(() => {
    getDataVerifyHealth();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <MyHeader
        back
        onPressBack={() => navigation.goBack()}
        title={route.name}
        right="more-vertical"
        onRightPress={() => console.log("right")}
      />
      {data && typeData == 1 &&
        <View>
          <Text style={styles.uid}>
            UID: {data.uid}
            {"\n"}
          </Text>
          <View style={styles.compQr}>
            <QRCode value={data.uid} size={250} />
          </View>
          <View style={styles.compQr}>
            <Text style={styles.title}>
              Sự kiện:{" "}
              <Text style={{ fontWeight: "bold" }}>
                {data.suKienHienMau.tenSK}
              </Text>
            </Text>
          </View>
          <View style={styles.compQr}>
            <Text style={styles.title}>
              Loại thể tích đăng ký:{" "}
              <Text style={{ fontWeight: "bold" }}>
                {data.loaiTheTich.tenLoai}
              </Text>
            </Text>
          </View>
          <View style={styles.compQr}>
            <Text style={styles.title}>
              Hiệu lực đến ngày :{" "}
              <Text style={{ fontWeight: "bold" }}>{
                moment(new Date(data.thoiGian_DK))
                .add(7, "day")
                .format("DD/MM/YYYY")
              }
                </Text>
            </Text>
          </View>
        </View>
        
      }
      {
        data && typeData == 0 &&
        <View>
          <Text style={styles.uid}>
            UID: {data.uid}
            {"\n"}
          </Text>
          <View style={styles.compQr}>
            <QRCode value={data.uid} size={250} />
          </View>
          <View style={styles.compQr}>
            <Text style={styles.title}>
              Địa chỉ hẹn:{" "}
              <Text style={{ fontWeight: "bold" }}>
                {data.diemHienMauCoDinh.dc}
              </Text>
            </Text>
          </View>
          <View style={styles.compQr}>
            <Text style={styles.title}>
              Loại thể tích đăng ký:{" "}
              <Text style={{ fontWeight: "bold" }}>
                {data.loaiTheTich.tenLoai}
              </Text>
            </Text>
          </View>
          <View style={styles.compQr}>
            <Text style={styles.title}>
              Hiệu lực đến ngày :{" "}
              <Text style={{ fontWeight: "bold" }}>{
                moment(new Date(data.ngayHenHien)).add(7, "day").format("DD/MM/YYYY")
              }</Text>
            </Text>
          </View>
        </View>
      }
      {
        !data &&  <View style={styles.verifyNotExists}>
        <Text>Bạn chưa có xác nhận sức khỏe</Text>
      </View>
      }
    </SafeAreaView>
   
  );
}
