import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootNavigationProp } from "src/types/navigation";
import { useStore } from "../../../stores/store";

const MapRideButton = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const { selectedRide } = useStore().commonStore;
  const { travelTimeInfo } = useStore().mapStore;
  const { userPrice } = useStore().commonStore;
  const { currency } = useStore().commonStore;
  const { username } = useStore().commonStore;
  const { name } = useStore().commonStore;
  const { email } = useStore().commonStore;
  const { phone } = useStore().commonStore;

  const { reserve } = useStore().commonStore;
  const { reserveDate } = useStore().commonStore;
  const { reserveTime } = useStore().commonStore;
  const { origin, destination } = useStore().mapStore;

  const confirm_selectedRide = () => {

    if (userPrice == "" || userPrice == null) {
      alert("Please input a Price Request!")
      return false
    }

    if (selectedRide?.title == "" || selectedRide?.title == null) {
      alert("Please select a Ride type")
      return false
    }

    if (currency == "" || currency == null) {
      alert("Please select a currency")
      return false
    }

    Alert.alert('Confirm Inputs',
    'Ride Type: ' + selectedRide?.title + ', Currency: ' + currency + ', Price Requested: ' + userPrice,
    [
      {
      text: 'Cancel',
      onPress:() => {return false;}
    },
    {
      text: 'Ok', onPress: () => {set_selectedRide()}
    }
    ]
    );
  }

  const set_selectedRide = () => {
    // Default ride
      if (reserve != "true") {

        let axios = require('axios');
        let data = JSON.stringify({
          "collection": "ridesQueue",
          "database": "RaimeiDB",
          "dataSource": "Cluster0",
          "document": {
            "name": name,
            "email": email,
            "phone": phone,
            "username": username,
            "pickUpLocation": origin?.description,
            "dropOffLocation": destination?.description,
            "selectedRide": selectedRide?.title,
            "currency": currency,
            "userPrice": userPrice,
            "offerPrice": 0,
            "endPrice": 0,
            "dropOffTravelTime": travelTimeInfo?.duration?.text,
            "dropOffTravelDistance": travelTimeInfo?.distance?.text,
            "pickUpArrivalTime": "",
            "pickUpTime": "",
            "dropOffTime": "",
            "negotiationsRide": []
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
        .then(function () {
            // console.log(JSON.stringify(response.data));
            navigation.navigate("DriverOffers");
        })
        .catch(function (error) {
            console.log(error);
        });

      }
      // Reserve ride
      else {

        let axios = require('axios');
        let data = JSON.stringify({
          "collection": "reservesQueue",
          "database": "RaimeiDB",
          "dataSource": "Cluster0",
          "document": {
            "name": name,
            "email": email,
            "phone": phone,
            "username": username,
            "pickUpLocation": origin?.description,
            "dropOffLocation": destination?.description,
            "selectedRide": selectedRide?.title,
            "currency": currency,
            "userPrice": userPrice,
            "offerPrice": 0,
            "endPrice": 0,
            "dropOffTravelTime": travelTimeInfo?.duration?.text,
            "dropOffTravelDistance": travelTimeInfo?.distance?.text,
            "pickUpArrivalTime": "",
            "pickUpTime": "",
            "dropOffTime": "",
            "reserve": reserve,
            "reserveDate": reserveDate,
            "reserveTime": reserveTime,
            "negotiationsReserve": []
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
        .then(function () {
            // console.log(JSON.stringify(response.data));
            navigation.navigate("DriverOffers");
        })
        .catch(function (error) {
            console.log(error);
        });

      }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          !selectedRide && {
            backgroundColor: "#BDB5D5",
          },
        ]}
        disabled={!selectedRide}
        onPress={()=> confirm_selectedRide()}
      >
        <Text style={styles.title}>Choose {selectedRide?.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default observer(MapRideButton);

const styles = StyleSheet.create({
  container: {
    marginTop: "auto",
    borderTopWidth: 6,
    borderBottomWidth: 6,
    borderColor: "black",
  },
  button: {
    backgroundColor: "#4f284b",
    paddingVertical: 12,
  },
  title: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    lineHeight: 20,
  },
});
