import { StyleSheet } from "react-native";
import Colors from "../../../Constants/Colors";

export const styles = StyleSheet.create({
  child: {
    flexDirection: "row",
    borderWidth: 0.5,
    margin: 10,
    padding: 10,
  },
  col1: {
    flexDirection: "column",
  },
  col2: {
    flexDirection: "column",
  },
  titlehead: {
    fontSize: 20,
    textAlign: 'left',
    fontWeight: 'bold',
  
  },
  content:{
    fontSize: 20,
    paddingTop: 5,
    borderBottomWidth: 0.5,
    marginBottom: 5
  },
  btn: {
    

  },
  contentBtn:{
    fontSize: 20,
    color: Colors.primary,
    textDecorationLine: 'underline'
  }
});
