import { makeAutoObservable } from "mobx";
import { MapRideItem } from "../types/map";

class CommonStore {
  selectedRide: MapRideItem | null = null;
  name: string | null = null;
  updateName: string | null = null;
  username: string | null = null;
  password: string | null = null;
  email: string | null = null;
  phone: string | null = null;
  userPrice: string | null = null;
  driverLocation: string | null = null;
  info: string | null = null;
  updateInfo: string | null = null;
  currency: string | null = null;


  constructor() {
    makeAutoObservable(this);
  }

  setSelectedRide = (ride: MapRideItem) => {
    this.selectedRide = ride;
  };

  setName = (name: string) => {
    this.name = name;
  }

  setUpdateName = (updateName: string) => {
    this.updateName = updateName;
  }

  setUsername = (username: string) => {
    this.username = username;
  };

  setPassword = (password: string) => {
    this.password = password;
  };

  setEmail = (email: string) => {
    this.email = email;
  }

  setPhone = (phone: string) => {
    this.phone = phone;
  }

  setUserPrice = (userPrice: string) => {
    this.userPrice = userPrice;
  }

  setCurrency = (currency: string) => {
    this.currency = currency;
  }

  setDriverLocation = (driverLocation: string) => {
    this.driverLocation = driverLocation;
  }

  setInfo = (info: string) => {
    this.info = info;
  }

  setUpdateInfo = (updateInfo: string) => {
    this.updateInfo = updateInfo;
  }

}

export default CommonStore;
