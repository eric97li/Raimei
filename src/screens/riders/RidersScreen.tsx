import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { RootNavigationProp } from "../../types/navigation";

const RidersScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();

  return (
    <View>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Icon name="menu" />
      </TouchableOpacity>
    </View>
  );
};

export default observer(RidersScreen);

const styles = StyleSheet.create({
  iconButton: {
    backgroundColor: "#F3F4F6",
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
