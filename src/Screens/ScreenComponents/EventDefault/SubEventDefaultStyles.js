import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
    child: {
        margin: 5,
        marginTop: 10,
        marginBottom: 0,
        flexDirection: 'row',
        borderWidth: 0.5,
        backgroundColor: 'white'
    },
    icon: {
        flexDirection: 'column',
        padding: 5,
        width: 35, 
        borderRightWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dc: {
        flexDirection: 'column',
        width: 300,
        padding: 5
    },
    btn: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 0.5
    },
    text:{
        fontSize: 20,
  
    },

})