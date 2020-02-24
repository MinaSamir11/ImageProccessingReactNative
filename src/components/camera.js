import React, {PureComponent, Component} from "react";

import {View, Image, ActivityIndicator, Text} from "react-native";

import {IconButton, Button} from "react-native-paper";

import {RNCamera} from "react-native-camera";

import Styles from "src/app-Style";

import vision, {
   firebase,
   VisionCloudTextRecognizerModelType,
} from "@react-native-firebase/ml-vision";

import Snackbar from "react-native-snackbar";

class Camera extends Component {
   async ProcessImageProccessing() {
      if (this.camera) {
         console.log("in camera");
         const options = {quality: 0.2, base64: true};
         const data = await this.camera.takePictureAsync(options);
         if (!this.state.ShasehNo) {
            await this.setState({
               btn_command: "Verifying don't move",
            });
            await this.DetectShasehNo(data.uri);
            // await this.setState({ photo: data.uri });
         } else if (
            !this.state.FrontAnalysisImage ||
            !this.state.LeftFrontAnalysisImage
         ) {
            if (!this.state.FrontAnalysisImage) {
               await this.CarPhotoAnalysis(data.uri, 1);
               console.log("in front");
            } else if (!this.state.LeftFrontAnalysisImage) {
               console.log("in Left Function");
               await this.CarPhotoAnalysis(data.uri, 2);
            }
         }
      }
   }

   timeout = () => {
      this.ProcessImageProccessing();
   };

   Timer = () => {
      setTimeout(() => {
         //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
         this.timeout();
      }, 5000);
   };

   async CarPhotoAnalysis(path, index) {
      const labels = await firebase
         .vision()
         .cloudImageLabelerProcessImage(path, {});
      console.log(labels);

      let analyses = [];

      labels.forEach(response => {
         if (response.confidence > 0.6534213137626648) {
            console.log("Landmark: ", response);
            analyses.push(response);
         }
      });

      try {
         if (analyses.length > 10) {
            if (index === 1) {
               this.setState({
                  FrontAnalysisImage: analyses,
               });
            }
            if (index === 2) {
               this.setState({
                  LeftFrontAnalysisImage: analyses,
               });
            }
            if (this.state.FrontAnalysisImage.length > 1) {
               if (this.state.LeftFrontAnalysisImage) {
                  if (
                     this.state.FrontAnalysisImage.length <
                     this.state.LeftFrontAnalysisImage.length
                  ) {
                     this.setState({
                        btn_command: "Let's Start",
                        txt_instructions: "Try Test again you have 1 Chance",
                     });
                     Snackbar.show({
                        text:
                           "Centre Image Have less Details than Left Image of the Car Please Try again!",
                        duration: Snackbar.LENGTH_LONG,
                        action: {
                           text: "UNDO",
                           textColor: "green",
                           onPress: () => {},
                        },
                     });
                     return;
                  }
               }
            }
            if (this.state.FrontAnalysisImage) {
               console.log("front", this.state.FrontAnalysisImage);
               if (index === 1) {
                  this.setState({
                     txt_instructions:
                        "Go to left front of the car to capture photo you must include with picture more details around the car or test will be quit ",
                  });
                  this.Timer();
               }
               if (this.state.LeftFrontAnalysisImage) {
                  // console.log('left', this.state.LeftFrontAnalysisImage);
                  for (
                     var i = 0;
                     i < this.state.FrontAnalysisImage.length - 1;
                     i++
                  ) {
                     for (
                        var n = 0;
                        n < this.state.LeftFrontAnalysisImage.length - 1;
                        n++
                     ) {
                        if (
                           this.state.LeftFrontAnalysisImage[n].text ===
                           this.state.FrontAnalysisImage[i].text
                        ) {
                           this.state.filter.push(
                              this.state.LeftFrontAnalysisImage[n].text,
                           );
                        }
                     }
                  }
                  if (this.state.filter.length < 8) {
                     this.setState({
                        btn_command: "Let's Start",
                        txt_instructions: "Try Test again you have 1 Chance",
                     });
                     Snackbar.show({
                        text: "Image is not the same value is this your car !",
                        duration: Snackbar.LENGTH_LONG,
                        action: {
                           text: "UNDO",
                           textColor: "green",
                           onPress: () => {},
                        },
                     });
                  } else {
                     this.setState({
                        txt_instructions:
                           "All Done Front and centre are the Same Values",
                        stateLoading: false,
                        btn_command: "Done",
                     });
                     console.log("my filter", this.state.filter);
                  }
               }
            }
         } else {
            Snackbar.show({
               text:
                  "Image must be have more details and more clarity about the car and around it !!!",
               duration: Snackbar.LENGTH_LONG,
               action: {
                  text: "UNDO",
                  textColor: "green",
                  onPress: () => {},
               },
            });
            this.Timer();
         }
      } catch (error) {
         Snackbar.show({
            text: "" + error,
            duration: Snackbar.LENGTH_LONG,
            action: {
               text: "UNDO",
               textColor: "green",
               onPress: () => {},
            },
         });
      }
   }

   async DetectShasehNo(uri) {
      this.setState({
         stateLoading: true,
      });
      try {
         const labels = await firebase
            .vision()
            .cloudTextRecognizerProcessImage(uri, {
               modelType: VisionCloudTextRecognizerModelType.DENSE_MODEL,
            });
         // if (this.props.handleInputs === labels.text) {
         await console.log(labels);
         await this.setState({
            txt_instructions:
               "Go to the centre of the car To capture photos you must include with picture more details around the car or test will quit",
            btn_command: "All Done",
            ShasehNo: labels.text,
         });
         await this.Timer();
         // } else {
         //    this.setState({
         //       txt_instructions: "Shaseh Number is not the same",
         //    });
         //  }
      } catch (error) {
         console.log("error", error);
         await this.setState({
            txt_instructions: "Error Occurs",
            btn_command: "try again",
            stateLoading: true,
         });
      }
   }

   state = {
      photo: null,
      ShasehNo: null,
      stateLoading: true,
      btn_command: "Let's Start",
      txt_instructions: "Follow The Instruction appears here",
      Show_btn_command: true,
      FrontAnalysisImage: null,
      LeftFrontAnalysisImage: null,
      RightFrontAnalysisImage: [],
      filter: [],
   };

   render() {
      return (
         <View style={Styles.container}>
            <RNCamera
               ref={ref => {
                  this.camera = ref;
               }}
               captureAudio={false}
               style={Styles.preview}
               type={RNCamera.Constants.Type.back}
               androidCameraPermissionOptions={{
                  title: "Permission to use camera",
                  message: "We need your permission to use your camera",
                  buttonPositive: "AGREE",
                  buttonNegative: "CANCEL",
               }}
            />

            <View style={Styles.controls}>
               <IconButton
                  style={Styles.close}
                  icon="close"
                  color={"#FFF"}
                  size={24}
                  onPress={() => {
                     this.props.hideModal();
                  }}
               />

               <View style={Styles.ActivityIndicatior}>
                  <ActivityIndicator
                     style={Styles.Indicator}
                     animating={this.state.stateLoading}
                     color={"#fff"}
                     size={23}
                  />
                  <Text style={Styles.txt_Instructions}>
                     {this.state.txt_instructions}
                  </Text>
                  {this.state.Show_btn_command && (
                     <Button
                        style={Styles.btn_command}
                        disabled={!this.state.stateLoading}
                        onPress={() => {
                           if (this.state.btn_command === "Let's Start") {
                              this.setState({
                                 btn_command: "Reading...",
                                 stateLoading: false,
                                 txt_instructions:
                                    "Go to Shaseh Number and hold on while See all done",
                              });
                              this.Timer();
                           }
                           if (this.state.btn_command === "try again") {
                              this.setState({
                                 btn_command: "Let's Start",
                                 txt_instructions:
                                    "Follow The Instruction appears here",
                              });
                           }
                        }}>
                        {" "}
                        <Text style={Styles.txt_btn_command}>
                           {this.state.btn_command}
                        </Text>{" "}
                     </Button>
                  )}
               </View>
               {/* <View style={Styles.capture}>
                            <IconButton
                                icon="circle"
                                color={"#FFF"}
                                size={65}
                                onPress={() => {
                                    this.ProcessImageProccessing();
                                }}
                            />
                        </View> */}
            </View>
         </View>
      );
   }
}

export default Camera;
