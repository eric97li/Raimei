import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { MapNavigationProp } from "../../../types/navigation";

const MapCardButtons = () => {
  const navigation = useNavigation<MapNavigationProp>();

  return (
    <View style={styles.container}>
    </View>
  );
};

export default MapCardButtons;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-evenly",
    paddingVertical: 8,
    marginTop: "auto",
    borderTopWidth: 2,
    borderTopColor: "rgba(229, 231, 235, 1)",
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 100,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 9999,
  },
});
