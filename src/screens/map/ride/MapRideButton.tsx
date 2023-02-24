import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootNavigationProp } from "src/types/navigation";
import { useStore } from "../../../stores/store";

const MapRideButton = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const { selectedRide } = useStore().commonStore;
  const { travelTimeInfo } = useStore().mapStore;
  const { userPrice } = useStore().commonStore;
  const { currency } = useStore().commonStore;
  const { username } = useStore().commonStore;

  const { reserve, setReserve } = useStore().commonStore;
  const { reserveDate, setReserveDate } = useStore().commonStore;
  const { reserveTime, setReserveTime } = useStore().commonStore;
  const { origin, destination } = useStore().mapStore;

  const set_selectedRide = () => {
    // Default ride
      if (reserve != "true") {
        let axios = require('axios');
        let data = JSON.stringify({
            "collection": "users",
            "database": "RaimeiDB",
            "dataSource": "Cluster0",
            "filter": { "username": username },
            "update": {
              "$set": {
                "currency": currency,
                "dropOffTravelDistance": travelTimeInfo?.distance?.text,
                "dropOffTravelTime": travelTimeInfo?.duration?.text,
                "selectedRide": selectedRide?.title,
                "userPrice": userPrice,
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
                navigation.navigate("DriverOffers");
            })
            .catch(function (error) {
                console.log(error);
            });
      }
      // Reserve ride
      else {
        let reserveObj = new Object();
        reserveObj.reserve = reserve;
        reserveObj.reserveDate = reserveDate;
        reserveObj.reserveTime = reserveTime;
        reserveObj.origin = origin?.description;
        reserveObj.destination = destination?.description;
        reserveObj.currency = currency;
        reserveObj.dropOffTravelDistance = travelTimeInfo?.distance?.text;
        reserveObj.dropOffTravelTime = travelTimeInfo?.duration?.text;
        reserveObj.selectedRide = selectedRide?.title;
        reserveObj.userPrice = userPrice;
        let reserveObjString = JSON.stringify(reserveObj);

        // Get existing reserve obj array of the user

        let axios = require('axios');
        let dataGetReserveArray = JSON.stringify({
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
            data: dataGetReserveArray
        };

        axios(config)
            .then(function (response) {
                // console.log(JSON.stringify(response.data));

                let reservedArray = response.data.document.reserved;
                reservedArray.push(reserveObjString);

                // Update user's reserve obj array with the added reserve ride json string

                let axios = require('axios');
                let dataUpdateReserveArray = JSON.stringify({
                    "collection": "users",
                    "database": "RaimeiDB",
                    "dataSource": "Cluster0",
                    "filter": { "username": username },
                    "update": {
                      "$set": {
                        "reserved": reservedArray
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
                    data: dataUpdateReserveArray
                };

                axios(config)
                    .then(function (response) {
                        // console.log(JSON.stringify(response.data));
                        navigation.navigate("DriverOffers");
                    })
                    .catch(function (error) {
                        console.log(error);
                    });


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
        onPress={()=> set_selectedRide()}
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
