import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View, TextInput, Text, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform} from "react-native";
import { RootNavigationProp } from "../../types/navigation";
import { useStore } from "../../stores/store";

const SignInScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const { username, setUsername } = useStore().commonStore;
  const { password, setPassword } = useStore().commonStore;
  const { setEmail } = useStore().commonStore;
  const { setPhone } = useStore().commonStore;
  const { setName } = useStore().commonStore;
  const { setDriverRating } = useStore().commonStore;
  const { setRiderRating } = useStore().commonStore;
  const { setDriveCount } = useStore().commonStore;
  const { setRideCount } = useStore().commonStore;

  const validate_field = (username: string, password: string) => {

    //check username and password

    if(username == "" || username == null) {
      alert("Username or password is incorrect!")
      return false
    } else if(password == "" || password == null) {
      alert("Username or password is incorrect!")
      return false
    }

    username = username.trim();
    password = password.trim();

    setUsername(username);
    setPassword(password);
    
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
              // console.log(JSON.stringify(response.data));
              // console.log(response.data.documents[i].username);
              // console.log(response.data.documents.length);

            if(response.data.documents.length == 0) {
              alert("Username entered does not match any account")
            }

            for(let i = 0; i < response.data.documents.length; i++) {
              // console.log(response[i].username)
              // console.log(response[i].password)
              if((response.data.documents[i].username == username) && (response.data.documents[i].password == password)) {
                //set name, email, and phone from data store of user

                //name
                let axios = require('axios');
                let data = JSON.stringify({
                    "collection": "users",
                    "database": "RaimeiDB",
                    "dataSource": "Cluster0",
                    "filter": {
                      "username": username
                    }
                });

                let config = {
                    method: 'post',
                    url: 'https://data.mongodb-api.com/app/data-mqybs/endpoint/data/v1/action/findOne',
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

                      setName(response.data.document.name);

                    })
                    .catch(function (error) {
                        console.log(error);
                    });

                //email

                let axiosEmail = require('axios');
                let dataEmail = JSON.stringify({
                    "collection": "users",
                    "database": "RaimeiDB",
                    "dataSource": "Cluster0",
                    "filter": {
                      "username": username
                    }
                });

                let configEmail = {
                    method: 'post',
                    url: 'https://data.mongodb-api.com/app/data-mqybs/endpoint/data/v1/action/findOne',
                    headers: {
                      'Content-Type': 'application/json',
                      'Access-Control-Request-Headers': '*',
                      'api-key': 'OuzpXWsAyFyncl3mEd4e19fXdXIzni6qi7KlcBzsKclyLAycPefVCE3iJe3om1I4',
                    },
                    data: dataEmail
                };

                axiosEmail(configEmail)
                    .then(function (response) {
                        // console.log(JSON.stringify(response.data));

                      setEmail(response.data.document.email);

                    })
                    .catch(function (error) {
                        console.log(error);
                    });

                //phone

                let axiosPhone = require('axios');
                let dataPhone = JSON.stringify({
                    "collection": "users",
                    "database": "RaimeiDB",
                    "dataSource": "Cluster0",
                    "filter": {
                      "username": username
                    }
                });

                let configPhone = {
                    method: 'post',
                    url: 'https://data.mongodb-api.com/app/data-mqybs/endpoint/data/v1/action/findOne',
                    headers: {
                      'Content-Type': 'application/json',
                      'Access-Control-Request-Headers': '*',
                      'api-key': 'OuzpXWsAyFyncl3mEd4e19fXdXIzni6qi7KlcBzsKclyLAycPefVCE3iJe3om1I4',
                    },
                    data: dataPhone
                };

                axiosPhone(configPhone)
                    .then(function (response) {
                        // console.log(JSON.stringify(response.data));

                      setPhone(response.data.document.phone);

                    })
                    .catch(function (error) {
                        console.log(error);
                    });

                //Drive rating

                let axiosDriveRating = require('axios');
                let dataDriveRating = JSON.stringify({
                    "collection": "users",
                    "database": "RaimeiDB",
                    "dataSource": "Cluster0",
                    "filter": {
                      "username": username
                    }
                });

                let configDriveRating = {
                    method: 'post',
                    url: 'https://data.mongodb-api.com/app/data-mqybs/endpoint/data/v1/action/findOne',
                    headers: {
                      'Content-Type': 'application/json',
                      'Access-Control-Request-Headers': '*',
                      'api-key': 'OuzpXWsAyFyncl3mEd4e19fXdXIzni6qi7KlcBzsKclyLAycPefVCE3iJe3om1I4',
                    },
                    data: dataDriveRating
                };

                axiosDriveRating(configDriveRating)
                    .then(function (response) {
                        // console.log(JSON.stringify(response.data));

                      setDriverRating(response.data.document.driverRating);

                    })
                    .catch(function (error) {
                        console.log(error);
                    });

                //Ride rating

                let axiosRideRating = require('axios');
                let dataRideRating = JSON.stringify({
                    "collection": "users",
                    "database": "RaimeiDB",
                    "dataSource": "Cluster0",
                    "filter": {
                      "username": username
                    }
                });

                let configRideRating = {
                    method: 'post',
                    url: 'https://data.mongodb-api.com/app/data-mqybs/endpoint/data/v1/action/findOne',
                    headers: {
                      'Content-Type': 'application/json',
                      'Access-Control-Request-Headers': '*',
                      'api-key': 'OuzpXWsAyFyncl3mEd4e19fXdXIzni6qi7KlcBzsKclyLAycPefVCE3iJe3om1I4',
                    },
                    data: dataRideRating
                };

                axiosRideRating(configRideRating)
                    .then(function (response) {
                        // console.log(JSON.stringify(response.data));

                      setRiderRating(response.data.document.riderRating);

                    })
                    .catch(function (error) {
                        console.log(error);
                    });

                //Drive count
                let axiosDriveCount = require('axios');
                let dataDriveCount = JSON.stringify({
                    "collection": "users",
                    "database": "RaimeiDB",
                    "dataSource": "Cluster0",
                    "filter": {
                      "username": username
                    }
                });

                let configDriveCount = {
                    method: 'post',
                    url: 'https://data.mongodb-api.com/app/data-mqybs/endpoint/data/v1/action/findOne',
                    headers: {
                      'Content-Type': 'application/json',
                      'Access-Control-Request-Headers': '*',
                      'api-key': 'OuzpXWsAyFyncl3mEd4e19fXdXIzni6qi7KlcBzsKclyLAycPefVCE3iJe3om1I4',
                    },
                    data: dataDriveCount
                };

                axiosDriveCount(configDriveCount)
                    .then(function (response) {
                        // console.log(JSON.stringify(response.data));

                      setDriveCount(response.data.document.driveCount);

                    })
                    .catch(function (error) {
                        console.log(error);
                    });


                //Ride count

                let axiosRideCount = require('axios');
                let dataRideCount = JSON.stringify({
                    "collection": "users",
                    "database": "RaimeiDB",
                    "dataSource": "Cluster0",
                    "filter": {
                      "username": username
                    }
                });

                let configRideCount = {
                    method: 'post',
                    url: 'https://data.mongodb-api.com/app/data-mqybs/endpoint/data/v1/action/findOne',
                    headers: {
                      'Content-Type': 'application/json',
                      'Access-Control-Request-Headers': '*',
                      'api-key': 'OuzpXWsAyFyncl3mEd4e19fXdXIzni6qi7KlcBzsKclyLAycPefVCE3iJe3om1I4',
                    },
                    data: dataRideCount
                };

                axiosRideCount(configRideCount)
                    .then(function (response) {
                        // console.log(JSON.stringify(response.data));

                      setRideCount(response.data.document.rideCount);

                    })
                    .catch(function (error) {
                        console.log(error);
                    });

                //go to Home page

                navigation.navigate("Home");
                break;
              }
              //incorrect password
              else if((response.data.documents[i].username == username) && (response.data.documents[i].password != password)) {
                alert("Incorrect password")
              }
              //if by the end of the check no username matches then username doesn't exist
              if((response.data.documents[i].username != username) && (i==response.data.documents.length-1)) {
                alert("Username entered does not match any account")
              }
            }

          })
          .catch(function (error) {
              console.log(error);
          });
    
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss() } }>
    <View>
      <View style={{width: "100%", height :"100%", justifyContent: "center"
      , alignSelf: "center", alignContent: "center", alignItems: "center"
      }}>
        <Image
          style={styles.image}
          source={require("../../../assets/images/sakura-flower.png")}
        />
        <Text style={{color: "black", fontSize: 50, marginBottom: 40}}>Raimei</Text>
        <TextInput placeholder={"Username"}
        placeholderTextColor="#BDB5D5"
        onChangeText={(value)=> setUsername(value)}
        style={{ height: 42, width: "80%", borderBottomWidth: 1}}
        />
        <TextInput placeholder={"Password"} 
        placeholderTextColor="#BDB5D5"
        onChangeText={(value)=> setPassword(value)}
        style={{ height: 42, width: "80%", borderBottomWidth: 1, marginTop: "5%"}}
        />
            <View style={{marginTop: "10%", width: "80%"}}>
                <TouchableOpacity accessible={true} accessibilityLabel="Login Button" accessibilityHint="Activate to login" style={{ borderWidth : 1, height : 42, width: "80%"
              , justifyContent : "center", alignItems: "center", borderRadius: 40 ,
              backgroundColor: "#4f284b", alignSelf: "center"
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
              backgroundColor: "#BDB5D5", alignSelf: "center"
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
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
