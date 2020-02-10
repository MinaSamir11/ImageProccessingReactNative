import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  uploadAvatar: {
    margin: 15,
    height: 75,
    width: 75,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#000',
    alignSelf: 'center',
  },
  Touchable: {
    width: 75,
    height: 75,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default styles;
