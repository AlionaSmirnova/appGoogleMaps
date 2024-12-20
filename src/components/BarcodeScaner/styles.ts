import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  layout: {
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 18,
    fontWeight: '400',
  },
  barkoderView: {
    width: '100%',
    height: 250,
  },
  btnContainer: {
    marginTop: 20,
  },

  resultImage: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 5,
  },
  scannerContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  scanner: {
    flex: 1,
    width: 100,
    height:600,
  },
 
  titleText: {
    fontSize: 24,
    fontStyle: 'italic',
    fontWeight: '600',
    color: 'black',
  },
  pressable: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    padding: 8,
  },
 
 
 
});
