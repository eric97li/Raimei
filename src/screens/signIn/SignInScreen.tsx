import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View, TextInput, Text} from "react-native";
import { RootNavigationProp } from "../../types/navigation";
import { useStore } from "../../stores/store";

const SignInScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const { username, setUsername } = useStore().commonStore;
  const { password, setPassword } = useStore().commonStore;

  const validate_field=(username: string, password: string)=>{

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

            //only the initial api placeholder parameters index 0
            if(response.data.documents.length == 1) {
              alert("Username entered does not match any account")
            }

            //users begin at id 1

            for(let i = 1; i < response.data.documents.length; i++) {
              // console.log(response[i].username)
              // console.log(response[i].password)
              if((response.data.documents[i].username == username) && (response.data.documents[i].password == password)) {
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
              backgroundColor: "#BDB5D5", alignSelf: "center", textAlign : "center"
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
