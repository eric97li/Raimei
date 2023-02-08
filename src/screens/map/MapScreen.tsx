import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity, View, Platform } from "react-native";
import { Icon } from "react-native-elements";
import { useStore } from "../../stores/store";
import { MapStackParamList, RootNavigationProp } from "../../types/navigation";
import NavCard from "./card/MapCard";
import Map from "./Map";
import RideOptionsCard from "./ride/MapRide";

const MapScreen = () => {
  const Stack = createStackNavigator<MapStackParamList>();
  const navigation = useNavigation<RootNavigationProp>();
  const { origin, destination, loadTravelTimeInfo } = useStore().mapStore;

  useEffect(() => {
    if (origin && destination) {
      loadTravelTimeInfo();
    }
  }, [origin, destination, loadTravelTimeInfo]);

  return (
    <View>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Icon name="menu" />
      </TouchableOpacity>
      <View style={styles.mapHeight}>
        <Map />
      </View>
      <View style={styles.cardHeight}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MapCard" component={NavCard} />
          <Stack.Screen name="MapRide" component={RideOptionsCard} />
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default observer(MapScreen);

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
  mapHeight: {
    height: Platform.OS === 'ios' ? "40%" : "50%"
  },
  cardHeight: {
    height: Platform.OS === 'ios' ? "60%" : "50%"
  },
});
