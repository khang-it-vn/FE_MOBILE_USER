import { StyleSheet } from "react-native";
import Colors from "../../../Constants/Colors";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  profileInfos: {
    marginTop: 16,
    paddingHorizontal: 19,
    flexDirection: "row",
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 60,
    borderColor: "#ddddd",
    borderWidth: 1,
    backgroundColor: "#dcdcdc",
  },
  nameSection: {
    marginTop: 10,
    marginLeft: 40,
    flexDirection: "column"
  },
  name: {
    fontSize: 24,
  },
  action: {
    marginTop: 19,
    paddingHorizontal: 12,
    width: 500,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 6,
    flexDirection: "row",
  },
  actionTitle: {
    marginTop: 4,
    marginLeft: 15,
    fontSize: 20,
  },
  viewTitle: {
    width: "775%",
  },
  avaInfo: {
    borderWidth: 0.5,
    height: 120,
  },
  iconStyle: {
    width: 32,
    height: 30,
    alignItems: "center",
    paddingTop: 5,
    backgroundColor: "#ff4f7e",
  },
  iconRight: {
    marginTop: 5,
  },
  compBtnInfo: {
    flexDirection: 'row'
  },
  compName:{
    marginBottom: 5
  },
  compContentInfoBtn:{
    fontSize: 16,
   textDecorationLine: 'underline',
    padding: 5,
    color: 'blue'
  }
});
