import React from "react";
import { StyleSheet, Text, View } from "react-native";
import GooglePlacesSearchInput from "../../../components/search/GooglePlacesSearchInput";
import { ScrollView } from 'react-native-virtualized-view';

const MapCard = () => {
  return (
    <ScrollView disableScrollViewPanResponder={true} automaticallyAdjustKeyboardInsets={true} style={styles.container}>
      <Text style={styles.title}>Destination</Text>
      <View style={styles.details}>
        <GooglePlacesSearchInput
          type="destination"
          placeholder="Arrive at?"
          styles={inputStyles}
        />
      </View>
    </ScrollView>
  );
};

export default MapCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffb7c5",
    flex: 1,
  },
  title: {
    textAlign: "center",
    paddingBottom: 20,
    fontSize: 20,
    lineHeight: 20,
    paddingTop: 20
  },
  details: {
    borderTopWidth: 1,
    borderColor: "rgba(229, 231, 235, 1)",
    flexShrink: 1,
  },
});

const inputStyles = StyleSheet.create({
  container: {
    backgroundColor: "#ffb7c5",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "white",
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
  },
});
