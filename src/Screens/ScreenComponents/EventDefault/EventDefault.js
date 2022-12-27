import React, { useEffect, useRef, useState } from "react";

import * as Location from "expo-location";
import {
  AsyncStorage,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import moment from "moment";
import Styles from "../../../common/Styles";
import Colors from "../../../Constants/Colors";
import MyHeader from "../../../components/MyHeader";
import MyLocation from "../../../components/MyLocation";
import * as Animatable from "react-native-animatable";
import { Animations } from "../../../Constants/Animations";
import { styles } from "./EventDefaultStyles";
import axios from "axios";
const EventItem = ({
  item: { iD_BV, tenBV, dc },
  randomLogo,
  index,
  animation,
  navigation,
}) => {
  return (
    <Animatable.View animation={animation} duration={1000} delay={index * 300}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          navigation.navigate("SubEventDefault", {
            iD_BV: iD_BV,
          });
        }}
      >
        <View style={styles.avatar}>
          {randomLogo == 1 && <Image
            style={styles.img}
            source={require("../../../../assets/logoBV/ag.jpg")}
          />}
          {randomLogo == 2 && <Image
            style={styles.img}
            source={require("../../../../assets/logoBV/dd.png")}
          />}
          {randomLogo == 3 && <Image
            style={styles.img}
            source={require("../../../../assets/logoBV/dg.jpg")}
          />}
          {randomLogo == 4 && <Image
            style={styles.img}
            source={require("../../../../assets/logoBV/qd.png")}
          />}
          {randomLogo == 5 && <Image
            style={styles.img}
            source={require("../../../../assets/logoBV/dn.jpg")}
          />}
        </View>
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={styles.name}>{tenBV}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.date}>{dc}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default function Home({ route, navigation }) {
  const viewRef = useRef(null);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  var [province, setProvince] = useState("Quận Gò Vấp, Hồ Chí Minh");
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [tensukien, setTenSuKien] = useState("");

  const getData = async () => {
    let token = await AsyncStorage.getItem("token");
    token = "Bearer " + token;
    const config = {
      headers: { Authorization: token },
    };
    try {
      let url =
        "http://localhost:44369/api/NguoiHienMau/GetListHospitalByUser?page=" +
        page +
        "&province=" +
        province +
        "&tenbv=" +
        tensukien;
      console.log(url);
      const res = await axios.get(url, config);
      console.log(res.data);

      setData(data.concat(res.data[1]));
      var newPage = page + 1;
      setPage(newPage);
    } catch (err) {
      console.log(err);
    }
  };

  const getProvinceOfVietNam = async () => {
    const res = await axios.get("https://provinces.open-api.vn/api/?depth=2");
    console.log(res.data);
    setProvinces(res.data);
  };
  const handleOnEndReached = () => {
    getData();
  };
  const hanldeGetDataByDistrict = async (addressCurrent) => {
    let token = await AsyncStorage.getItem("token");
    token = "Bearer " + token;
    const config = {
      headers: { Authorization: token },
    };
    try {
      let url =
        "http://localhost:44369/api/NguoiHienMau/GetListHospitalByUser?page=1&province=" +
        addressCurrent +
        "&tenbv=";
      console.log(url);
      const res = await axios.get(url, config);
      console.log(res.data[1]);

      setData(res.data[1]);
      setPage(1);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFindEventByName = async () => {
    let token = await AsyncStorage.getItem("token");
    token = "Bearer " + token;
    const config = {
      headers: { Authorization: token },
    };
    try {
      let url =
        "http://localhost:44369/api/NguoiHienMau/GetListHospitalByUser?page=1&province=" +
        province +
        "&tenbv=" +
        tensukien;
      console.log(url);
      const res = await axios.get(url, config);
      console.log(res.data);

      setData(res.data[1]);
      setPage(1);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
    getProvinceOfVietNam();
  }, []);
  const animation = Animations["flipInX"]; //Math.floor(Math.random() * Animations.length)
  const ItemSeparator = () => <View style={styles.separator} />;

  const renderItem = ({ item, index }) => (
    <EventItem
      item={item}
      index={index}
      animation={animation}
      navigation={navigation}
      randomLogo={Math.floor(Math.random() * 10)% 5 + 1 }
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
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      viewRef.current.animate({ 0: { opacity: 0.5 }, 1: { opacity: 1 } });
    });
    // ToastAndroid.show(animation+ ' Animation', ToastAndroid.SHORT);
    return () => unsubscribe;
  }, [navigation]);
  return (
    <View style={[Styles.container]}>
      {provinces && (
        <MyLocation
          provinces={provinces}
          changeInput={(text) => {
            setTenSuKien(text);
          }}
          clickFind={() => {
            console.log("Nhấn");
            handleFindEventByName();
          }}
          onSelectedDistricts={(provinceCurrent, districtCurrent) => {
            const address = districtCurrent + "," + provinceCurrent;
            setProvince(address);
            hanldeGetDataByDistrict(address);
          }}
          placeholder={" Nhập tên bệnh viện cần tìm"}
        />
      )}
      <Animatable.View
        ref={viewRef}
        easing={"ease-in-out"}
        duration={500}
        style={Styles.container}
      >
        <FlatList
          data={data}
          keyExtractor={(_, i) => String(i)}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={ItemSeparator}
          ListEmptyComponent={ListEmptyComponent}
          onEndReached={handleOnEndReached}
        />
      </Animatable.View>
    </View>
  );
}
