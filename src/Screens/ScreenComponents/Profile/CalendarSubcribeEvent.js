import {
  View,
  Text,
  SafeAreaView,
  AsyncStorage,
  Alert,
  FlatList,
  TouchableOpacity,
} from "react-native";
import MyHeader from "../../../components/MyHeader";
import { styles } from "./CalendarSubcribeEventStyles";
import React, { useRef, useState, useEffect } from "react";
import * as Animatable from "react-native-animatable";
import Styles from "../../../common/Styles";
import { Animations } from "../../../Constants/Animations";
import axios from "axios";
import moment from "moment";

export default function CalendarSubcribeEvent({ route, navigation }) {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  console.log(route.params);

  const getData = async () => {
    let token = await AsyncStorage.getItem("token");
    token = "Bearer " + token;
    const config = {
      headers: { Authorization: token },
    };
    try {
      const res = await axios.get(
        "http://localhost:44369/api/NguoiHienMau/GetEventSubcribed",
        config
      );

      setData(res.data.data);
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleUnSubcribeEvent = async () => {
    let token = await AsyncStorage.getItem("token");
    token = "Bearer " + token;
    const config = {
      headers: { Authorization: token },
    };
    try {
      const res = await axios.post(
        "http://localhost:44369/api/SuKienHienMau/SubcribeEvent",
        {
          id: data.iD_SK,
          thoiGianDangKy: data.thoiGian_DK,
        },
        config
      );
      console.log(res.data);
      if (res.data && res.data.success) {
        Alert.alert("BloodBank System", "Bạn đã hủy đăng ký sự kiện thành công", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
      setData(null);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={[Styles.container]}>
      <MyHeader
        back
        onPressBack={() => navigation.goBack()}
        title={"Lịch đăng ký hiến máu"}
        right="more-vertical"
        onRightPress={() => console.log("right")}
      />
     
      {data && (
        <View style={{ padding: 10, borderWidth: 0.5, margin: 5 }}>
          <View style={[styles.row]}>
            <Text style={[styles.fontSize, styles.titleRow]}>Sự kiện:</Text>
            <Text style={[styles.fontSize]}>{data.suKienHienMau.tenSK}</Text>
          </View>
          <View style={[styles.row]}>
            <Text style={[styles.fontSize, styles.titleRow]}>Bệnh viện:</Text>
            <Text style={[styles.fontSize]}>
              {data.suKienHienMau.taiKhoan.benhVien.tenBV}
            </Text>
          </View>
          <View style={[styles.row]}>
            <Text style={[styles.fontSize, styles.titleRow]}>
              Địa chỉ diễn ra:
            </Text>
            <FlatList
              data={data.suKienHienMau.dCs.split(";")}
              renderItem={({ item }) => (
                <Text style={[styles.fontSize]}>{item}</Text>
              )}
            />
          </View>
          <View style={[styles.row]}>
            <Text style={[styles.fontSize, styles.titleRow]}>
              Ngày diễn ra:
            </Text>
            <Text style={[styles.fontSize]}>11/12/2022 - 25/12/2022</Text>
          </View>
          <View style={[styles.row]}>
            <Text style={[styles.fontSize, styles.titleRow]}>Khung giờ:</Text>
            <Text style={[styles.fontSize]}>7:45 - 11:30 am</Text>
          </View>
          <View>
            <TouchableOpacity onPress={handleUnSubcribeEvent}>
              <Text style={[styles.fontSize, styles.btnCancleSubcribe]}>
                Hủy đăng ký
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
