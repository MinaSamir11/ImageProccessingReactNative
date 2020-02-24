import React, {Component} from "react";

import {
   View,
   Text,
   TouchableOpacity,
   Image,
   Button,
   ActivityIndicator,
   Modal,
   Dimensions,
} from "react-native";

import {
   TextInput,
   Appbar,
   Avatar,
   TouchableRipple,
   Menu,
} from "react-native-paper";

import Styles from "src/app-Style";

import Front from "src/assests/image/carr.png";

import frontright from "src/assests/image/yaris.png";

import frontleft from "src/assests/image/yarsleft.png";

import Camera from "components/camera";

import vision, {firebase} from "@react-native-firebase/ml-vision";

import {
   accelerometer,
   gyroscope,
   setUpdateIntervalForType,
   SensorTypes,
} from "react-native-sensors";
import {map, filter} from "rxjs/operators";

//import {utils} from '@react-native-firebase/app';

import Snackbar from "react-native-snackbar";

//const Clarifai = require("clarifai");

class ImageRecognition extends Component {
   constructor(props) {
      super(props);
   }

   subscription = () => {
      accelerometer
         .pipe(
            map(({x, y, z}) => x + y + z),
            filter(speed => speed > 20),
         )
         .subscribe(
            speed => console.log(`You moved your phone with ${speed}`),
            error => {
               console.log("The sensor is not available");
            },
         );
   };
   state = {
      loading: false,
      start: false,
      showCamera: false,
      shashNumberInput: "",
   };

   componentDidMount() {
      this.subscription();
   }
   handleImage(image) {
      this.setState({photo: image});
   }

   hideModal() {
      this.setState({showCamera: false});
   }

   showSnackBar(text) {
      Snackbar.show({
         text: text,
         duration: Snackbar.LENGTH_LONG,
         action: {
            text: "OK",
            textColor: "green",
            onPress: () => {},
         },
      });
   }

   //  async ProccessingImage(path, index) {
   //     // Initialise the Clarifai api

   //     const app = new Clarifai.App({
   //        apiKey: "d28e9bf313754c57bb3745c9fd7c2f09",
   //     });
   //     Identify the image
   //     var request = require('request'),
   //       apiKey = 'acc_241045605e79650',
   //       apiSecret = 'fb31f402f847818fde7d2727eb8fb816',
   //       imageUrl = 'https://firebasestorage.googleapis.com/v0/b/newprojectcustomer.appspot.com/o/IMG_20200209_093535.jpg?alt=media&token=2fc4eaba-bc96-4543-a494-84127a6c4368';

   //       request.get('https://api.imagga.com/v2/tags?image_url='+encodeURIComponent(imageUrl), function (error, response, body) {
   //       console.log('Status:', response.statusCode);
   //       console.log('Headers:', JSON.stringify(response.headers));
   //       console.log('Response:', body);
   //       }).auth(apiKey, apiSecret, true);

   //     app.models
   //       .predict(Clarifai.Ca, path)
   //       .then(response =>
   //         console.log(response.outputs[0].data).catch(err => alert(err)),
   //       );
   //     app.models.predict({ id: 'Car', version: '4bc922f100374c6284de12c3e7506d6c' },
   //       'https://firebasestorage.googleapis.com/v0/b/newprojectcustomer.appspot.com/o/IMG_20200209_093535.jpg?alt=media&token=2fc4eaba-bc96-4543-a494-84127a6c4368').then(
   //         function(response) {
   //           console.log(response.outputs[0].data);
   //         },
   //         function (err) {
   //           // there was an error
   //         }
   //       );
   //     app.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
   //     .then(generalModel => {
   //       return generalModel.predict("the-image-url");
   //     })
   //     .then(response => {
   //       var concepts = response['outputs'][0]['data']['concepts']
   //     });

   //     const picturesDir = firebase.utils.FilePath.PICTURES_DIRECTORY;
   //  }

   showPicker = index => {
      const options = {
         title: "Choose Picture",
         customButtons: [{name: "remove", title: "Remove"}],
         storageOptions: {
            skipBackup: false,
            path: "images",
         },
      };

      ImagePicker.showImagePicker(options, response => {
         //console.log('Response = ', response);
         if (response.didCancel) {
            console.log("User cancelled image picker");
         } else if (response.error) {
            console.log("ImagePicker Error: ", response.error);
         } else if (response.customButton) {
            console.log("User tapped custom button: ", response.customButton);
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
            // if (response.fileSize < 2655555) {
            //   this.showSnackBar(
            //     'Image Quality is too low try using onther device or try again',
            //   );
            //   return;
            // }
            // no problem
            if (index === 1) {
               this.ProccessingImage(response.uri, index);
               console.log(response.latitude, index);
               console.log(response.longitude, index);

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
                        alignItems: "center",
                        alignSelf: "center",
                        alignContent: "center",
                        margin: 15,
                     }}>
                     You Must Take Picture From our App 3 capture from diffrent
                     phases from front of the car and other 3 diffrent phases
                     from back of the car
                  </Text>
                  <View
                     style={{
                        flexDirection: "row",
                        margin: 15,
                        alignItems: "center",
                        alignSelf: "center",
                     }}>
                     <TouchableRipple
                        style={{
                           borderRadius: 50,
                        }}
                        onPress={() => {
                           this.setState({
                              showCamera: true,
                           });
                        }}
                        rippleColor="rgba(0,0,0, 0.05)">
                        {this.state.photo ? (
                           <Avatar.Image
                              size={85}
                              source={{uri: this.state.photo}}
                           />
                        ) : (
                           <Avatar.Icon size={85} icon="camera" />
                        )}
                     </TouchableRipple>
                  </View>
                  <TextInput
                     label="Enter Shaseh Number"
                     value={this.state.shashNumberInput}
                     onChangeText={shashNumberInput =>
                        this.setState({shashNumberInput})
                     }
                  />
                  <Modal
                     style={Styles.cameraModal}
                     visible={this.state.showCamera}>
                     <Camera
                        handleImage={image => this.handleImage(image)}
                        hideModal={() => this.hideModal()}
                        handleInputs={this.state.shashNumberInput}
                     />
                  </Modal>
               </View>
            )}
         </View>
      );
   }
}
export default ImageRecognition;
