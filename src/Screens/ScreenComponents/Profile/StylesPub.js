import {Dimensions, StyleSheet } from 'react-native';
import Colors from '../../../Constants/Colors'
export const stylespub = StyleSheet.create({
  item: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  avatar: {
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letter: {
    color: 'white',
    fontWeight: 'bold',
  },
  details: {
    flexDirection: 'row',
    flex: 1,
    
  },
  
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  number: {
    fontSize: 14,
    color: Colors.darkGray,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.gray,
  },
  listEmpty: {
    height: Dimensions.get('window').height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 32,
    backgroundColor: Colors.white,
  },
  date:{
    fontSize: 16
  },title:{
    flexDirection: 'row',
    flex: 1,
   
    
  },
  container:{
    flex: 1,
    padding: 20,
  },
  soluong:{
    fontSize: 12,
    marginLeft: 5
  }, 
  column3:{
    flexDirection: 'row',
    padding: 0,
    
  },
  img:{
    width: 40, height: 40
  }
})
