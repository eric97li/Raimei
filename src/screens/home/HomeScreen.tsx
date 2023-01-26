import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapCardFavourites from "../map/card/MapCardFavourites";
import GooglePlacesSearchInput from "../../components/search/GooglePlacesSearchInput";
import HomeOptions from "./HomeOptions";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MapStackParamList, RootNavigationProp } from "src/types/navigation";
import { Icon } from "react-native-elements";

const HomeScreen = () => {
  const Stack = createStackNavigator<MapStackParamList>();
  const navigation = useNavigation<RootNavigationProp>();

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
        <GooglePlacesSearchInput
          type="origin"
          placeholder="Depart from?"
          styles={inputStyles}
        />
        <HomeOptions />
        <MapCardFavourites />
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
    alignSelf: "center"
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
