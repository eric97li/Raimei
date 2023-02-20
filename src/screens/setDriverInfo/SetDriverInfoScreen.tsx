import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, Text } from "react-native-elements";
import { RootNavigationProp } from "../../types/navigation";
import * as Location from "expo-location";
import { useStore } from "../../stores/store";

const SetDriverInfoScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const { driverLocation, setDriverLocation } = useStore().commonStore;

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    let latitude = location.coords.latitude;
    let longitude = location.coords.longitude;

    let linkString1 = 'https://maps.googleapis.com/maps/api/geocode/json?';
    let linkString2 = 'latlng=' + latitude + ',' + longitude + '&';

    let linkString3 = 'key=AIzaSyBJzkjJNbxoKvF0R4XpOG3yHEkFjm--QBA';

    let addressLink = linkString1.concat(linkString2, linkString3);

    fetch(addressLink)
      .then((response) => response.json())
      .then(data => {
        setDriverLocation(data.results[0].formatted_address);
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
      <Text style={{color: "black", fontSize: 50, marginTop: 100,marginBottom: 40, alignSelf:"center"}}>Set Driver Info</Text>
      <Text style={{alignSelf:"center"}}>Current Location: {driverLocation}</Text>
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