import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, Text } from "react-native-elements";
import { RootNavigationProp } from "../../types/navigation";

const RidersQueueScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();

  return (
    <View>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => navigation.navigate("SetDriverInfo")}
      >
        <Icon name="menu" />
      </TouchableOpacity>
      <Text style={{color: "black", fontSize: 50, marginTop: 100,marginBottom: 40, alignSelf:"center"}}>Riders Queue</Text>
    </View>
  );
};

export default observer(RidersQueueScreen);

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
