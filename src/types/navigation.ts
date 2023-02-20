import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Home: undefined;
  Map: undefined;
  DriverOffers: undefined;
  RidersQueue: undefined;
  Payment: undefined;
  Profile: undefined;
  GPS: undefined;
  AwaitDriver: undefined;
  SetDriverInfo: undefined;
};

export type MapStackParamList = {
  MapCard: undefined;
  MapRide: undefined;
};

export type RootNavigationProp = StackNavigationProp<any>;
export type MapNavigationProp = StackNavigationProp<MapStackParamList>;
