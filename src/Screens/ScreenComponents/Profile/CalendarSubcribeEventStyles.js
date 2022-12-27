import { StyleSheet } from "react-native";
import Colors from '../../../Constants/Colors'
export const styles = StyleSheet.create({
  fontSize: {
    fontSize: 18,
  },
  row: {
    marginBottom: 10
  },
  titleRow: {
    fontWeight: 'bold'
  },
  btnCancleSubcribe: {
    textAlign: 'center',
    margin: 5,
    backgroundColor: Colors.lightRed,
    padding: 10,
    color: 'white'
  }
});
