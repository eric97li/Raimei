import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { RootNavigationProp } from "../../types/navigation";
import { useStore } from "../../stores/store";

const ProfileScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const { name, setName } = useStore().commonStore;
  const { updateName, setUpdateName } = useStore().commonStore;
  const { username } = useStore().commonStore;

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
  
  const update_name=(updateName: string)=>{

    if(updateName == "" || updateName == null) {
      alert("Please input desired name")
      return false
    }

    updateName = updateName.trim();

    setUpdateName(updateName);

    let axios = require('axios');
    let data = JSON.stringify({
        "collection": "users",
        "database": "RaimeiDB",
        "dataSource": "Cluster0",
        "filter": { "username": username },
        "update": {
          "$set": {
            "name": updateName
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
            setName(updateName);
        })
        .catch(function (error) {
            console.log(error);
        });

  }

  return (
    <View>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Icon name="menu" />
      </TouchableOpacity>
      <View >
      <Text style={{color: "black", fontSize: 50, marginTop: 100,marginBottom: 40, alignSelf:"center"}}>{name}</Text>
      </View>
      <TextInput placeholder={"Update Name"}
        placeholderTextColor="#BDB5D5"
        onChangeText={(value)=> setUpdateName(value)}
        style={{ height: 42, width: "80%", borderBottomWidth: 1, marginLeft: 40}}
        />
                    <View style={{marginTop: "10%", width: "100%"}}>
                <TouchableOpacity accessible={true} accessibilityLabel="Login Button" accessibilityHint="Activate to login" style={{ borderWidth : 1, height : 42, width: "80%"
              , justifyContent : "center", alignItems: "center", borderRadius: 40 ,
              backgroundColor: "#4f284b", alignSelf: "center"
              }}
              onPress={()=> update_name(updateName)}
              >
                <Text style={{color: "white"}}> Update Name </Text>
                </TouchableOpacity>
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
