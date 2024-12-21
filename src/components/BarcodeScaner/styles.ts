import {StyleSheet} from 'react-native';

export default StyleSheet.create({
 
  text: {
    color: 'black',
    fontSize: 18,
    fontWeight: '400',
  },

  scanner: {
    // flex: 1,
    width: 400,
    height:400,
    alignItems:'center'
  },
 
  titleText: {
    fontSize: 24,
    fontStyle: 'italic',
    fontWeight: '600',
    color: 'black',
  },
  pressable: {
    marginVertical: 4,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 8,
    padding: 6,
  },
 
  container: {
    flex: 1,
  },
 
  overlayText: {
    color: '#fff',
    fontSize: 16,
  },
  btnContainer:{
    marginHorizontal:16,
  },
  // list: {
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   backgroundColor: '#fff',
  //   padding: 10,
  // },
  // listHeader: {
  //   fontSize: 16,
  //   fontWeight: 'bold',
  //   marginBottom: 10,
  // },
  // listItem: {
  //   fontSize: 14,
  //   marginBottom: 5,
  // },
 
 
});
