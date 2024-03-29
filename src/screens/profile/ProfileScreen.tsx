import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Icon } from "react-native-elements";
import { RootNavigationProp } from "../../types/navigation";
import { useStore } from "../../stores/store";
import updateInfoOptions from "../../data/updateInfoOptions.json";
import { SelectList } from 'react-native-dropdown-select-list';

const ProfileScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const { name, setName } = useStore().commonStore;
  const { password, setPassword } = useStore().commonStore;
  const { email, setEmail } = useStore().commonStore;
  const { phone, setPhone } = useStore().commonStore;
  const { updateName, setUpdateName } = useStore().commonStore;
  const { updateEmail, setUpdateEmail } = useStore().commonStore;
  const { updatePhone, setUpdatePhone } = useStore().commonStore;
  const { updatePassword, setUpdatePassword } = useStore().commonStore;
  const { username } = useStore().commonStore;
  const { updateOption, setUpdateOption } = useStore().commonStore;
  const defaultValue = {"value":"Name","key":"Name"};
  const [showState, setShowState] = useState(false);
  const [display, setDisplay] = useState(showState);

  // Get Username info

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

  // Get Email info
  let data2 = JSON.stringify({
      "collection": "users",
      "database": "RaimeiDB",
      "dataSource": "Cluster0",
      "filter": {
        "username": username
      }
  });

  let config2 = {
      method: 'post',
      url: 'https://data.mongodb-api.com/app/data-mqybs/endpoint/data/v1/action/findOne',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': 'OuzpXWsAyFyncl3mEd4e19fXdXIzni6qi7KlcBzsKclyLAycPefVCE3iJe3om1I4',
      },
      data: data2
  };

  axios(config2)
      .then(function (response) {
          // console.log(JSON.stringify(response.data));
    
        setEmail(response.data.document.email);  

      })
      .catch(function (error) {
          console.log(error);
      });


  // Get Phone info
  let data3 = JSON.stringify({
      "collection": "users",
      "database": "RaimeiDB",
      "dataSource": "Cluster0",
      "filter": {
        "username": username
      }
  });

  let config3 = {
      method: 'post',
      url: 'https://data.mongodb-api.com/app/data-mqybs/endpoint/data/v1/action/findOne',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': 'OuzpXWsAyFyncl3mEd4e19fXdXIzni6qi7KlcBzsKclyLAycPefVCE3iJe3om1I4',
      },
      data: data3
  };

  axios(config3)
      .then(function (response) {
          // console.log(JSON.stringify(response.data));
    
        setPhone(response.data.document.phone);

      })
      .catch(function (error) {
          console.log(error);
      });

  //Get Password info

  let data4 = JSON.stringify({
      "collection": "users",
      "database": "RaimeiDB",
      "dataSource": "Cluster0",
      "filter": {
        "username": username
      }
  });

  let config4 = {
      method: 'post',
      url: 'https://data.mongodb-api.com/app/data-mqybs/endpoint/data/v1/action/findOne',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': 'OuzpXWsAyFyncl3mEd4e19fXdXIzni6qi7KlcBzsKclyLAycPefVCE3iJe3om1I4',
      },
      data: data4
  };

  axios(config4)
      .then(function (response) {
          // console.log(JSON.stringify(response.data));
    
        setPassword(response.data.document.password);

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

  const update_email=(updateEmail: string)=>{

    if(updateEmail == "" || updateEmail == null) {
      alert("Please input desired email")
      return false
    }

    updateEmail = updateEmail.trim();

    setUpdateEmail(updateEmail);

    let axios = require('axios');
    let data = JSON.stringify({
        "collection": "users",
        "database": "RaimeiDB",
        "dataSource": "Cluster0",
        "filter": { "username": username },
        "update": {
          "$set": {
            "email": updateEmail
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
            setEmail(updateEmail);
        })
        .catch(function (error) {
            console.log(error);
        });

  }

  const update_phone=(updatePhone: string)=>{
    if(updatePhone == "" || updatePhone == null) {
      alert("Please input desired phone")
      return false
    }

    updatePhone = updatePhone.trim();

    setUpdatePhone(updatePhone);

    let axios = require('axios');
    let data = JSON.stringify({
        "collection": "users",
        "database": "RaimeiDB",
        "dataSource": "Cluster0",
        "filter": { "username": username },
        "update": {
          "$set": {
            "phone": updatePhone
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
            setPhone(updatePhone);
        })
        .catch(function (error) {
            console.log(error);
        });

  }

  const update_password=(updatePassword: string)=>{
    if(updatePassword == "" || updatePassword == null) {
      alert("Please input desired password")
      return false
    }

    updatePassword = updatePassword.trim();

    setUpdatePassword(updatePassword);

    let axios = require('axios');
    let data = JSON.stringify({
        "collection": "users",
        "database": "RaimeiDB",
        "dataSource": "Cluster0",
        "filter": { "username": username },
        "update": {
          "$set": {
            "password": updatePassword
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
            setPassword(updatePassword);
        })
        .catch(function (error) {
            console.log(error);
        });

  }

  const show_info=()=>{
    setShowState(!showState);
    setDisplay(!showState);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Icon name="menu" />
      </TouchableOpacity>
      <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss() } }>
          <View>
              <View>
              <Text style={{color: "black", fontSize: 50, marginTop: 80, marginBottom: 10, alignSelf:"center"}}>{name}</Text>
              </View>
              <View style={{width: '50%', flexDirection: "row", alignSelf: 'center', marginTop: '10%', marginBottom:'10%'}}>
                <Text style={{marginTop: '5%', marginRight: '5%'}}>Update: </Text>
                <SelectList 
                setSelected={(val) => setUpdateOption(val)} 
                data={updateInfoOptions} 
                placeholder="Select Info to update"
                defaultOption={defaultValue}
                save="value"
                />
              </View>
              <View>
                  { (updateOption === "Name") && <View>
                    <TextInput placeholder={"Update Name"}
                      placeholderTextColor="#BDB5D5"
                      onChangeText={(value)=> setUpdateName(value)}
                      style={{ height: 42, width: "80%", borderBottomWidth: 1, marginLeft: 40}}
                      />
                          <View style={{marginTop: "10%", width: "100%"}}>
                              <TouchableOpacity accessible={true} accessibilityLabel="Update Name" accessibilityHint="Update Name" style={{ borderWidth : 1, height : 42, width: "40%"
                            , justifyContent : "center", alignItems: "center", borderRadius: 40 ,
                            backgroundColor: "#4f284b", alignSelf: "center"
                            }}
                            onPress={()=> update_name(updateName)}
                            >
                              <Text style={{color: "white"}}> Update Name </Text>
                              </TouchableOpacity>
                          </View>
                    </View>}
                </View>
                <View>
                  { (updateOption === "Email") && <View>
                  {display && <View>
                    <Text style={{color: "black", fontSize: 25, marginTop: 20, marginBottom: 10, alignSelf:"center"}}>{email}</Text>
                  </View>}
                  <TextInput placeholder={"Update Email"}
                    placeholderTextColor="#BDB5D5"
                    onChangeText={(value)=> setUpdateEmail(value)}
                    style={{ height: 42, width: "80%", borderBottomWidth: 1, marginLeft: 40, marginTop: 20}}
                    />
                        <View style={{marginTop: "10%", width: "100%"}}>
                            <TouchableOpacity accessible={true} accessibilityLabel="Update Email" accessibilityHint="Update Email" style={{ borderWidth : 1, height : 42, width: "40%"
                          , justifyContent : "center", alignItems: "center", borderRadius: 40 ,
                          backgroundColor: "#4f284b", alignSelf: "center"
                          }}
                          onPress={()=> update_email(updateEmail)}
                          >
                            <Text style={{color: "white"}}> Update Email </Text>
                            </TouchableOpacity>
                        </View>
                  </View>}
                </View>
                <View>
                  { (updateOption === "Phone") && <View>
                  { display && <View>
                    <Text style={{color: "black", fontSize: 25, marginTop: 20, marginBottom: 10, alignSelf:"center"}}>{phone}</Text>
                  </View>}
                  <TextInput placeholder={"Update Phone"}
                    placeholderTextColor="#BDB5D5"
                    onChangeText={(value)=> setUpdatePhone(value)}
                    style={{ height: 42, width: "80%", borderBottomWidth: 1, marginLeft: 40, marginTop: 20}}
                    />
                        <View style={{marginTop: "10%", width: "100%"}}>
                            <TouchableOpacity accessible={true} accessibilityLabel="Update Phone" accessibilityHint="Update Phone" style={{ borderWidth : 1, height : 42, width: "40%"
                          , justifyContent : "center", alignItems: "center", borderRadius: 40 ,
                          backgroundColor: "#4f284b", alignSelf: "center"
                          }}
                          onPress={()=> update_phone(updatePhone)}
                          >
                            <Text style={{color: "white"}}> Update Phone </Text>
                            </TouchableOpacity>
                        </View>
                    </View>}
                </View>
                <View>
                  { (updateOption === "Password") && <View>
                  { display && <View>
                    <Text style={{color: "black", fontSize: 25, marginTop: 20, marginBottom: 10, alignSelf:"center"}}>{password}</Text>
                  </View>}
                  <TextInput placeholder={"Update Password"}
                    placeholderTextColor="#BDB5D5"
                    onChangeText={(value)=> setUpdatePassword(value)}
                    style={{ height: 42, width: "80%", borderBottomWidth: 1, marginLeft: 40, marginTop: 20}}
                    />
                        <View style={{marginTop: "10%", width: "100%"}}>
                            <TouchableOpacity accessible={true} accessibilityLabel="Update Password" accessibilityHint="Update Password" style={{ borderWidth : 1, height : 42, width: "40%"
                          , justifyContent : "center", alignItems: "center", borderRadius: 40 ,
                          backgroundColor: "#4f284b", alignSelf: "center"
                          }}
                          onPress={()=> update_password(updatePassword)}
                          >
                            <Text style={{color: "white"}}> Update Password </Text>
                            </TouchableOpacity>
                        </View>
                    </View>}
              </View>
              {(updateOption != "Name") && <View style={{marginTop: "10%", width: "100%"}}>
                          <TouchableOpacity accessible={true} accessibilityLabel="Show Hide Info" accessibilityHint="Show Hide Info" style={{ borderWidth : 1, height : 42, width: "40%"
                        , justifyContent : "center", alignItems: "center", borderRadius: 40 ,
                        backgroundColor: "#BDB5D5", alignSelf: "center"
                        }}
                        onPress={()=> show_info()}
                        >
                          { (display == true) && <View>
                          <Text style={{color: "black"}}> Hide Info </Text>
                          </View>}
                          { (display == false) && <View>
                          <Text style={{color: "black"}}> Show Info </Text>
                          </View>}
                          </TouchableOpacity>
                </View>}
            </View>
        </TouchableWithoutFeedback>
    </View>
  );
};

export default observer(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffb7c5",
    flex: 1,
  },
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
