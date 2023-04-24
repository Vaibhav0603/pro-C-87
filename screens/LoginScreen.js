import React, { Component } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  Text
} from "react-native";
import  firebase from "firebase";


import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { Button } from "react-native-paper";
SplashScreen.preventAutoHideAsync();

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
};

const appIcon = require("../assets/logo.png");

export default class LoginScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: "",
        password: "",
        fontsLoaded: false,
        userSignedIn: false
      };
    }
    async _loadFontsAsync() {
      await Font.loadAsync(customFonts);
      this.setState({ fontsLoaded: true });
    }
  
    componentDidMount() {
      this._loadFontsAsync();
    }
  register = (email,password,confirmPassword,first_name,last_name)
  if(password=confirmPassword){
    firebase
    .auth()
    .createUserWithEmailAndPassword(email,password)
    .then((userCredential)=>{
        Alert.alert("User registered!!");

    })
    .catch(error=>{
        Alert.alert(error.message);
    });
    
  }
 
  
    render() {
      if (this.state.fontsLoaded) {
       return <AppLoading/>;
      } else {
        return (
          <View
              style={{
                flex: 1,
                justifyContent:"center",
                alignItems:"center"
              }}>
                <Button
                  title="Sign in with Google"
                  onPress={() => this.signInWithGoogleAsync()}></Button>
            
                     
                        <View  style={styles.container}>
                          <SafeAreaView style={styles.droidSafeArea}/>
                          <View style={styles.appTitle}>
                            <Image
                            source={require("../assets/logo.png")}
                            style={styles.appIcon}></Image>
                            <Text style={styles.appTitleText}>{`Story Telling\nApp`}</Text>
                          </View>
                          <View style={styles.buttonContainer}>
                            <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.signWithGoogleAsync()}>
                              <Image
                              source={require("../assets/google_icon.png")}
                              style={style.googleIcon}></Image>
                              <Text style={styles.googleText}>Sign in with Google</Text>
                            </TouchableOpacity>
                          </View>
                          <View style={styles.cloudContainer}>
                            <Image
                            source={require("../assets/cloud")}
                            style={style.cloudImage}
                            ></Image>
                          </View>
              
                          
                        </View>
                        </View>
                      );
        
      }
  

      }
      
    }
  