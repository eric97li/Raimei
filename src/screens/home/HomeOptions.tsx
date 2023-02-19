import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import optionsData from "../../data/homeOptionsData.json";
import { useStore } from "../../stores/store";
import { RootNavigationProp } from "../../types/navigation";

const NavOptions = () => {
  const { origin } = useStore().mapStore;
  const { username } = useStore().commonStore;
  const navigation = useNavigation<RootNavigationProp>();

  const set_origin = (screen: string) => {

    let axios = require('axios');
    let data = JSON.stringify({
        "collection": "users",
        "database": "RaimeiDB",
        "dataSource": "Cluster0",
        "filter": { "username": username },
        "update": {
          "$set": {
            "pickUpLocation": origin?.description
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
        })
        .catch(function (error) {
            console.log(error);
        });

    navigation.navigate(screen)
  }

  return (
    <FlatList
      data={optionsData}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.title}
      renderItem={({ item: { title, screen } }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => set_origin(screen)}
          disabled={!origin && title != "Drive"}
        >
          <View style={(!origin && title != "Drive") && { opacity: 0.2 }}>
            <Text style={styles.title}>{title}</Text>
            <Icon
              style={styles.icon}
              name="arrowright"
              color="white"
              type="antdesign"
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default observer(NavOptions);

const styles = StyleSheet.create({
  item: {
    // paddingLeft: 24,
    paddingRight: 8,
    paddingBottom: 32,
    paddingTop: 16,
    backgroundColor: "#BDB5D5",
    margin: 8,
    width: 160
  },
  image: {
    // width: 120,
    // height: 120,
    resizeMode: "contain",
  },
  title: {
    marginTop: 8,
    fontSize: 18,
    lineHeight: 28,
    fontWeight: "bold",
    alignSelf: "center"
  },
  icon: {
    padding: 8,
    backgroundColor: "#4f284b",
    borderRadius: 9999,
    width: 40,
    marginTop: 16,
    alignSelf: "center"
  },
});
