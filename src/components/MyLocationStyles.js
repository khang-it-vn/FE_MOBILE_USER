import { StyleSheet } from "react-native";
import Colors from '../Constants/Colors';
export const styles = StyleSheet.create({
  header: {
    marginTop: 10,
    height: 80,
    elevation: 4,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  input: {
    borderWidth: 0.5,
    width: 350,
    marginLeft: 20,
    backgroundColor: "white",
    height: 30,
  },
  compFindInput: {
    flexDirection: "column",
  },
  compFindSearch: {
    flexDirection: "column",
    marginLeft: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
  },
  compFind: {
    flexDirection: "row",
    marginBottom: 10,
  },
  province: {
    marginLeft: 20,
    marginRight: 10,
    flexDirection: "column",

  },
  compProvince: {
    flexDirection: "row",
  },
  districts:{
    marginLeft: 155,
    marginRight: 10,
    flexDirection: "column",
  }
});
