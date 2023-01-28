import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import SignInScreen from "../screens/signIn/SignInScreen";
import SignUpScreen from "../screens/signUp/SignUpScreen";
import HomeScreen from "../screens/home/HomeScreen";
import MapScreen from "../screens/map/MapScreen";
import RidersQueueScreen from "../screens/riders/RidersQueueScreen";
import PaymentScreen from "../screens/payment/PaymentScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import GPSScreen from "../screens/gps/GPSScreen";
import AwaitDriverScreen from "../screens/awaitDriver/AwaitDriverScreen";
import { RootStackParamList } from "../types/navigation";
import DriverOffersScreen from "../screens/drivers/DriverOffersScreen";

interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default Navigation;

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen options={{cardStyle: {backgroundColor:"#ffb7c5"}}} name="SignIn" component={SignInScreen} />
      <Stack.Screen options={{cardStyle: {backgroundColor:"#ffb7c5"}}} name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="DriverOffers" component={DriverOffersScreen} />
      <Stack.Screen name="RidersQueue" component={RidersQueueScreen} />
      <Stack.Screen name="AwaitDriver" component={AwaitDriverScreen} />
      <Stack.Screen name="GPS" component={GPSScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
    </Stack.Navigator>
  );
};
