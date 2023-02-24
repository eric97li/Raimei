import React from "react";
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapRideButton from "./MapRideButton";
import MapRideHeader from "./MapRideHeader";
import MapRideList from "./MapRideList";
import { useStore } from "../../../stores/store"

const MapRide = () => {

  const { destination } = useStore().mapStore;
  const { username } = useStore().commonStore;

  let axios = require('axios');
  let dataDB = JSON.stringify({
      "collection": "users",
      "database": "RaimeiDB",
      "dataSource": "Cluster0",
      "filter": { "username": username },
      "update": {
        "$set": {
          "dropOffLocation": destination?.description
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

  return (
    <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss() } }>
    <SafeAreaView style={styles.container}>
      <MapRideHeader />
      <MapRideList />
      <MapRideButton />
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default MapRide;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffb7c5",
    flexGrow: 1,
  },
});
