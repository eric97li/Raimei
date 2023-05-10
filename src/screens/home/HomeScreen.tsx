import React, { useState } from "react";
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GooglePlacesSearchInput from "../../components/search/GooglePlacesSearchInput";
import HomeOptions from "./HomeOptions";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MapStackParamList, RootNavigationProp } from "src/types/navigation";
import { CheckBox, Icon } from "react-native-elements";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useStore } from "../../stores/store";

const HomeScreen = () => {
  const Stack = createStackNavigator<MapStackParamList>();
  const navigation = useNavigation<RootNavigationProp>();

  const { setReserve } = useStore().commonStore;
  const { setReserveDate } = useStore().commonStore;
  const { setReserveTime } = useStore().commonStore;

  const [isSelected, setSelection] = useState();

  const [mydate, setDate] = useState(new Date());
  const [displaymodeDate] = useState('date');
  const [isDisplayDate, setShowDate] = useState(isSelected);
  setReserveDate(mydate.toLocaleDateString());
  const changeSelectedDate = (event, selectedDate) => {
  const currentDate = selectedDate || mydate;
  setDate(currentDate);
  setReserveDate(mydate.toLocaleDateString());
};

const [mydateTime, setDateTime] = useState(new Date());
const [displaymodeTime] = useState('time');
const [isDisplayDateTime, setShowTime] = useState(isSelected);
setReserveTime(mydateTime.toLocaleTimeString());
const changeSelectedDateTime = (event, selectedDateTime) => {
  const currentDateTime = selectedDateTime || mydateTime;
  setDateTime(currentDateTime);
  setReserveTime(mydateTime.toLocaleTimeString());
};

const set_selection = () => {
  setSelection(!isSelected);
  setShowTime(!isSelected);
  setShowDate(!isSelected);
  setReserve(String(!isSelected));
}

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => navigation.navigate("Profile")}
      >
        <Icon name="menu" />
      </TouchableOpacity>
        <Image
          style={styles.image}
          source={require("../../../assets/images/sakura-flower.png")}
        />
        <View style={{marginBottom: 10}}></View>
        <GooglePlacesSearchInput
          type="origin"
          placeholder="Depart from?"
          styles={inputStyles}
        />

      <View style={{flexDirection: 'row', marginTop: 10}}>
      <CheckBox
          checked={isSelected}
          checkedColor='purple'
          onPress={() => set_selection()}
          title = "Reserve"
          containerStyle ={{backgroundColor: "pink"}}
        />

      <TouchableOpacity style={{ borderWidth : 1, height : 30, width: 30
              , justifyContent : "center", alignItems: "center", borderRadius: 30 ,
              backgroundColor: "#4f284b", alignSelf: "center", marginLeft:5
              }}
              onPress={()=>alert("Check off to change default Ride request to Reserve Ride. Ride requested will follow Reserve Ride Guidelines. For details click on Information")}
              >
                <Text style={{color: "white"}}> ? </Text>
                </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', marginBottom: 10, marginTop: 5}}>
      {isDisplayDate && (
         <Text style={{marginLeft: 5, marginTop: "2.5%"}}> Date: </Text>
         )}
      {isDisplayDate && (
        <DateTimePicker
            testID="dateTimePicker"
            value={mydate}
            mode={displaymodeDate}
            is24Hour={true}
            display="default"
            onChange={changeSelectedDate}
            />
         )}
      {isDisplayDate && (
         <Text style={{marginLeft: 5, marginTop: "2.5%"}}> Time: </Text>
         )}
      {isDisplayDateTime && (
        <DateTimePicker
            value={mydateTime}
            mode={displaymodeTime}
            is24Hour={true}
            display="default"
            onChange={changeSelectedDateTime}
        />
      )}
      </View>
        <HomeOptions />
        <TouchableOpacity style={{ borderWidth : 1, height : 42, width: "80%"
              , justifyContent : "center", alignItems: "center", borderRadius: 40 ,
              backgroundColor: "#4f284b", alignSelf: "center", marginTop: 20
              }}
              onPress={() => navigation.navigate("DriverOffers")}
              >
                <Text style={{color: "white"}}> Requests, Offers </Text>
                </TouchableOpacity>
        <TouchableOpacity style={{ borderWidth : 1, height : 42, width: "80%"
              , justifyContent : "center", alignItems: "center", borderRadius: 40 ,
              backgroundColor: "#4f284b", alignSelf: "center", marginTop: 20
              }}
              onPress={()=>alert("App Information")}
              >
                <Text style={{color: "white"}}> Information </Text>
                </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

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
  screen: {
    backgroundColor: "#ffb7c5",
    height: "100%",
  },
  container: {
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    alignSelf: "center",
     marginBottom: 10
  },
});

const inputStyles = StyleSheet.create({
  container: {
    flex: 0,
    zIndex: 50,
  },
  textInput: {
    fontSize: 18,
  },
});
