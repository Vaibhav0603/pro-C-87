import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
//import { createBottomTabNavigator} from 'react navigation/bottom-tabs';
import Feed from "./screens/Feed";
import CreateStory from "./screens/CreateStory";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab= createMaterialBottomTabNavigator();
//const Tab = createBottomTabNavigator();


const BottomTabNavigator = () =>{
    return (
        <Tab.Navigator
        labeled={false}
        barStyle={StyleSheet.bottomTabStyle}
        screenOptions={({route}) =>({
            tabBarIcon: ({ focused, color,size}) =>{
                let iconName;
                if(route.name ==='Feed'){
                    iconName = focused
                    ? 'book'
                    :'book-outline';

                }else if (route.name === 'CreatePost') {
                    iconName= focused ? 'create' :'create-outline';
                }
                return <Ionicons name ={iconName} size={RFValue(25)} color={color} style={styles.icons}/>;

            },
        })}
        tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor:'gray',

        }}
        >
            <Tab.Screen name="Feed" component={Feed}/>
            <Tab.Screen name="CreatePost" component = {CreatePost}/>
            </Tab.Navigator>


      )
}
const styles = StyleSheet.create({
    postCardLight:{
        margin:RFValue(20),
        backgroundColor:"#eaeaea",
        borderRadius: RFValue(20)
    },
    authorNameText:{
        color: "white",
        fontSize:RFValue(20)
    },
    authorNameTextLight:{
        color:"black",
        fontSize:RFValue(20)
    }
  
    
  
  });
  
  