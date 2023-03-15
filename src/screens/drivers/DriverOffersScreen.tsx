import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, Text } from "react-native-elements";
import { RootNavigationProp } from "../../types/navigation";
import { Switch } from 'react-native-switch';

const DriverOffersScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const [toggleRideReserve, setToggleRideReserve] = useState(true);

  const toggleSwitch = () => {
    setToggleRideReserve(!toggleRideReserve);
    };
  return (
    <View>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Icon name="menu" />
      </TouchableOpacity>
      <View style={{ marginTop: 100,marginBottom: 40, alignSelf:"center"}}>
      <Switch
          value={toggleRideReserve}
          onValueChange={()=>{
          toggleSwitch();
          }}
          disabled={false}
          activeText={'Ride'}
          inActiveText={'Reserve'}
          circleSize={40}
          barHeight={40}
          circleBorderWidth={3}
          backgroundActive={"#4f284b"}
          backgroundInactive={"#4f284b"}
          circleActiveColor={"#BDB5D5"}
          circleInActiveColor={"#BDB5D5"}
          switchLeftPx={2}
          switchRightPx={5}
          switchWidthMultiplier={3}
          switchBorderRadius={40}
      />
      </View>
      <Text style={{color: "black", fontSize: 50, marginTop: 100,marginBottom: 40, alignSelf:"center"}}>Driver Offers</Text>
    </View>
  );
};

export default observer(DriverOffersScreen);

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