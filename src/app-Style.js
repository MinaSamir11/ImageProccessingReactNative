import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

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
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center"
  },
  form: {
    width,
    padding: 16
  },
  input: {
    marginTop: 16
  },
  signupButton: {
    marginTop: 30,
    height: 56,
    justifyContent: "center"
  },
  signupText: {
    fontSize: 20
  },
  cameraModal: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center"
  },
  preview: {
    flex: 1,
    width
  },
  controls: {
    flex: 0,
    width,
    height,
    position: "absolute",
    top: 0,
    left: 0,
    flexDirection: "row"
  },
  capture: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderColor: "#FFF",
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    marginBottom: 30,
    marginLeft: (width - 70) / 2
  },
  imagePreviewContainer: {
    width,
    height,
    backgroundColor: "#FFF",
    position: "absolute",
    top: 0,
    justifyContent: "flex-end"
  },
  imagePreview: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  saveContainer: {
    height: 56,
    width,
    flexDirection: "row"
  },
  saveControl: {
    flex: 0.5,
    borderRadius: 0,
    justifyContent: "center"
  },
  close: {
    position: "absolute",
    top: 0,
    left: 0
    // flex:0.5,
    // alignItems: "flex-end",

  },
  ActivityIndicatior: {
    justifyContent: "flex-start",
    position: "absolute",
    top: 10,
    width: '35%',
    height: '40%',
    right: 0

    // alignSelf: "center",
  },
  txt_Instructions: {
    transform: [{ rotate: '90deg' }],
    position: "absolute",
    top: 100,
    right: 30,
    left: 20,
    width: '100%',
    height: '30%',
    color: '#fff',

  },
  btn_command: {
    transform: [{ rotate: '90deg' }],
    top: 100,
    right: 35,
    color: '#fff',
    borderColor: 'red',
    borderWidth: 1,
  },
  txt_btn_command: {
    color: '#fff'

  },
  Indicator: {
    top: 0,
    left: 40,
    right: 0
  }
});

export default styles;
