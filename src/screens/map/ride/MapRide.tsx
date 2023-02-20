import React from "react";
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapRideButton from "./MapRideButton";
import MapRideHeader from "./MapRideHeader";
import MapRideList from "./MapRideList";

const MapRide = () => {
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
