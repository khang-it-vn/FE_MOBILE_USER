import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  AsyncStorage,
  Image,
  FlatList,
} from "react-native";
import MyHeader from "../../../components/MyHeader";
import { styles } from "./DonateScoreStyles";
import axios from "axios";
import * as Animatable from "react-native-animatable";
import { Animations } from "../../../Constants/Animations";
import Styles from "../../../common/Styles";

export default function DonateScore({ route, navigation }) {
  const viewRef = useRef(null);
  const [infoData, setInfoData] = useState(route.params);
  const [quas, setQua] = useState([]);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  console.log(infoData);

  const getData = async () => {
    try {
      let token = await AsyncStorage.getItem("token");
      token = "Bearer " + token;
      const config = {
        headers: { Authorization: token },
      };
      const res = await axios.get(
        "http://localhost:44369/api/NguoiHienMau/GetQuas?page=" + page,
        config
      );
      console.log(res.data[0].data);
      setQua(quas.concat(res.data[0].data));
      setImages(res.data[1]);
      let newPage = page + 1;
      setPage(newPage);
    } catch (error) {
      console.log(error);
    }
  };

  const GiftItem = ({ item, index, animation, navigation }) => {
    console.log(images[index]);
    return (
      <View style={styles.child} key={index}>
        <View style={styles.childHinhAnh}>
          <Image
            style={{ width: 120, height: 120 }}
            source={{ uri: "data:image/png;base64," + images[index] }}
          />
        </View>
        <View style={styles.compRight}>
          <View>
            <Text style={styles.titleChild}>{item.tenQua}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.scoreChild}>{item.diem} Điểm</Text>
            {item.soLuongTon != 0 && (
              <TouchableOpacity>
                <Text style={styles.btnDoiQua}>Đổi quà </Text>
              </TouchableOpacity>
            )}
          </View>
          <View>
            <TouchableOpacity style={styles.btnSoLuongDoi}>
              <Text style={styles.soLuongDoi}>
                Số lượng còn: {item.soLuongTon}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  useEffect(() => {
    getData();
  }, []);

  const animation = Animations["flipInX"]; //Math.floor(Math.random() * Animations.length)
  const ItemSeparator = () => <View style={styles.separator} />;

  const renderItem = ({ item, index }) => (
    <GiftItem
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
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      viewRef.current.animate({ 0: { opacity: 0.5 }, 1: { opacity: 1 } });
    });
    // ToastAndroid.show(animation+ ' Animation', ToastAndroid.SHORT);
    return () => unsubscribe;
  }, [navigation]);
  const handleOnEndReached = () => {
    getData();
  }
  return (
    <SafeAreaView style={{ backgroundColor: "#EFF5F5", height: "100%" }}>
      <MyHeader
        back
        onPressBack={() => navigation.goBack()}
        title={"Đổi quà"}
        right="more-vertical"
        onRightPress={() => console.log("right")}
      />

      <View style={styles.score}>
        <Text style={styles.titleScore}>Số điểm hiện có:</Text>
        <Text style={styles.titleScore}>1000 điểm</Text>
      </View>
      {quas && (
        <Animatable.View
          ref={viewRef}
          easing={"ease-in-out"}
          duration={500}
          style={Styles.container}
        >
          <FlatList
            data={quas}
            keyExtractor={(_, i) => String(i)}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={ItemSeparator}
            ListEmptyComponent={ListEmptyComponent}
            onEndReached={handleOnEndReached}
          />
        </Animatable.View>
      )}
    </SafeAreaView>
  );
}
