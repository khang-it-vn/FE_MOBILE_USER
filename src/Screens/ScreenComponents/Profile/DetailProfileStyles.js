import { StyleSheet } from "react-native";
import Colors from "../../../Constants/Colors";
export const styles = StyleSheet.create({
  main: {
    backgroundColor: "white",
  },
  avatar: {
    width: 180,
    height: 180,
    borderRadius: 100,
    marginTop: 20,
    marginLeft: 120,
    marginBottom: 10,
  },
  head: {
    flexDirection: "column",
    backgroundColor: "white",
    borderBottomWidth: 0.5,
  },
  name: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  contentBodyElement: {
    flexDirection: "row",
    padding: 10,
  },
  contentTitle: {
    paddingLeft: 10,
  },
  contentValue: {
    paddingLeft: 15,
    fontSize: 18,
  },
  body: {
    backgroundColor: "white",
    height: "100%",
  },
  icon: {
    borderWidth: 1,
  },
  edit: {
    input: {
      borderWidth: 0.5,
      width: "85%",
      marginLeft: 15,
      paddingLeft: 10,
    },
    row: {
      flexDirection: "row",
      paddingLeft: 10,
    },
    dobBtn: {
      backgroundColor: "#F57",
      padding: 5,
      marginLeft: 15,
    },
    titleBtn: {
      color: "white",
    },
    warningTitle: {
      fontSize: 18,
      color: '#F57',
      paddingLeft: 10
    },
    hoTen:{
      borderWidth: 0.5,
      width: "55%",
      marginLeft: 90,
      margin: 10,
      paddingLeft: 10,
      alignItems: 'center'
    },
    iconCamera: {
      marginLeft: 200,
      
    },
    avatar: {
      width: 180,
      height: 180,
      borderRadius: 100,
      marginTop: 20,
      marginLeft: 120,
    },
    btnUpdate: {
      backgroundColor: '#F57',
      width: 250,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 70
    }, 
    titleBtnUpdate: {
      color: 'white',
      fontSize: 18,
      
    },
    center: {
      alignItems: 'center'
    }
  },
});
