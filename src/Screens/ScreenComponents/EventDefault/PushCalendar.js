import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  FlatList,
  Platform,
  Button,
  Alert,
} from "react-native";
import axios from "axios";
import MyHeader from "../../../components/MyHeader";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as Animatable from "react-native-animatable";
import { Animations } from "../../../Constants/Animations";
import moment from "moment";
import Styles from "../../../common/Styles";
import Colors from "../../../Constants/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "./PushCalendarStyles";
import SelectDropdown from "react-native-select-dropdown";

export default function PushCalendar({ route, navigation }) {
  const viewRef = useRef(null);
  const [iddc, setIddc] = useState(route.params.iddc);
  const [dc, setDc] = useState(null);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [time, setTime] = useState(new Date().toISOString());
  const [theTich, setTheTich] = useState(null);
  const [iD_LTT, setIDLTT] = useState(null);
  const [totalSubcribe, setTotalSubcribe] = useState(null);
  const [totalCurrent, setTotalCurrent] = useState(null);
  const TotalSubcribeMaxInHour = 20; // số lượng tối đa đăng ký trong 1 khung giờ

  const onChange = (event, selectedDate) => {
    const currenDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currenDate);
    setTime(currenDate.toISOString());
    let tempDate = new Date(currenDate);
    console.log(tempDate.toISOString());
    let fDate =
      tempDate.getDate() +
      "/" +
      tempDate.getMonth() +
      "/" +
      tempDate.getFullYear();
    let fTime =
      "Hours: " + tempDate.getHours() + "Minutes: " + tempDate.getMinutes();
    setText(fDate + "\n" + fTime);
    console.log(text);

    if (mode.localeCompare("date") == 0) {
      getTotalSubcribeByTime(currenDate);
    }
    if (mode.localeCompare("time") == 0) {
      let hourCurrent = currenDate.getHours();
      let totalModel = totalSubcribe.find(
        (element) => element.hour == hourCurrent
      );
      setTotalCurrent(totalModel.total);
    }
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  console.log(dc);
  console.log(iddc);

  const getBenhVienById = async () => {
    let token = await AsyncStorage.getItem("token");
    token = "Bearer " + token;
    const config = {
      headers: { Authorization: token },
    };
    try {
      const res = await axios.get(
        "http://localhost:44369/api/NguoiHienMau/GetBenhVienByIddc?iddc=" +
          iddc,
        config
      );
      console.log(res.data.data);
      setDc(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePushCalendar = async () => {
    let diemHienMauCoDinh = dc.taiKhoans[0].diemHienMauCoDinhs[0];
    if (
      new Date(time).getHours() <
      new Date(diemHienMauCoDinh.thoiGian_BD).getHours()
    ) {
      Alert.alert(
        "System BloodBank",
        "Thời gian hẹn lịch sớm hơn thời gian làm việc",
        [
          {
            text: "OK",
          },
        ]
      );
      return;
    }
    if (
      new Date(time).getHours() >
      new Date(diemHienMauCoDinh.thoiGian_KT).getHours()
    ) {
      Alert.alert(
        "System BloodBank",
        "Thời gian hẹn lịch đã qua thời gian làm việc",
        [
          {
            text: "OK",
          },
        ]
      );
      return;
    }

    if (
      new Date(time).getTime() >
      new Date(diemHienMauCoDinh.thoiGian_KT).getTime()
    ) {
      Alert.alert(
        "System BloodBank",
        "Thời gian hẹn lịch đã qua thời gian hoạt động của cở sở",
        [
          {
            text: "OK",
          },
        ]
      );
      return;
    }
    if (
      new Date(time).getTime() <
      new Date(diemHienMauCoDinh.thoiGian_BD).getTime()
    ) {
      Alert.alert(
        "System BloodBank",
        "Thời gian hẹn lịch chưa tới thời gian hoạt động của cở sở",
        [
          {
            text: "OK",
          },
        ]
      );
      return;
    }
    let tomorrow = new Date();

    let regixTomorrow = new Date(
      tomorrow.getFullYear(),
      tomorrow.getMonth(),
      tomorrow.getDate() + 1,
      0,
      0,
      0
    );
    console.log(regixTomorrow);
    if (new Date(time).getTime() < regixTomorrow.getTime()) {
      Alert.alert(
        "System BloodBank",
        "Thời gian hẹn lịch phải sớm hơn 1 ngày",
        [
          {
            text: "OK",
          },
        ]
      );
      return;
    }
    if (iD_LTT == null) {
      Alert.alert("System BloodBank", "Bạn cần chọn thể tích đăng ký", [
        {
          text: "OK",
        },
      ]);
      return;
    }

    if(totalCurrent >= TotalSubcribeMaxInHour)
    {
      Alert.alert("System BloodBank", "Khung giờ đã đạt số lượng đăng ký tối đa là 20 người, bạn hãy chọn khung giờ khác");
      return;
    }
    let token = await AsyncStorage.getItem("token");
    token = "Bearer " + token;
    const config = {
      headers: { Authorization: token },
    };
    console.log("Thời gian đăng ký");
    console.log(moment(new Date(time)).format("DD/MM/YYYY hh:mm a"));
    try {
      const res = await axios.get(
        "http://localhost:44369/api/NguoiHienMau/PushCalendar?iddc=" +
          iddc +
          "&thoigianhenhien=" +
          time +
          "&idltt=" +
          iD_LTT,
        config
      );
      console.log("hẹn hiến");
      console.log(res.data);
      if (res.data.message.includes("exists")) {
        Alert.alert("System BloodBank", res.data.data);
      } else if (res.data.message.includes("failed")) {
        Alert.alert(
          "System BloodBank",
          "Bạn vẫn cần tịnh dưỡng thêm " +
            res.data.data +
            " ngày để có thể tiếp tục đăng ký",
          [
            {
              text: "OK",
            },
          ]
        );
      } else if (res.data.message.includes("success")) {
        Alert.alert(
          "System BloodBank",
          'Bạn đã đặt lịch hẹn thành công, vui lòng kiểm tra lại thông tin trong "Lịch hẹn hiến máu"',
          [
            {
              text: "OK",
            },
          ]
        );
      }
      else if(res.data.message.includes("totalismax"))
      {
        Alert.alert(
          "System BloodBank",
          res.data.data,
          [
            {
              text: "OK",
            },
          ]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getLoaiTheTich = async () => {
    let token = await AsyncStorage.getItem("token");
    token = "Bearer " + token;
    const config = {
      headers: { Authorization: token },
    };

    try {
      const res = await axios.get(
        "http://localhost:44369/api/NguoiHienMau/GetLoaiTich",
        config
      );
      console.log(res.data.data);
      setTheTich(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalSubcribeByTime = async (timeChoose) => {
    let token = await AsyncStorage.getItem("token");
    token = "Bearer " + token;
    const config = {
      headers: { Authorization: token },
    };

    try {
      const res = await axios.get(
        "http://localhost:44369/api/NguoiHienMau/GetTotalSubcribeCurrent?iddc=" +
          iddc +
          "&timeChoose=" +
          new Date(timeChoose).toISOString(),
        config
      );
      console.log(res.data);
      setTotalSubcribe(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBenhVienById();
    getLoaiTheTich();
  }, []);

  return (
    <View style={{ backgroundColor: "#EFF5F5", height: "100%" }}>
      <MyHeader
        back
        onPressBack={() => navigation.goBack()}
        title={"Đặt lịch hẹn hiến máu"}
        right="more-vertical"
        onRightPress={() => console.log("right")}
      />
      {dc && theTich && (
        <View style={styles.child}>
          <View style={styles.col2}>
            <Text style={styles.titlehead}>Bệnh viện</Text>
            <Text style={styles.content}>{dc.tenBV}</Text>
            <Text style={styles.titlehead}>Địa chỉ đăng ký</Text>
            <Text style={styles.content}>{dc.dc}</Text>
            <Text style={styles.titlehead}>Ngày đăng ký</Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => showMode("date")}
            >
              <Text style={styles.contentBtn}>Chọn ngày đăng ký</Text>
            </TouchableOpacity>

            <Text style={styles.titlehead}>Giờ đăng ký</Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => showMode("time")}
            >
              <Text style={styles.contentBtn}>Chọn giờ đăng ký</Text>
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display={"default"}
                onChange={onChange}
              />
            )}
            <Text style={styles.titlehead}>Ngày giờ đăng ký</Text>

            <Text style={styles.content}>
              {moment(new Date(time)).format("DD/MM/YYYY hh:mm a")}
            </Text>
            <Text style={styles.titlehead}>Chọn thể tích đăng ký</Text>

            <SelectDropdown
              buttonStyle={{
                width: "100%",
                borderWidth: 0.5,
                marginBottom: 10,
              }}
              buttonTextStyle={{}}
              rowTextStyle={{}}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem.iD_LTT);
                setIDLTT(selectedItem.iD_LTT);
              }}
              data={theTich}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.tenLoai;
              }}
              rowTextForSelection={(item, index) => {
                return item.tenLoai;
              }}
            />

            {totalCurrent != null && (
              <View>
                <Text style={styles.titlehead}>
                  Số lượng đã đăng ký trong khung giờ
                </Text>
                <Text style={styles.content}>{totalCurrent}</Text>
              </View>
            )}

            <TouchableOpacity
              style={{
                backgroundColor: Colors.lightRed,
                alignItems: "center",
                width: "100%",
                marginTop: 10,
              }}
              onPress={handlePushCalendar}
            >
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 20,
                  color: "white",
                  paddingBottom: 10,
                }}
              >
                Đặt lịch
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
