import React, {Component} from "react";

import {DefaultTheme, Provider as PaperProvider} from "react-native-paper";

import CaptureCamera from "src/App";

//import { Provider } from "react-redux";

//import initialState from "reduxfiles/reducers/initialState";

//import configureStore from "reduxfiles/configureStore";

//const store = configureStore(initialState);

const theme = {
   ...DefaultTheme,
   roundness: 2,
   colors: {
      ...DefaultTheme.colors,
      primary: "#000",
      accent: "#FFF",
   },
};

class App extends Component {
   render() {
      return (
         <PaperProvider theme={theme}>
            <CaptureCamera />
         </PaperProvider>
      );
   }
}

export default App;
