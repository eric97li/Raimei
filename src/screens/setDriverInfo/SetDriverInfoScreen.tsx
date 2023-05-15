import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import { Keyboard, TouchableWithoutFeedback, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Icon, Text } from "react-native-elements";
import { RootNavigationProp } from "../../types/navigation";
import * as Location from "expo-location";
import { useStore } from "../../stores/store";

const SetDriverInfoScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showLoading, setShowLoading] = useState(true);
  const { driverLocation, setDriverLocation } = useStore().commonStore;
  const { username } = useStore().commonStore;
  const { info, setInfo } = useStore().commonStore;
  const { updateInfo, setUpdateInfo } = useStore().commonStore;

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
    
        setInfo(response.data.document.info);
          
          

      })
      .catch(function (error) {
          console.log(error);
      });

  const submit = (updateInfo: string) => {

    if(updateInfo == "" || updateInfo == null) {
      alert("Please input driver, car, contact info")
      return false
    }

    setUpdateInfo(updateInfo);

    let axios = require('axios');
    let data = JSON.stringify({
        "collection": "users",
        "database": "RaimeiDB",
        "dataSource": "Cluster0",
        "filter": { "username": username },
        "update": {
          "$set": {
            "info": updateInfo
          }
        }
    });

    let config = {
        method: 'post',
        url: 'https://data.mongodb-api.com/app/data-mqybs/endpoint/data/v1/action/updateOne',
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
            setInfo(updateInfo);
            navigation.navigate("RidersQueue");
        })
        .catch(function (error) {
            console.log(error);
        });

  }

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      while (status !== 'granted') {
        setErrorMsg('Please allow Raimei Location Access in your device settings.');
        alert("Please allow Raimei Location Access in your device settings.");
        navigation.navigate("Home");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  // let text = 'Loading...';
  if (errorMsg) {
    // text = errorMsg;
  } else if (location) {
    // text = JSON.stringify(location);
    let latitude = location.coords.latitude;
    let longitude = location.coords.longitude;

    let linkString1 = 'https://maps.googleapis.com/maps/api/geocode/json?';
    let linkString2 = 'latlng=' + latitude + ',' + longitude + '&';

    let linkString3 = 'key=AIzaSyBJzkjJNbxoKvF0R4XpOG3yHEkFjm--QBA';

    let addressLink = linkString1.concat(linkString2, linkString3);

    fetch(addressLink)
      .then((response) => response.json())
      .then(data => {
        setShowLoading(false);
        setDriverLocation(data.results[0].formatted_address);


        let axios = require('axios');
        let dataDB = JSON.stringify({
            "collection": "users",
            "database": "RaimeiDB",
            "dataSource": "Cluster0",
            "filter": { "username": username },
            "update": {
              "$set": {
                "driverLocation": driverLocation
              }
            }
        });
    
        let config = {
            method: 'post',
            url: 'https://data.mongodb-api.com/app/data-mqybs/endpoint/data/v1/action/updateOne',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Request-Headers': '*',
              'api-key': 'OuzpXWsAyFyncl3mEd4e19fXdXIzni6qi7KlcBzsKclyLAycPefVCE3iJe3om1I4',
            },
            data: dataDB
        };
    
        axios(config)
            .then(function (response) {
                // console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

      })

  }

  return (
    <View>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Icon name="menu" />
      </TouchableOpacity>
      <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss() } }>
      <View>
      <Text style={{color: "black", fontSize: 50, marginTop: 100,marginBottom: 40, alignSelf:"center"}}>Set Driver Info</Text>
      { (location) == null &&
        <Text style={{alignSelf:"center"}}>{errorMsg}</Text>
      }
      { showLoading &&
        <Text style={{alignSelf:"center"}}>Loading...</Text>
      }
      { (location) != null &&
      <View>
        <Text style={{alignSelf:"center"}}>Current Location: {driverLocation}</Text>
        <Text style={{alignSelf:"center", marginTop:20}}>Info: </Text>
        <TextInput placeholder={"Driver, car, contact info or anything the rider needs to identify you, the ride"}
        multiline={true}
        placeholderTextColor="#BDB5D5"
        onChangeText={(value)=> setUpdateInfo(value)}
        style={{ height: "40%", width: "80%", borderBottomWidth: 1, alignSelf:"center"}}
        >
        {info}
        </TextInput>
            <View style={{marginTop: "10%", width: "80%", alignSelf:"center"}}>
                <TouchableOpacity style={{ borderWidth : 1, height : 42, width: "80%"
              , justifyContent : "center", alignItems: "center", borderRadius: 40 ,
              backgroundColor: "#4f284b", alignSelf: "center"
              }}
              onPress={()=>submit(updateInfo)}
              >
                <Text style={{color: "white"}}> Submit </Text>
                </TouchableOpacity>
            </View>
        </View>
      }
      </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default observer(SetDriverInfoScreen);

const styles = StyleSheet.create({
  iconButton: {
    backgroundColor: "#BDB5D5",
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
  half: {
    height: "50%",
  },
});