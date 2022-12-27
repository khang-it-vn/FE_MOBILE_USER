import DarkLoginScreen from "react-native-dark-login-screen";
import React, {useState} from "react";
import { View, Text, AsyncStorage  } from "react-native";
import LoginScreen, { SocialButton } from "react-native-login-screen";
import axios from 'axios';
import Notifycation from '../Notifycations/Notifycation';

export default function Login({ route, navigation }) {
  var _email = 'user1';
  var _password = 'matkhau1';
  const handleLogin = async (account) => {
     try { 
      console.log("log");
        const res = await  axios.post('http://localhost:44369/api/AccountNguoiHienMau',account);
        console.log(res.data.data);
       await AsyncStorage.setItem("token",res.data.data);
       let token = await AsyncStorage.getItem("token");
       console.log(token);
       navigation.navigate('RootStack');
     } catch (error) {
        console.log(error.message)
     }
  }
  return (
    <LoginScreen
      logoImageSource={require("../../../../assets/icon.png")}
      onLoginPress={() => {
        handleLogin({username: _email, matkhau: _password})
      }}
      onSignupPress={() => {}} 
      onEmailChange={(email) => { _email = email}}
      onPasswordChange={(password) => {_password = password}}
    >
      <SocialButton 
      imageSource={require("../../../../assets/google.png")}
      text="Continue with Google" 
      onPress={() => {}} />
      <SocialButton
        text="Continue with Facebook"
        onPress={() => {}}
      />
      <Notifycation/>
    </LoginScreen>
  );
}
