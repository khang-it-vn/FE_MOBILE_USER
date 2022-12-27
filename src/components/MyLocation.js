import React from "react";
import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { Badge, Surface, Text, Title } from "react-native-paper";
import Feather from "react-native-vector-icons/Feather";
import Colors from "../Constants/Colors";
import { styles } from "./MyLocationStyles";
import SelectDropdown from "react-native-select-dropdown";
const IconSize = 24;

const AppHeader = ({
  provinces,
  onSelectedDistricts,
  placeholder,
  changeInput,
  clickFind,
}) => {
  const [districts, setDistricts] = React.useState([]);
  const [provinceCurrent, setProvinceCurrent] = React.useState("");
  var districtsCurrent = "";
  return (
    <Surface style={[styles.header, { backgroundColor: Colors.lightRed }]}>
      <View style={styles.mylocation}>
        <View style={styles.compFind}>
          <View style={styles.compFindInput}>
            <TextInput
              style={styles.input}
              placeholder={placeholder}
              onChangeText={changeInput}
            />
          </View>
          <View style={styles.compFindSearch}>
            <TouchableOpacity onPress={clickFind}>
              <Feather name={"search"} size={24} Color={"black"} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.compProvince}>
          <View style={styles.province}>
            <SelectDropdown
              buttonStyle={{
                width: "550%",
                height: 30,
                backgroundColor: Colors.lightRed,
              }}
              buttonTextStyle={{ fontSize: 16 }}
              rowTextStyle={{
                fontSize: 10,
              }}
              data={provinces}
              onSelect={(selectedItem, index) => {
                setProvinceCurrent(selectedItem.name);
                setDistricts(selectedItem.districts);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem.name;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item.name;
              }}
            />
          </View>
          <View style={styles.districts}>
            <SelectDropdown
              buttonStyle={{
                width: "550%",
                height: 30,
                backgroundColor: Colors.lightRed,
              }}
              buttonTextStyle={{ fontSize: 16 }}
              rowTextStyle={{
                fontSize: 10,
              }}
              data={districts}
              onSelect={(selectedItem, index) => {
                districtsCurrent = selectedItem.name;
                onSelectedDistricts(provinceCurrent, districtsCurrent);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem.name;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item.name;
              }}
            />
          </View>
        </View>
      </View>
    </Surface>
  );
};

export default AppHeader;
