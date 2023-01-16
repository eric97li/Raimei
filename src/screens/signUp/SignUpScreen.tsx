import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, TextInput, Text, Image} from "react-native";
import { Icon } from "react-native-elements";
import { RootNavigationProp } from "../../types/navigation";

const SignUpScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const [username, setUsername] = useState({
    username:"",
  });
  const [password, setPassword] = useState({
    password: ""
  });

  const signup_field=(username: any, password: any)=>{
    // console.log(username.username);
    // console.log(password.password);
    if(username.username == "") {
        alert("Username or password missing!")
        return false
      } else if(password.password == "") {
        alert("Username or password missing!")
        return false
      } else if(password.password.length < 5) {
        alert("Field password must be 5 characters or longer.")
        return false
      }

      //check that the username is unique
      return fetch('https://raimei.azurewebsites.net/users', {
        method: 'GET', 
      })
      .then(response => response.json())
      .then(response => {
        // console.log(response[0].name)

        //users begin at id 1
        //get list of usernames
        let usernameList = [];
        for(let i = 1; i < response.length; i++) {
          usernameList.push(response[i].username)
        }
        //check array of usernames
        //username is already taken
        if(usernameList.includes(username.username)) {
          alert("Username is already taken")
        }
        //username is unique, create account
        else {

          const data = {
            "id": 0,
            "name": "user",
            "email": "@gmail.com",
            "phone": "(123)-456-7890",
            "username": username.username,
            "password": password.password,
            "driverSubscriptionStatus": "active-inactive",
            "info": "car-nums",
            "rating": 0,
            "rides": [],
            "reserved": [],
            "time": "date-time",
            "history": [],
            "userPrice": 0
          };
    
          return fetch('https://raimei.azurewebsites.net/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          })
          .then(response => {
            if(response.status == 201) {
              alert("Profile created");
              navigation.navigate("Home");
            }
            //error
            else {
              alert("username already taken!")
            }
          })

        }
      })
    
  }
  
  return (
    <View>

      <View style={{width: "100%", height :"100%", justifyContent: "center"
      , alignSelf: "center", alignContent: "center", alignItems: "center", backgroundColor: "#ffb7c5"
      }}>
      <Image
          style={styles.image}
          source={require("../../../assets/images/sakura-flower.jpg")}
        />
        <Text style={{color: "black", fontSize: 50, marginBottom: 40}}>Raimei</Text>
        <TextInput placeholder={"Username"}
        onChangeText={(value)=> setUsername({username: value})}
        style={{ height: 42, width: "80%", borderBottomWidth: 1}}
        />
        <TextInput placeholder={"Password"} 
        onChangeText={(value)=> setPassword({password: value})}
        style={{ height: 42, width: "80%", borderBottomWidth: 1, marginTop: "5%"}}
        />
            <View style={{marginTop: "10%", width: "80%"}}>
                <TouchableOpacity style={{ borderWidth : 1, height : 42, width: "80%"
              , justifyContent : "center", alignItems: "center", borderRadius: 40 ,
              backgroundColor: "#4f284b", alignSelf: "center", textAlign : "center"
              }}
              onPress={()=>signup_field(username, password)}
              >
                <Text style={{color: "white"}}> Sign Up </Text>
                </TouchableOpacity>
            </View>
            <View style={{marginTop: "10%", width: "80%"}}>
                <TouchableOpacity style={{ borderWidth : 1, height : 42, width: "80%"
              , justifyContent : "center", alignItems: "center", borderRadius: 40 ,
              backgroundColor: "white", alignSelf: "center", textAlign : "center"
              }}
              onPress={()=>navigation.navigate("SignIn")}
              >
                <Text style={{color: "black"}}> Return to Sign In </Text>
                </TouchableOpacity>
            </View>


              {/* <Text>{this.state.username}</Text>
              <Text>{this.state.password}</Text> */}

      </View>
    </View>
  );
};

export default observer(SignUpScreen);

const styles = StyleSheet.create({
  iconButton: {
    backgroundColor: "#ffb7c5",
    position: "absolute",
    top: 28,
    left: 8,
    zIndex: 50,
    padding: 12,
    borderRadius: 9999,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    alignSelf: "center",
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 20
  },
  half: {
    height: "50%",
  },
});
