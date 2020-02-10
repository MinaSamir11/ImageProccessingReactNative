import React, {Component} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  ActivityIndicator,
} from 'react-native';

import Styles from 'src/app-Style';

import Front from 'src/assests/image/carr.png';

import frontright from 'src/assests/image/yaris.png';

import frontleft from 'src/assests/image/yarsleft.png';

import ImagePicker from 'react-native-image-picker';

import vision, {firebase} from '@react-native-firebase/ml-vision';

import {utils} from '@react-native-firebase/app';

import Snackbar from 'react-native-snackbar';

const Clarifai = require('clarifai');

class ImageRecognition extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    firstImagedata: '',
    secImagedata: '',
    thirdImageData: '',
    firstImage: Front,
    secImage: frontright,
    thirdImage: frontleft,
    loading: false,
    start: false,
    FrontAnalysisImage: [],
    LeftFrontAnalysisImage: [],
    RightFrontAnalysisImage: [],
  };

  showSnackBar(text) {
    Snackbar.show({
      text: text,
      duration: Snackbar.LENGTH_LONG,
      action: {
        text: 'OK',
        textColor: 'green',
        onPress: () => {},
      },
    });
  }

  async ProccessingImage(path, index) {
    // Initialise the Clarifai api

    const app = new Clarifai.App({
      apiKey: 'f6948af254044705b648e9ca1d57fb93',
    });

    // Identify the image
    app.models
      .predict(Clarifai.GENERAL_MODEL, path)
      .then(response => console.log(response.outputs[0].data).catch(err => alert(err)));

    // //const picturesDir = firebase.utils.FilePath.PICTURES_DIRECTORY;

    // const labels = await firebase.vision().cloudImageLabelerProcessImage(path, {
    //   confidenceThreshold: 0.8,
    // });

    // let analyses = [];
    // labels.forEach(response => {
    //   if (response.confidence > 0.5858379220962524) {
    //     if (index === 1) {
    //       console.log('Landmark: ', response);
    //       analyses.push(response);
    //     } else {
    //       this.setState({
    //         FrontAnalysisImage: analyses,
    //       });
    //       return;
    //     }
    //     if (index === 2) {
    //       console.log('Landmark: ', response);
    //       analyses.push(response);
    //     } else {
    //       this.setState({
    //         FrontAnalysisImage: analyses,
    //       });
    //       return;
    //     }
    //   }
    // });

    // try {
    //   if (analyses.length > 2) {
    //     if (labels) {
    //       console.log(labels);
    //     }
    //     this.setState({
    //       loading: false,
    //     });
    //   } else {
    //     Snackbar.show({
    //       text:
    //         'Image must be have more details and more clarity about the car and around it !!!',
    //       duration: Snackbar.LENGTH_LONG,
    //       action: {
    //         text: 'UNDO',
    //         textColor: 'green',
    //         onPress: () => {},
    //       },
    //     });
    //   }
    // } catch (error) {
    //   Snackbar.show({
    //     text: 'error occur please try again' + error,
    //     duration: Snackbar.LENGTH_LONG,
    //     action: {
    //       text: 'UNDO',
    //       textColor: 'green',
    //       onPress: () => {},
    //     },
    //   });
    // }
  }

  showPicker = index => {
    const options = {
      title: 'Choose Picture',
      customButtons: [{name: 'remove', title: 'Remove'}],
      storageOptions: {
        skipBackup: false,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      //console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        if (index === 1) {
          this.setState({
            firstImagedata: Front,
          });
        } else {
          this.setState({
            secImagedata: frontright,
          });
        }
      } else {
        // if (response.width < response.height) {
        //   this.showSnackBar(
        //     'Image must be landscape and having more details around the car',
        //   );
        //   return;
        // }
        if (response.fileSize < 2655555) {
          this.showSnackBar(
            'Image Quality is too low try using onther device or try again',
          );
          return;
        }
        // no problem
        if (index === 1) {
          this.ProccessingImage(response.data, index);
          this.setState({
            firstImagedata: response,
            firstImage: {uri: response.uri},
            loading: true,
          });
        } else if (index === 2) {
          this.ProccessingImage(response.uri, index);
          this.setState({
            secImagedata: response,
            secImage: {uri: response.uri},
            loading: true,
          });
        } else if (index === 3) {
          this.ProccessingImage(response.uri, index);
          this.setState({
            thirdImageData: response,
            thirdImage: {uri: response.uri},
            loading: true,
          });
        } else if (index === 4) {
          this.setState({
            fouthImageData: response,
          });
        }
      }
    });
  };

  render() {
    return (
      <View>
        <ActivityIndicator
          animating={this.state.loading}
          size="large"
          color="#0000ff"
        />
        <Button
          onPress={() => {
            this.setState({start: true});
          }}
          title="Let's check our car"
        />
        {this.state.start && (
          <View>
            <Text
              style={{
                alignItems: 'center',
                alignSelf: 'center',
                alignContent: 'center',
                margin: 15,
              }}>
              You Must Take Picture From our App 3 capture from diffrent phases
              from front of the car and other 3 diffrent phases from back of the
              car
            </Text>
            <View
              style={{
                flexDirection: 'row',
                margin: 15,
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.showPicker(1);
                }}
                style={Styles.Touchable}>
                <Image
                  source={this.state.firstImage}
                  style={Styles.uploadAvatar}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={Styles.Touchable}
                onPress={() => {
                  this.showPicker(2);
                }}>
                <Image
                  source={this.state.secImage}
                  style={Styles.uploadAvatar}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.showPicker(3);
                }}
                style={Styles.Touchable}>
                <Image
                  source={this.state.thirdImage}
                  style={Styles.uploadAvatar}
                />
              </TouchableOpacity>
            </View>
            <Button onPress={this.ApiImageSimilarty} title="add" />
          </View>
        )}
      </View>
    );
  }
}
export default ImageRecognition;
