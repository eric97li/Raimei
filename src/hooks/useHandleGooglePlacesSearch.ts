import { useNavigation } from "@react-navigation/native";
import {
  GooglePlaceData,
  GooglePlaceDetail,
} from "react-native-google-places-autocomplete";
import { useStore } from "../stores/store";
import { MapNavigationProp } from "../types/navigation";

export default () => {
  const { setOrigin, destination, setDestination } = useStore().mapStore;
  const { username } = useStore().commonStore;
  const navigation = useNavigation<MapNavigationProp>();

  const handleOriginSearch = (
    data: GooglePlaceData,
    details: GooglePlaceDetail | null = null
  ) => {
    setOrigin({
      location: details!.geometry.location,
      description: data.description,
    });
    setDestination(null);
  };

  const handleDestinationSearch = (
    data: GooglePlaceData,
    details: GooglePlaceDetail | null = null
  ) => {
    setDestination({
      location: details!.geometry.location,
      description: data.description,
    });

    let axios = require('axios');
    let dataDB = JSON.stringify({
        "collection": "users",
        "database": "RaimeiDB",
        "dataSource": "Cluster0",
        "filter": { "username": username },
        "update": {
          "$set": {
            "dropOffLocation": destination?.description
          }
        }
    });

    let config = {
        method: 'post',
        url: 'https://data.mongodb-api.com/app/data-mqybs/endpoint/data/v1/action/updateOne',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers': '*',
          'api-key': 'OuzpXWsAyFyncl3mEd4e19fXdXIzni6qi7KlcBzsKclyLAycPefVCE3iJe3om1I4',
        },
        data: dataDB
    };

    axios(config)
        .then(function (response) {
            // console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });

    navigation.navigate("MapRide");
  };

  return [handleOriginSearch, handleDestinationSearch] as const;
};
