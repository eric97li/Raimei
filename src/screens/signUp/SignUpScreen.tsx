import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React from "react";
import { StyleSheet, TouchableOpacity, View, TextInput, Text, Image} from "react-native";
import { RootNavigationProp } from "../../types/navigation";
import { useStore } from "../../stores/store";

const SignUpScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const { name, setName } = useStore().commonStore;
  const { username, setUsername } = useStore().commonStore;
  const { password, setPassword } = useStore().commonStore;
  const { email, setEmail } = useStore().commonStore;
  const { phone, setPhone } = useStore().commonStore;

  const signup_field=(name: string, username: string, password: string, email: string, phone: string)=>{
    // console.log(username.username);
    // console.log(password.password);
    if(username == "" || username == null) {
        alert("Please fill in all fields")
        return false
      } else if(password == "" || password == null) {
        alert("Please fill in all fields")
        return false
      } else if(password.length < 5) {
        alert("Field password must be 5 characters or longer.")
        return false
      } else if(name == "" || name == null) {
        alert("Please fill in all fields")
        return false
      } else if(email == "" || email == null) {
        alert("Please fill in all fields")
        return false
      } else if(phone == "" || phone == null) {
        alert("Please fill in all fields")
        return false
      }

      //Get the documents "find" to check for all data
      let axios = require('axios');
      let data = JSON.stringify({
          "collection": "users",
          "database": "RaimeiDB",
          "dataSource": "Cluster0"
      });

      let config = {
          method: 'post',
          url: 'https://data.mongodb-api.com/app/data-mqybs/endpoint/data/v1/action/find',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': 'OuzpXWsAyFyncl3mEd4e19fXdXIzni6qi7KlcBzsKclyLAycPefVCE3iJe3om1I4',
          },
          data: data
      };

      axios(config)
          .then(function (response) {
            // console.log("-------------------------")
              // console.log(JSON.stringify(response.data));
              // console.log(response.data.documents[i].username);
              // console.log(response.data.documents.length);
        
              //users begin at id 1
              //get list of usernames
              let usernameList = [];
              for(let i = 1; i < response.data.documents.length; i++) {
                usernameList.push(response.data.documents[i].username)
              }
              //check array of usernames
              //username is already taken
              if(usernameList.includes(username)) {
                alert("Username is already taken")
              }
               //username is unique, create account
              else {
                name = name.trim();
                email = email.trim();
                phone = phone.trim();
                username = username.trim();
                password = password.trim();

                let axios = require('axios');
                let data = JSON.stringify({
                    "collection": "users",
                    "database": "RaimeiDB",
                    "dataSource": "Cluster0",
                    "document": {
                      "name": name,
                      "email": email,
                      "phone": phone,
                      "username": username,
                      "password": password,
                      "info": "car-nums",
                      "pickUpLocation": "",
                      "dropOffLocation": "",
                      "driverLocation": "",
                      "favouriteOrigins": [],
                      "favouriteDestinations": [],
                      "reserved": [],
                      "estPrice": 0,
                      "userPrice": 0,
                      "offerPrice": 0,
                      "endPrice": 0,
                      "dropOffTravelTime": "",
                      "pickUpArrivalTime": "",
                      "pickUpTime": "",
                      "dropOffTime": "",
                      "driverHistory": [],
                      "rideHistory": [],
                      "driverRating": 0,
                      "riderRating": 0
                    }
                  });

                let config = {
                      method: 'post',
                      url: 'https://data.mongodb-api.com/app/data-mqybs/endpoint/data/v1/action/insertOne',
                      headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Request-Headers': '*',
                        'api-key': 'OuzpXWsAyFyncl3mEd4e19fXdXIzni6qi7KlcBzsKclyLAycPefVCE3iJe3om1I4',
                      },
                      data: data
                  };

                axios(config)
                  .then(function (response) {
                      // console.log(JSON.stringify(response.data));
                      if(response.status == 201) {
                        alert("Profile created");
                        navigation.navigate("Home");
                      }
                      else {
                        alert("Username is already taken!")
                      }
                  })
                  .catch(function (error) {
                      console.log(error);
                  });
              }
       
          })
          .catch(function (error) {
              console.log(error);
          });


    
  }
  
  return (
    <View>

      <View style={{width: "100%", height :"100%", justifyContent: "center"
      , alignSelf: "center", alignContent: "center", alignItems: "center", backgroundColor: "#ffb7c5"
      }}>
      <Image
          style={styles.image}
          source={require("../../../assets/images/sakura-flower.png")}
        />
        <Text style={{color: "black", fontSize: 50, marginBottom: 30}}>Raimei</Text>
        <TextInput placeholder={"Name"}
        placeholderTextColor="#BDB5D5"
        onChangeText={(value)=> setName(value)}
        style={{ height: 42, width: "80%", borderBottomWidth: 1}}
        />
        <TextInput placeholder={"Username"}
        placeholderTextColor="#BDB5D5"
        onChangeText={(value)=> setUsername(value)}
        style={{ height: 42, width: "80%", borderBottomWidth: 1, marginTop: "5%"}}
        />
        <TextInput placeholder={"Password"} 
        placeholderTextColor="#BDB5D5"
        onChangeText={(value)=> setPassword(value)}
        style={{ height: 42, width: "80%", borderBottomWidth: 1, marginTop: "5%"}}
        />
        <TextInput placeholder={"Email"} 
        placeholderTextColor="#BDB5D5"
        onChangeText={(value)=> setEmail(value)}
        style={{ height: 42, width: "80%", borderBottomWidth: 1, marginTop: "5%"}}
        />
        <TextInput placeholder={"Phone"} 
        placeholderTextColor="#BDB5D5"
        onChangeText={(value)=> setPhone(value)}
        style={{ height: 42, width: "80%", borderBottomWidth: 1, marginTop: "5%"}}
        />
            <View style={{marginTop: "10%", width: "80%"}}>
                <TouchableOpacity style={{ borderWidth : 1, height : 42, width: "80%"
              , justifyContent : "center", alignItems: "center", borderRadius: 40 ,
              backgroundColor: "#4f284b", alignSelf: "center", textAlign : "center"
              }}
              onPress={()=>signup_field(name, username, password, email, phone)}
              >
                <Text style={{color: "white"}}> Sign Up </Text>
                </TouchableOpacity>
            </View>
            <View style={{marginTop: "10%", width: "80%"}}>
                <TouchableOpacity style={{ borderWidth : 1, height : 42, width: "80%"
              , justifyContent : "center", alignItems: "center", borderRadius: 40 ,
              backgroundColor: "#BDB5D5", alignSelf: "center", textAlign : "center"
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
