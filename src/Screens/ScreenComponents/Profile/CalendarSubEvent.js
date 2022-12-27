import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  AsyncStorage,
  Alert,
  TouchableOpacity,
} from "react-native";
import MyHeader from "../../../components/MyHeader";
import { styles } from "./CalendarSubEventStyles";
import React, { useRef, useState, useEffect } from "react";
import * as Animatable from "react-native-animatable";
import Styles from "../../../common/Styles";
import { Animations } from "../../../Constants/Animations";
import axios from "axios";
import { stylespub } from "./StylesPub";
import moment from "moment";
import SelectDropdown from "react-native-select-dropdown";

export default function CalendarSubEvent({ route, navigation }) {
  const viewRef = useRef(null);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [valueFilter, setValueFilter] = useState(1);
  const [totalSubcribe, setTotalSubcribe] = useState(0);
  console.log(route.params);

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
  const HistoryItem = ({ item, navigation }) => (
    <TouchableOpacity
      onPress={() => {
        console.log("press");
        navigation.navigate("DetailHistorySubcribeEvent", item);
      }}
      style={{
        flexDirection: "column",
        margin: 5,
        justifyContent: "center",
        width: 405,
        borderWidth: 0.5,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 15,
      }}
    >
      <View style={{ flexDirection: "row", borderBottomWidth: 0.5 }}>
        <Text style={[styles.nameHospital]}>{item.suKienHienMau.tenSK}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={[styles.timeSubcribe]}>
          Thời gian đăng ký:{" "}
          {moment(new Date(item.thoiGian_DK)).format("DD/MM/YYYY h:m a")}
        </Text>
      </View>
    </TouchableOpacity>
  );
  const getDataByFilter = async (_valueFilter,_page) => {
    let token = await AsyncStorage.getItem("token");
    token = "Bearer " + token;
    const config = {
      headers: { Authorization: token },
    };
    try {
      console.log(_page);
      const res = await axios.get(
        "http://localhost:44369/api/NguoiHienMau/GetHistorySubcribed?page=" +
        _page +"&valueFilter="+_valueFilter,
        config
      );
      if (res.data[0].data) {
        setData(res.data[0].data);
        console.log(res.data);
        setPage(_page + 1);
        setTotalSubcribe(res.data[1]);
      }else
      {
        setTotalSubcribe(0)
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const getData = async () => {
    let token = await AsyncStorage.getItem("token");
    token = "Bearer " + token;
    const config = {
      headers: { Authorization: token },
    };
    try {
      console.log(page);
      const res = await axios.get(
        "http://localhost:44369/api/NguoiHienMau/GetHistorySubcribed?page=" +
          page +"&valueFilter="+valueFilter,
        config
      );
      if (res.data[0].data) {
        setData(data.concat(res.data[0].data));
        console.log(res.data);
        var newPage = page + 1;
        setPage(newPage);
        setTotalSubcribe(res.data[1]);
      }else
      {
        setTotalSubcribe(0);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const renderItem = ({ item, index }) => (
    <HistoryItem item={item} key={index} navigation={navigation} />
  );

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
  const filter = [{
    value:1,
    name:"Đã hiến máu"
  }, {
    value:2,
    name:"Chưa hiến máu"
  }
]
  return (
    <SafeAreaView style={{ backgroundColor: "#EFF5F5", height: "100%" }}>
      <MyHeader
        back
        onPressBack={() => navigation.goBack()}
        title={"Lịch sử đăng ký hiến máu"}
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
          onEndReached={getData}
        />
      </Animatable.View>
    </SafeAreaView>
  );
}
