import React, { Component } from "react";
import { StyleSheet, Text, View,Switch,Image,StatusBar,Platform,SafeAreaView } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import * as SplashScreen from 'expo-splash-screen';
import * as Font from "expo-font";
import { Value } from "react-native-reanimated";
import firebase from "firebase";
import { TouchableOpacity } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};


export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      isEnabled:false,
      light_theme:true,
      name:""
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }
  async fetchUser(){
    let theme,name,image;
    await firebase
    .database()
    .ref("/users/"+firebase.auth().currentUser.uid)
    .on("value",function(snapShot){
      theme=snapShot.val().current_theme;
      name=`${snapShot.val().first_name}${snapShot.val().last_name}`
    })
    this.setState({
      light_theme:theme==="light"? true:false,
      isEnabled:theme==="light"? false:true,
      name:name 
    })
  }
  toggleSwitch(){
    const previous_state=this.state.isEnabled
    const theme=!this.state.isEnabled?"dark":"light"
    var updates={}
      updates["/users/"+firebase.auth().currentUser.uid+"/current_theme"]=theme
      firebase.database().ref().update(updates)
      this.setState({isEnabled:!previous_state,light_theme:previous_state})
    
  }
  render (){
    if (!this.state.fontsLoaded){
        return <AppLoading/>;
    } else {
        return(
            <View
                style={{
                    flex:1,
                    justifyContent:"center",
                    alignItem:"center"
                }}
            >
                <Button 
                    title="Sign in with Google"
                    onPress={() => this.signInWithGoogleAsync()}></Button>
            </View>
        )
    }
  }
  
}
return(
    <View style={StyleSheet.container}>
        <SafeAreaView style={StyleSheet.droidSafeArea}/>
        <View style={StyleSheet.appTitle}>
            <Image
            source={require("../assets/logo.png")}
            style={StyleSheet.appIcon}
            ></Image>
            <Text style={StyleSheet.appTitleText}>{`Story Telling\nApp`}</Text>
        </View>
        <View style={StyleSheet.buttonContainer}>
            <TouchableOpacity
            style={StyleSheet.button}
            onPress={()=> this.signInWithGoogleAsync()}>
                <Image
                source={require("../assets/google_icon.png")}
                style={StyleSheet.googleIcon}
                ></Image>
                <Text style={StyleSheet.googleText}>Sign in with Google</Text>
            </TouchableOpacity>
        </View>
        <View style={StyleSheet.cloudContainer}>
            <Image
            source={require("..assets/cloud.png")}
            style={StyleSheet.cloudImage}
            ></Image>
            <View style={styles.themeContainer}>
              <Text style={styles.themeText}>DarkTheme</Text>
            <Switch 
            style={{transform:[{ scaleX:1.3},{scaleY:1.3}]}}
            trackColor={{false:"grey",true:"white"}}
            thumbColor={this.state.isEnabled?"#eeb249":"#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={()=>this.toggleSwitch()}
            value={this.state.isEnabled}
            

            />
            </View>
        </View>
    </View>
)