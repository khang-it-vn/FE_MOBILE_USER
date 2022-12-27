import {
  Text,
  View,
  AsyncStorage,
  TouchableOpacity,
  Alert,
} from "react-native";
import MyHeader from "../../../components/MyHeader";
import { styles } from "./DetailEventStyle";
import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import SelectDropdown from "react-native-select-dropdown";

export default function DetailEvent({ route, navigation }) {
  const [data, setData] = useState(null);
  const [id, setId] = useState(route.params.iD_SK);
  const [stateSubcribe, setSateSubcribe] = useState(false);
  const [tongSoLuongThamGia, setTongSoLuongThamGia] = useState(0);
  const [trangThaiDangKy, setTrangThaiDangKy] = useState(false);
  const [theTich, setTheTich] = useState(null);
  const [iD_LTT, setIDLTT] = useState(null);

  console.log(route.params.iD_SK);
  console.log(
    new Date(new Date().toString().split("GMT")[0] + " UTC").toISOString()
  );
  const getData = async () => {
    let token = await AsyncStorage.getItem("token");
    token = "Bearer " + token;
    const config = {
      headers: { Authorization: token },
    };
    try {
      const res = await axios.get(
        "http://localhost:44369/api/SuKienHienMau/DetailByUser?idsk=" + id,
        config
      );
      setData(res.data[0]);
      setSateSubcribe(res.data[1].stateParticipation);
      setTongSoLuongThamGia(res.data[0].data.tongSoLuongThamGia);
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const nowISO = () => {
    return new Date(
      new Date().toString().split("GMT")[0] + " UTC"
    ).toISOString();
  };
  const handleSubcribe = async () => {
    if(iD_LTT == null && stateSubcribe == false)
    {
      Alert.alert("System BloodBank", "Vui lòng chọn loại thể tích trước khi đăng ký")
      return;
    }
    let token = await AsyncStorage.getItem("token");
    token = "Bearer " + token;
    const config = {
      headers: { Authorization: token },
    };
    const datetimeLocalISO = nowISO();
    var postData = {
      id: id,
      thoiGianDangKy: datetimeLocalISO,
      iD_LTT: iD_LTT
    };

    try {
      const res = await axios.post(
        "http://localhost:44369/api/SuKienHienMau/SubcribeEvent",
        postData,
        config
      );
      console.log(res.data);
      if (res.data.message.includes("Hủy sự kiện thành công")) {
        let totalAfterSubcribe = tongSoLuongThamGia - 1;
        setTongSoLuongThamGia(totalAfterSubcribe);
        setSateSubcribe(!stateSubcribe);
        Alert.alert(
          "System BloodBank",
          "Hủy đăng ký sự kiện thành công"
        );
      } else if (res.data.message.includes("exists")) {
        Alert.alert(
          "System BloodBank",
          res.data.data
        );
      } else if(res.data.message.includes("failed")) {
        Alert.alert(
          "System BloodBank",
          "Bạn vẫn cần tịnh dưỡng thêm " + res.data.data + " ngày để có thể tiếp tục đăng ký",
          [
            {
              text: "OK",
            },
          ]
        );
      }
      else if(res.data.message.includes("success"))
      {
        setTongSoLuongThamGia(res.data.data.suKienHienMau.tongSoLuongThamGia);
        setSateSubcribe(!stateSubcribe);
        Alert.alert(
          "System BloodBank",
          "Bạn đã đặt đăng ký thành công, vui lòng kiểm tra lại thông tin trong \"Lịch đăng ký hiến máu\"",
          [
            {
              text: "OK",
            },
          ]
        );
        
      }
    } catch (error) {
      console.log(error.message);
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

  useEffect(() => {
    getData();
    getLoaiTheTich();
  }, []);
  return (
    <View>
      <MyHeader
        back
        onPressBack={() => navigation.goBack()}
        title={"Chi tiết sự kiện"}
        right="more-vertical"
        onRightPress={() => console.log("right")}
      />
      {data == null ? (
        <Text></Text>
      ) : (
        <View style={styles.srcMain}>
          <View style={styles.srcCompTitle}>
            <Text style={styles.title}>{data.data.tenSK}</Text>
          </View>
          <View style={styles.srcCompDetail}>
            <View style={styles.soLuong}>
              <Text style={styles.soLuongTitle}>Số lượng đã đăng ký</Text>
              <Text style={styles.dcContent}>
                {tongSoLuongThamGia} tình nguyện
              </Text>
            </View>
            <View>
              <View style={styles.thoiGian}>
                <Text style={styles.thoiGianTitle}>Thời gian diễn ra</Text>
                <Text style={styles.thoiGianContent}>
                  {" "}
                  {moment(data.data.thoiGian_BD.substring(10), "h:mm a").format(
                    "h:mm"
                  )}
                  {" - "}
                  {moment(data.data.thoiGian_KT.substring(10), "h:mm a").format(
                    "h:mm"
                  )}
                </Text>
              </View>
            </View>
            <View>
              <View style={styles.date}>
                <Text style={styles.dates}> Ngày diễn ra </Text>
                <Text style={styles.dcContent}>
                  {moment(
                    new Date(data.data.thoiGian_BD.substring(0, 10))
                  ).format("DD/MM/YYYY")}{" "}
                  -{" "}
                  {moment(
                    new Date(data.data.thoiGian_KT.substring(0, 10))
                  ).format("DD/MM/YYYY")}
                </Text>
              </View>
            </View>
            <View>
              <View style={styles.dcs}>
                <Text style={styles.titleDCs}>Địa chỉ tổ chức</Text>
                {data.data.dCs.split(";").map((item, index) => {
                  return (
                    <Text style={styles.dcContent} key={index}>
                      {item}
                    </Text>
                  );
                })}
              </View>
            </View>
            <View>
              {stateSubcribe == false  && theTich && (
                <SelectDropdown
                  buttonStyle={{
                    width: "90%",
                    borderWidth: 0.5,
                    marginBottom: 10
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
              )}
            </View>
            {stateSubcribe == false ? (
              <TouchableOpacity
                style={styles.subscribe}
                onPress={() => {
                  handleSubcribe();
                }}
              >
                <Text style={styles.contentSubcribe}>Đăng ký tham gia</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.subscribed}
                onPress={() => {
                  handleSubcribe();
                }}
              >
                <Text style={styles.contentSubcribed}>Đã đăng ký</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.noiDungComp}>
            <Text style={styles.noiDungTitle}>Nội dung</Text>
            <Text style={styles.dcContent}>
              {"\t\t"}
              {data.data.moTa}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}
