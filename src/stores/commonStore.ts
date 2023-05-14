import { makeAutoObservable } from "mobx";
import { MapRideItem } from "../types/map";

class CommonStore {
  selectedRide: MapRideItem | null = null;
  name: string | null = null;
  updateName: string | null = null;
  username: string | null = null;
  password: string | null = null;
  updatePassword: string | null = null;
  email: string | null = null;
  updateEmail: string | null = null;
  phone: string | null = null;
  updatePhone: string | null = null;
  userPrice: string | null = null;
  driverLocation: string | null = null;
  info: string | null = null;
  updateInfo: string | null = null;
  driverRating: string | null = null;
  riderRating: string | null = null;
  driveCount: string | null = null;
  rideCount: string | null = null;
  currency: string | null = null;
  reserve: string | null = null;
  reserveDate: string | null = null;
  reserveTime: string | null = null;
  updateOption: string | null = null;


  constructor() {
    makeAutoObservable(this);
  }

  setSelectedRide = (ride: MapRideItem) => {
    this.selectedRide = ride;
  };

  setUpdateOption = (updateOption: string) => {
    this.updateOption = updateOption
  }

  setName = (name: string) => {
    this.name = name;
  };

  setUpdateName = (updateName: string) => {
    this.updateName = updateName;
  };

  setUsername = (username: string) => {
    this.username = username;
  };

  setPassword = (password: string) => {
    this.password = password;
  };

  setUpdatePassword = (updatePassword: string) => {
    this.updatePassword = updatePassword;
  };

  setEmail = (email: string) => {
    this.email = email;
  };

  setUpdateEmail = (updateEmail: string) => {
    this.updateEmail = updateEmail;
  };

  setPhone = (phone: string) => {
    this.phone = phone;
  };

  setUpdatePhone = (updatePhone: string) => {
    this.updatePhone = updatePhone;
  }

  setUserPrice = (userPrice: string) => {
    this.userPrice = userPrice;
  };

  setCurrency = (currency: string) => {
    this.currency = currency;
  };

  setDriverLocation = (driverLocation: string) => {
    this.driverLocation = driverLocation;
  };

  setInfo = (info: string) => {
    this.info = info;
  };

  setUpdateInfo = (updateInfo: string) => {
    this.updateInfo = updateInfo;
  };

  setDriverRating = (driverRating: string) => {
    this.driverRating = driverRating;
  }

  setRiderRating = (riderRating: string) => {
    this.riderRating = riderRating;
  }

  setDriveCount = (driveCount: string) => {
    this.driveCount = driveCount;
  }

  setRideCount = (rideCount: string) => {
    this.rideCount = rideCount;
  }

  setReserve = (reserve: string) => {
    this.reserve = reserve;
  };

  setReserveDate = (reserveDate: string) => {
    this.reserveDate = reserveDate;
  };

  setReserveTime = (reserveTime: string) => {
    this.reserveTime = reserveTime;
  };

}

export default CommonStore;
