import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../../Constants/Colors";
export const styles = StyleSheet.create({
  srcMain: {
    paddingTop: 5,
    backgroundColor: "white",
  },
  srcCompTitle: {
    borderBottomWidth: 0.5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
  srcCompDetail: {
    marginTop: 5,
    paddingLeft: 5,
    borderBottomWidth: 0.5,
    alignItems: "center",
  },
  soLuong: {
    paddingBottom: 5,
    alignItems: 'center'
  },
  soLuongTitle:{
    fontSize: 20,
    fontWeight: 'bold'
  },
  thoiGian: {
    paddingBottom: 5,
    alignItems: "center",
  },
  thoiGianTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  date: {
    alignItems: "center",
    paddingBottom: 5,
  },
  thoiGianContent:{
    fontSize: 19,
  },
  dates: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subscribe: {
    backgroundColor: Colors.lightRed,
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5
  },
  dcs: {
    fontSize: 20,
    alignItems: "center",
    paddingBottom: 5
  },
  titleDCs: {
    fontSize: 20,
    fontWeight: "bold",
  },
  noiDungTitle:{
    fontSize: 20,
    fontWeight: "bold",
  },
  noiDungComp:{
    alignItems: "center",
    padding: 10
  },
  noiDungContent:{
    fontSize: 19
  },
  dcContent:{
    fontSize: 19
  },
  contentSubcribe:{
    fontSize: 19,
    color: 'white'
  },
  contentSubcribed:{
    fontSize: 19,
    color: 'white'
  },
  subscribed:
  {
    backgroundColor: Colors.green,
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5
  }
});
