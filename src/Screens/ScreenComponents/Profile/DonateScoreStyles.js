import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    titleScore: {
        flexDirection: 'column',
        margin: 10,
        fontSize: 20,
    },
    score:{
        flexDirection:'row',
        borderWidth: 0.5,
        backgroundColor: 'white'
    },
    child:
    {
        flexDirection: 'row',
        padding: 20,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 15
    },
    titleChild:{
        fontSize: 20,
        height: 50,
        width: 220,
    },
    compRight:{
        paddingLeft: 20
    },
    scoreChild: {
        fontSize: 16,
        marginTop: 10,
        textAlign: 'left',
        marginRight: 55
    },
    btnDoiQua: {
        fontSize: 16,
        marginTop: 10,
        backgroundColor: 'green',
        borderRadius: 20,
        textAlign: 'center',
        color: 'white',
        width: 100
    },
    childHinhAnh:
    {
        borderWidth: 0.5
    },
    btnSoLuongDoi:{
        backgroundColor: 'red',
        marginTop: 10,
        borderRadius: 20,
    },
    soLuongDoi: {
        color:'white',
        fontSize: 16,
        textAlign: 'center'

    }
    
});