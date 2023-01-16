import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View, TextInput, Text} from "react-native";
import { Icon } from "react-native-elements";
import { RootNavigationProp } from "../../types/navigation";

const SignInScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const [username, setUsername] = useState({
    username:"",
  });
  const [password, setPassword] = useState({
    password: ""
  });

  const validate_field=(username: any, password: any)=>{

    if(username.username == "") {
      alert("Username or password is incorrect!")
      return false
    } else if(password.password == "") {
      alert("Username or password is incorrect!")
      return false
    }
    
    //check for the credentials entered by user with the api and retrieve account of user
          return fetch('https://raimei.azurewebsites.net/users', {
            method: 'GET', 
          })
          .then(response => response.json())
          .then(response => {
            // console.log(response[0].name)

            //only the initial api placeholder parameters index 0
            if(response.length == 1) {
              alert("Username entered does not match any account")
            }
    
            //users begin at id 1

            for(let i = 1; i < response.length; i++) {
              // console.log(response[i].username)
              // console.log(response[i].password)
              if((response[i].username == username.username) && (response[i].password == password.password)) {
                navigation.navigate("Home");
                break;
              }
              //incorrect password
              else if((response[i].username == username.username) && (response[i].password != password.password)) {
                alert("Incorrect password")
              }
              //if by the end of the check no username matches then username doesn't exist
              if((response[i].username != username.username) && (i==response.length-1)) {
                alert("Username entered does not match any account")
              }
            }
 
          })
    
  }

  return (
    <View>
      <View style={{width: "100%", height :"100%", justifyContent: "center"
      , alignSelf: "center", alignContent: "center", alignItems: "center"
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
                <TouchableOpacity accessible={true} accessibilityLabel="Login Button" accessibilityHint="Activate to login" style={{ borderWidth : 1, height : 42, width: "80%"
              , justifyContent : "center", alignItems: "center", borderRadius: 40 ,
              backgroundColor: "#4f284b", alignSelf: "center", textAlign : "center"
              }}
              onPress={()=> validate_field(username, password)}
              >
                <Text style={{color: "white"}}> Login </Text>
                </TouchableOpacity>
            </View>
            <View style={{marginTop: "10%", width: "80%"}}>
              <Text>New user?</Text>
            </View>
            <View style={{marginTop: "2.5%", width: "80%"}}>
                <TouchableOpacity accessible={true} accessibilityLabel="Sign Up Button" accessibilityHint="Activate to go to sign up page" style={{ borderWidth : 1, height : 42, width: "80%"
              , justifyContent : "center", alignItems: "center", borderRadius: 40 ,
              backgroundColor: "white", alignSelf: "center", textAlign : "center"
              }}
              onPress={() => navigation.navigate("SignUp")}
              >
                <Text style={{color: "black"}}> Sign Up </Text>
                </TouchableOpacity>
            </View>

              {/* <Text>{this.state.username}</Text>
              <Text>{this.state.password}</Text>
              <Text>{this.state.token}</Text> */}

      </View>
    </View>

    
  );
};

export default observer(SignInScreen);

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
