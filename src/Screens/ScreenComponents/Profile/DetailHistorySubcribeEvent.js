import React, { useState } from "react";
import { View, Text, FlatList, Alert } from "react-native";
import MyHeader from "../../../components/MyHeader";
import Styles from "../../../common/Styles";
import { styles } from "./DetailHistorySubcribeEventStyles";
import Colors from "../../../Constants/Colors";
import moment from "moment";
export default function DetailHistorySubcribeEvent({ route, navigation }) {
  const [data, setData] = useState(route.params);
  console.log(route.params);
  return (
    <View>
      <MyHeader
        back
        onPressBack={() => navigation.goBack()}
        title={"Chi tiết"}
        right="more-vertical"
        onRightPress={() => console.log("right")}
      />
      <View style={{ margin: 5, padding: 10, borderWidth: 0.5 }}>
        <View style={styles.row}>
          <Text style={[styles.fontSize, styles.fontWeight]}>Sự kiện:</Text>
          <Text style={[styles.fontSize]}>{data.suKienHienMau.tenSK}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.fontSize, styles.fontWeight]}>Bệnh Viện:</Text>
          <Text style={[styles.fontSize]}>
            {data.suKienHienMau.taiKhoan.benhVien.tenBV}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.fontSize, styles.fontWeight]}>Địa chỉ:</Text>
          <FlatList
            data={data.suKienHienMau.dCs.split(";")}
            renderItem={({ item }) => (
              <Text style={[styles.fontSize]}>{item}</Text>
            )}
          />
        </View>
        <View style={styles.row}>
          <Text style={[styles.fontSize, styles.fontWeight]}>
            Ngày diễn ra:
          </Text>
          <Text style={[styles.fontSize]}>
            {moment(new Date(data.suKienHienMau.thoiGian_BD)).format(
              "DD/MM/YYYY"
            ) +
              " - " +
              moment(new Date(data.suKienHienMau.thoiGian_KT)).format(
                "DD/MM/YYYY"
              )}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.fontSize, styles.fontWeight]}>Khung giờ:</Text>
          <Text style={[styles.fontSize]}>
            {" "}
            {moment(new Date(data.suKienHienMau.thoiGian_BD)).format("h:m a") +
              " - " +
              moment(new Date(data.suKienHienMau.thoiGian_KT)).format("h:m a")}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.fontSize, styles.fontWeight]}>Giờ Đăng Ký:</Text>
          <Text style={[styles.fontSize]}>
            {moment(new Date(data.thoiGian_DK)).format("DD/MM/YYYY h:m a")}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.fontSize, styles.fontWeight]}>
            Loại thể tích đăng ký
          </Text>
          <Text style={[styles.fontSize]}>
            {data.iD_LTT == null ? (
              <Text
                onPress={() =>
                  Alert.alert(
                    "System BloodBank",
                    "Sức khỏe bạn không đạt hoặc bạn chưa tham gia khám sức khỏe",
                    [{ text: "Ok" }]
                  )
                }
              >
                Chưa xác định{" "}
                <Text
                  style={{ fontSize: 16, paddingBottom: 10, color: "#F56" }}
                >
                  ?
                </Text>{" "}
              </Text>
            ) : (
              data.loaiTheTich.tenLoai
            )}
          </Text>
        </View>
        {data.iD_LTT != null && data.trangThaiHien ? (
          <View>
            <View style={styles.row}>
              <Text style={[styles.fontSize, styles.fontWeight]}>
                Trạng thái hiến máu:
              </Text>
              <Text style={[styles.fontSize]}>
              Đã hiến máu
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.fontSize, styles.fontWeight]}>
                Phiếu kết quả:
              </Text>
              <Text style={[styles.fontSize]}>
              {data.iD_PKQ == null ? "Chưa có kết quả": "Link phiếu kết quả"}
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.row}>
            <Text style={[styles.fontSize, styles.fontWeight]}>
              Trạng thái hiến máu:
            </Text>
            <Text style={[styles.fontSize]}>Đã đăng ký nhưng chưa hiến máu</Text>
          </View>
        )}
      </View>
    </View>
  );
}
