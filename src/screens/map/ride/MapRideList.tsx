import { observer } from "mobx-react-lite";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import rideData from "../../../data/mapRideData.json";
import { useStore } from "../../../stores/store";

const MapRideList = () => {
  const { selectedRide, setSelectedRide } = useStore().commonStore;
  const { travelTimeInfo } = useStore().mapStore;
  const { setUserPrice } = useStore().commonStore;



  return (
    <FlatList
      data={rideData}
      keyExtractor={(item) => item.title}
      renderItem={({ item: { title }, item }) => (
        <TouchableOpacity
          style={[
            styles.item,
            title === selectedRide?.title && {
              backgroundColor: "#BDB5D5",
            },
          ]}
          onPress={() => setSelectedRide(item)}
        >
          <View style={{ marginLeft: -24 }}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.title}>{travelTimeInfo?.duration?.text || "Travel Time"} </Text>
          </View>
          { (title === selectedRide?.title) &&
            <TextInput placeholder={"Price Request"} 
            placeholderTextColor="#4f284b"
          onChangeText={(value)=> setUserPrice(value)}
          style={{ height: 42, width: "40%", borderBottomWidth: 1}}
          />
      }
        </TouchableOpacity>
      )}
    />
  );
};

export default observer(MapRideList);

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    paddingTop: 27,
    paddingBottom: 27,
  },
  image: {
    // width: 100,
    // height: 100,
    resizeMode: "contain",
  },
  title: {
    fontSize: 20,
    lineHeight: 20,
    fontWeight: "bold",
    color: "black"
  },
  price: {
    fontSize: 20,
    lineHeight: 20,
    color: "black"
  },
});
