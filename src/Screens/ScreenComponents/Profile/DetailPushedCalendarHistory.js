import React, { useState } from "react";
import { Text, View, Alert } from "react-native";
import MyHeader from "../../../components/MyHeader";
import { styles } from "./DetailPushedCalendarHistoryStyles";
export default function DetailPushedCalendarHistory({ route, navigation }) {
  const [data, setData] = useState(route.params);
  console.log(route.params);
  return (
    <View>
      <MyHeader
        back
        onPressBack={() => navigation.goBack()}
        title={"Chi tiết lịch sử hẹn hiến máu"}
        right="more-vertical"
        onRightPress={() => console.log("right")}
      />
      <View style={{ margin: 5, borderWidth: 0.5, padding: 10 }}>
        <View style={styles.marginBottom}>
          <Text style={[styles.fontSize, styles.fontWeight]}>
            Địa chỉ đăng ký:
          </Text>
          <Text style={[styles.fontSize]}>
            1502 Nguyễn Duy Trinh, Phường Long Trường, Quận 9
          </Text>
        </View>
        <View style={styles.marginBottom}>
          <Text style={[styles.fontSize, styles.fontWeight]}>
            Địa chỉ thuộc bệnh viện:
          </Text>
          <Text style={[styles.fontSize]}>
            Bệnh viện đa khoa thành phố, Quận 9
          </Text>
        </View>
        <View style={styles.marginBottom}>
          <Text style={[styles.fontSize, styles.fontWeight]}>
            Ngày hẹn hiến:
          </Text>
          <Text style={[styles.fontSize]}>9,45 am 12/11/2022</Text>
        </View>
        {data.iD_LTT == null ? (
          <View style={styles.marginBottom}>
            <Text style={[styles.fontSize, styles.fontWeight]}>
              Loại thể tích đăng ký:
            </Text>
            <Text
              style={[styles.fontSize, { color: "#F57" }]}
              onPress={() => {
                Alert.alert(
                  "System BloodBank",
                  "Có thể sức khỏe bạn chưa đạt hoặc bạn chưa đi khám sức khỏe"
                );
              }}
            >
              Chưa xác định ?
            </Text>
          </View>
        ) : (
          <View>
            <View style={styles.marginBottom}>
              <Text style={[styles.fontSize, styles.fontWeight]}>
                Loại thể tích đăng ký:
              </Text>
              <Text style={[styles.fontSize]}>{data.loaiTheTich.tenLoai}</Text>
            </View>
            <View style={styles.marginBottom}>
              <Text style={[styles.fontSize, styles.fontWeight]}>
                Trạng thái hiến:
              </Text>
              <Text style={[styles.fontSize, { color: "#F57" }]}>
                {data.trangThaiHien ? (
                  <Text>Bạn đã hiến máu</Text>
                ) : (
                  <Text>Chưa hiến máu</Text>
                )}
              </Text>
            </View>
            {data.iD_PKQ ? (
              <View style={styles.marginBottom}>
                <Text style={[styles.fontSize, styles.fontWeight]}>
                  Phiếu kết quả:
                </Text>
                <Text style={[styles.fontSize]}>
                  Link phiếu kết quả
                </Text>
              </View>) :
              (<View style={styles.marginBottom}>
              <Text style={[styles.fontSize, styles.fontWeight]}>
                Phiếu kết quả:
              </Text>
              <Text style={[styles.fontSize]}>
                Chưa có kết quả
              </Text>
            </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
}
