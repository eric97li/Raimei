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

  const set_selectedRide = () => {

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
