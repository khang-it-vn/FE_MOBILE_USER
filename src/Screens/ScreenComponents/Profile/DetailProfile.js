import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  AsyncStorage,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
} from "react-native";
import MyHeader from "../../../components/MyHeader";
import { styles } from "./DetailProfileStyles";
import moment from "moment";
import Icon from "react-native-vector-icons/FontAwesome5";
import IconOld from "react-native-vector-icons/FontAwesome";
import IconFontiso from "react-native-vector-icons/Fontisto";
import { RadioButton } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

export default function DetailProfile({ route, navigation }) {
  const [data, setData] = useState(route.params.infoData);
  const [avatar, setAvatar] = useState(route.params.avatar);
  const [phieuKetQua, setPhieuKetQua] = useState(route.params.phieuKetQua);
  // state component
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false); // datetime
  // params of object
  const [hoTen, setHoTen] = useState(data.hoTen);
  const [email, setEmail] = useState(data.email);
  const [gioiTinh, setGioiTinh] = useState(data.gioiTinh);
  const [dob, setDOB] = useState(data.dob);
  const [phone, setPhone] = useState(data.sdt);
  const [dc, setDC] = useState(data.dc);
  const [hinhAnh, setHinhAnh] = useState(data.hinhAnh);
  console.log(route.params);

  const handleUpdateInfomation = async () => {
    console.log(hoTen);
    console.log(email);
    console.log(gioiTinh);
    console.log(dob);
    console.log(phone);
    console.log(dc);
    console.log(hinhAnh);

    try {
      let token = await AsyncStorage.getItem("token");
      token = "Bearer " + token;
      const config = {
        headers: { Authorization: token },
      };
      const res = await axios.patch(
        "http://localhost:44369/api/AccountNguoiHienMau",
        {
          sdt: phone,
          email: email,
          dob: dob,
          gioiTinh: gioiTinh,
          dc: dc,
          hoTen: hoTen,
          hinhAnh: hinhAnh,
        },
        config
      );
      console.log("Thông tin cập nhật mới");
    console.log(res.data);
    if(res.data && res.data.success)
    {
      setData(res.data.data);
      getData();
    
    }
    } catch (error) {
      console.log(error);
    }
  };
  const onChange = (event, selectedDate) => {
    const currenDate = selectedDate || date;
    setOpen(false);
    setDOB(currenDate);
  };
  const getData = async () => {
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
      setData(res.data[0].data);
      setAvatar(res.data[1]);
      
    } catch (error) {
      console.log(error.message);
    }
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    let localUri = result.uri;
    let filename = localUri.split("/").pop();

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();
    formData.append("image", { uri: localUri, name: filename, type });
    let token = await AsyncStorage.getItem("token");
    token = "Bearer " + token;
    await axios
      .post(
        "http://localhost:44369/api/AccountNguoiHienMau/UploadImages",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log(res.data.data);
        setHinhAnh(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ScrollView>
      <MyHeader
        back
        onPressBack={() => navigation.goBack()}
        title={"Thông tin cá nhân "}
        right="more-vertical"
        onRightPress={() => console.log("right")}
      />
      {!edit ? (
        <View>
          <View style={styles.main}>
            <View style={styles.head}>
              <View>
                <Image
                  style={styles.avatar}
                  source={{ uri: "data:image/png;base64," + avatar }}
                />
              </View>
              <View>
                <Text style={styles.name}>{data.hoTen}</Text>
              </View>
            </View>
          </View>
          <View style={styles.body}>
            <View style={styles.contentBodyElement}>
              <Text style={styles.contentTitle}>
                <Icon style={styles.icon} size={24} name={"mail-bulk"} />
              </Text>
              <Text style={styles.contentValue}>{data.email}</Text>
            </View>
            <View style={styles.contentBodyElement}>
              <Text style={styles.contentTitle}>
                <IconOld style={styles.icon} size={24} name={"intersex"} />
              </Text>
              <Text style={styles.contentValue}>
                {"  "}
                {data.gioiTinh ? "Nam" : "Nữ"}
              </Text>
            </View>
            <View style={styles.contentBodyElement}>
              <Text style={styles.contentTitle}>
                <Icon size={24} name={"birthday-cake"} />
                {"  "}
              </Text>
              <Text style={styles.contentValue}>
                {moment(new Date(data.dob.substring(0, 10))).format(
                  "DD/MM/YYYY"
                )}
              </Text>
            </View>
            <View style={styles.contentBodyElement}>
              <Text style={styles.contentTitle}>
                <Icon size={24} name={"phone-alt"} />
                {"  "}
              </Text>
              <Text style={styles.contentValue}>{data.sdt}</Text>
            </View>
            <View style={styles.contentBodyElement}>
              <Text style={styles.contentTitle}>
                <Icon size={24} name={"street-view"} />
                {"  "}
              </Text>
              <Text style={styles.contentValue}>{data.dc}</Text>
            </View>
            <View style={styles.contentBodyElement}>
              <Text style={styles.contentTitle}>
                <IconFontiso
                  style={styles.icon}
                  size={24}
                  name={"blood-drop"}
                />
              </Text>
              <Text style={styles.contentValue}>
                {" "}
                {"   "}
                {typeof phieuKetQua === "string"
                  ? "Chưa xác định nhóm máu"
                  : phieuKetQua.loaiMau.tenLoai}
              </Text>
            </View>
            <View style={[styles.contentBodyElement, styles.edit.center]}>
              <TouchableOpacity
                style={styles.edit.btnUpdate}
                onPress={() => {
                  setEdit(!edit);
                }}
              >
                <Text style={styles.edit.titleBtnUpdate}>
                  Cập nhật thông tin
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View>
          <View style={styles.main}>
            <View style={styles.head}>
              <View>
                <Image
                  style={styles.edit.avatar}
                  source={{ uri: "data:image/png;base64," + avatar }}
                />
                <Icon
                  style={styles.edit.iconCamera}
                  size={24}
                  name={"camera"}
                  onPress={pickImage}
                />
              </View>
              <View>
                <TextInput
                  style={styles.edit.hoTen}
                  placeholder={data.hoTen}
                  onChangeText={setHoTen}
                />
              </View>
            </View>
          </View>
          <View style={styles.body}>
            <View style={styles.contentBodyElement}>
              <Text style={styles.contentTitle}>
                <Icon style={styles.icon} size={24} name={"mail-bulk"} />
              </Text>
              <TextInput
                style={styles.edit.input}
                placeholder={data.email}
                onChangeText={setEmail}
              />
            </View>
            <View style={styles.contentBodyElement}>
              <Text style={styles.contentTitle}>
                <IconOld style={styles.icon} size={24} name={"intersex"} />
              </Text>
              <View style={[styles.edit.row]}>
                <RadioButton
                  value="Nam"
                  status={gioiTinh ? "checked" : "unchecked"}
                  onPress={() => setGioiTinh(true)}
                />
                <Text>Nam</Text>
                <RadioButton
                  value="Nữ"
                  status={!gioiTinh ? "checked" : "unchecked"}
                  onPress={() => setGioiTinh(false)}
                />
                <Text>Nữ</Text>
              </View>
            </View>
            <View style={styles.contentBodyElement}>
              <Text style={styles.contentTitle}>
                <Icon size={24} name={"birthday-cake"} />
                {"  "}
              </Text>
              <TouchableOpacity
                style={[styles.edit.dobBtn]}
                onPress={() => setOpen(true)}
              >
                <Text style={[styles.edit.titleBtn]}>Chọn ngày sinh</Text>
              </TouchableOpacity>
              {open && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={new Date(dob)}
                  mode={"date"}
                  is24Hour={true}
                  display={"default"}
                  onChange={onChange}
                />
              )}
            </View>
            <View style={styles.contentBodyElement}>
              <Text style={styles.contentTitle}>
                <Icon size={24} name={"phone-alt"} />
                {"  "}
              </Text>
              <TextInput
                style={styles.edit.input}
                placeholder={data.sdt}
                onChangeText={setPhone}
              />
            </View>
            <View style={styles.contentBodyElement}>
              <Text style={styles.contentTitle}>
                <Icon size={24} name={"street-view"} />
                {"  "}
              </Text>
              <TextInput
                style={styles.edit.input}
                placeholder={data.dc}
                onChangeText={setDC}
              />
            </View>
            <View style={styles.contentBodyElement}>
              <Text style={styles.edit.warningTitle}>
                * Chỉ cập nhật lại dữ liệu của những trường bạn điền thông tin
              </Text>
            </View>
            <View style={[styles.contentBodyElement, styles.edit.center]}>
              <TouchableOpacity
                style={styles.edit.btnUpdate}
                onPress={() => {
                  setEdit(!edit);
                  handleUpdateInfomation();
                }}
              >
                <Text style={styles.edit.titleBtnUpdate}>Lưu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
