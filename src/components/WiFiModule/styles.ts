import { StyleSheet } from "react-native";

export default StyleSheet.create({
    layout:{
flex:1,
    },
    pressable:{
        alignItems:'center',
        padding:10,
         borderWidth:1,
         borderRadius:8,
         borderColor:'grey',
      marginHorizontal:16,
      marginVertical:10
    },
        button: {
          backgroundColor: '#007BFF',
          padding: 10,
          borderRadius: 5,
          alignItems: 'center',
          marginVertical: 10,
        },
        buttonText: {
          color: '#FFF',
          fontSize: 16,
          fontWeight: 'bold',
        },
        networkItem: {
          padding: 15,
          borderBottomWidth: 1,
          borderBottomColor: '#CCC',
        },
        networkText: {
          fontSize: 16,
          color:'#000000',
        },
        connectionContainer: {
          marginTop: 20,
          marginHorizontal:16,
          backgroundColor:'white',
          opacity:0.9
        },
        selectedSSID: {
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: 10,
          color:	'#000000',
        },
        passwordInput: {
          borderWidth: 1,
          borderColor: '#CCC',
          borderRadius: 5,
          padding: 10,
          marginBottom: 10,
          color:'black'
        },
        list:{
            marginHorizontal:16,
        },
        text:{
            marginHorizontal:16,
            fontSize:18,
            color:'#000000'
        }
      
});