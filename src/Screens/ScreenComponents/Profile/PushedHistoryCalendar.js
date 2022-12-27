import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import MyHeader from "../../../components/MyHeader";
import { styles } from "./PushedHistoryCalendarStyles";
import axios from "axios";
import * as Animatable from "react-native-animatable";
import Styles from "../../../common/Styles";
import { Animations } from "../../../Constants/Animations";
import moment from "moment";
import SelectDropdown from "react-native-select-dropdown";

export default function PushedHistoryCalendar({ route, navigation }) {
  const viewRef = useRef(null);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [valueFilter, setValueFilter] = useState(1);
  const [totalSubcribe, setTotalSubcribe] = useState(0);

  const getData = async () => {
    let token = await AsyncStorage.getItem("token");
    token = "Bearer " + token;
    const config = {
      headers: { Authorization: token },
    };

    try {
      const res = await axios.get(
        "http://localhost:44369/api/NguoiHienMau/HistoryOfPushCalendar?page=" +
          page + "&valueFilter=" + valueFilter,
        config
      );
      console.log(res.data.data);
      if (res.data[0].data) {
        console.log("Dữ liệu lịch sử hiến máu page: " + page);
        setData(data.concat(res.data[0].data));
        setPage(page + 1);
        console.log(page);
        setTotalSubcribe(res.data[1])
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getDataByFilter = async (_valueFilter, _page) => {
    let token = await AsyncStorage.getItem("token");
    token = "Bearer " + token;
    const config = {
      headers: { Authorization: token },
    };

    try {
      const res = await axios.get(
        "http://localhost:44369/api/NguoiHienMau/HistoryOfPushCalendar?page=" +
          _page + "&valueFilter=" + _valueFilter,
        config
      );
      console.log(res.data.data);
      if (res.data[0].data) {
        console.log("Dữ liệu lịch sử hiến máu page: " + page);
        setData(res.data[0].data);
        setPage(2);
        console.log(page);
        setTotalSubcribe(res.data[1])
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      viewRef.current.animate({ 0: { opacity: 0.5 }, 1: { opacity: 1 } });
    });
    // ToastAndroid.show(animation+ ' Animation', ToastAndroid.SHORT);
    return () => unsubscribe;
  }, [navigation]);
  const ItemSeparator = () => <View style={styles.separator} />;
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
          Lịch sử trống!
        </Animatable.Text>
      </Animatable.View>
    );
  };
  const filter = [{
    value:1,
    name:"Đã hiến máu"
  }, {
    value:2,
    name:"Chưa hiến máu"
  }
]
  return (
    <View style={{ backgroundColor: "#EFF5F5" }}>
      <MyHeader
        back
        onPressBack={() => navigation.goBack()}
        title={"Lịch sử hẹn hiến máu"}
        right="more-vertical"
        onRightPress={() => console.log("right")}
      />
      <View style = {{
        flexDirection: 'row',
       justifyContent: 'center',
       alignItems: 'center',
       borderWidth: 0.5, padding: 5
      }}>
      <Text style={{fontSize: 20, marginRight:20, textAlign: 'center'}}>Lọc:</Text>
      <SelectDropdown
          buttonStyle={{
            width: "60%",
            marginBottom: 5,
            marginLeft: 10,
            height: 40,
             borderWidth: 0.5
          }}
          buttonTextStyle={{}}
          rowTextStyle={{}}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem.value);
           setValueFilter(selectedItem.value);
           getDataByFilter(selectedItem.value,1);
          }}
          data={filter}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem.name;
          }}
          rowTextForSelection={(item, index) => {
            return item.name;
          }}
        />
        <Text style={{fontSize: 20}}>Số lần: {totalSubcribe}</Text>
      </View>
      <Animatable.View ref={viewRef} easing={"ease-in-out"} duration={100}>
        <FlatList
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={ItemSeparator}
          ListEmptyComponent={ListEmptyComponent}
          data={data}
          keyExtractor={(_, i) => String(i)}
          renderItem={({ item }) => (
            <View
              style={{
                margin: 5,
                borderWidth: 0.5,
                borderRadius: 15,
                padding: 5,
                borderColor: "#F57",
              }}
            >
              <TouchableOpacity
              onPress={
                () => {
                    navigation.navigate("DetailPushedCalendarHistory", item);
                }
              }
              >
                <View style={{ paddingBottom: 5 }}>
                  <Text style={[styles.fontSize, { fontWeight: "bold" }]}>
                    {item.diemHienMauCoDinh.dc}
                  </Text>
                </View>
                <View style={{}}>
                  <Text style={[styles.fontSize]}>
                    Ngày hẹn hiến máu:{" "}
                    {moment(new Date(item.ngayHenHien)).format(
                      "h:m a, DD/MM/YYYY"
                    )}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          onEndReached={getData}
        />
      </Animatable.View>
    </View>
  );
}
