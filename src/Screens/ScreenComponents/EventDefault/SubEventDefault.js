import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  FlatList,
} from "react-native";
import axios from "axios";
import { styles } from "./SubEventDefaultStyles";
import MyHeader from "../../../components/MyHeader";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as Animatable from "react-native-animatable";
import { Animations } from "../../../Constants/Animations";
import moment from "moment";
import Styles from "../../../common/Styles";
import Colors from "../../../Constants/Colors";

export default function SubEventDefault({ route, navigation }) {
  const viewRef = useRef(null);
  const [iD_BV, setID_BV] = useState(route.params.iD_BV);
  const [dcs, setDcs] = useState([]);
  console.log(iD_BV);

  const getDiemHienMauCoDinhOfHospital = async () => {
    let token = await AsyncStorage.getItem("token");
    token = "Bearer " + token;
    const config = {
      headers: { Authorization: token },
    };
    try {
      const res = await axios.get(
        "http://localhost:44369/api/NguoiHienMau/EventDefaultByUser?idbv=" +
          iD_BV,
        config
      );
      console.log(res.data.data);

      setDcs(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const DcItem = ({
    item: { iD_DC, dc, thoiGian_BD, thoiGian_KT },
    index,
    animation,
    navigation,
  }) => {
    return (
      <View style={styles.child}>
        <View style={styles.icon}>
          <Icon size={22} name={"map-marked-alt"} />
        </View>
        <View style={styles.dc}>
          <View>
            <Text style={styles.text}>{dc}</Text>
          </View>
          <View
            style={{
              padding: 5,
              borderTopWidth: 0.5,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 5,
            }}
          >
            {(new Date(thoiGian_KT).getTime() > new Date().getTime()) &&
              (new Date(thoiGian_BD).getTime() <= new Date().getTime()) && (
              <Text>
                {moment(thoiGian_BD.substring(10), "h:mm a").format("h:mm")}
                {" - "}
                {moment(thoiGian_KT.substring(10), "h:mm a").format("h:mm")} |
                Còn hoạt động
              </Text>
            )}

            {new Date(thoiGian_KT).getTime() < new Date().getTime() && (
              <Text>Tạm ngưng hoạt động</Text>
            )}
            {new Date(thoiGian_BD).getTime() > new Date().getTime() && (
              <Text>Sắp hoạt động</Text>
            )}
          </View>
        </View>
        <View style={styles.btn}  >
          <TouchableOpacity style={styles.btnContent}
          onPress={() => {
            console.log("nhấn");
            navigation.navigate("PushCalendar", {
              iddc: iD_DC,
              dc: dc
            });
          }}
          >
            {(new Date(thoiGian_KT).getTime() > new Date().getTime()) &&
              (new Date(thoiGian_BD).getTime() <= new Date().getTime()) && (
              <Text
                style={{ fontSize: 20, color: "blue" }}
               
              >
                Đặt lịch
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  useEffect(() => {
    getDiemHienMauCoDinhOfHospital();
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      viewRef.current.animate({ 0: { opacity: 0.5 }, 1: { opacity: 1 } });
    });
    // ToastAndroid.show(animation+ ' Animation', ToastAndroid.SHORT);
    return () => unsubscribe;
  }, [navigation]);
  const animation = Animations["flipInX"]; //Math.floor(Math.random() * Animations.length)
  const ItemSeparator = () => <View style={styles.separator} />;

  const renderItem = ({ item, index }) => (
    <DcItem
      item={item}
      index={index}
      animation={animation}
      navigation={navigation}
    />
  );

  const ListEmptyComponent = () => {
    const anim = {
      0: { translateY: 0 },
      0.5: { translateY: 50 },
      1: { translateY: 0 },
    };
    return (
      <Animatable.View style={[styles.listEmpty]}>
        <Animatable.Text
          animation={anim}
          easing="ease-in-out"
          duration={3000}
          style={{ fontSize: 24 }}
          iterationCount="infinite"
        >
          Không thấy sự kiện nào
        </Animatable.Text>
      </Animatable.View>
    );
  };
  return (
    <View style={{ backgroundColor: "#EFF5F5", height: "100%" }}>
      <MyHeader
        back
        onPressBack={() => navigation.goBack()}
        title={"Địa chỉ hiến máu của bệnh viện"}
        right="more-vertical"
        onRightPress={() => console.log("right")}
      />
      <Animatable.View
        ref={viewRef}
        easing={"ease-in-out"}
        duration={500}
        style={Styles.container}
      >
        <FlatList
          data={dcs}
          keyExtractor={(_, i) => String(i)}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={ItemSeparator}
          ListEmptyComponent={ListEmptyComponent}
        />
      </Animatable.View>
    </View>
  );
}
