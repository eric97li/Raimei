import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { RootNavigationProp } from "../../types/navigation";
import { useStore } from "../../stores/store";

const ProfileScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const { name, setName } = useStore().commonStore;
  const { username } = useStore().commonStore;
  const { password } = useStore().commonStore;

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
      
        //users begin at id 1

        for(let i = 1; i < response.data.documents.length; i++) {
          
          if((response.data.documents[i].username == username) && (response.data.documents[i].password == password)) {
            setName(response.data.documents[i].name);
            break;
          }
        }

      })
      .catch(function (error) {
          console.log(error);
      });

  return (
    <View>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Icon name="menu" />
      </TouchableOpacity>
      <View>
      <Text style={{color: "black", fontSize: 50, marginTop: 40,marginBottom: 40, alignSelf:"center"}}>{name}</Text>
      </View>
    </View>
  );
};

export default observer(ProfileScreen);

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
});
